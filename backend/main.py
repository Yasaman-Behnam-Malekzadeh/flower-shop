from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FlowerCreate(BaseModel):
    id: str
    name: str
    cost_price: float
    selling_price: float
    stock: int
    color: Optional[str] = "bg-stone-200"

class FlowerUpdate(BaseModel):
    cost_price: Optional[float] = None
    selling_price: Optional[float] = None
    stock: Optional[int] = None

def get_db():
    conn = sqlite3.connect("inventory.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS flowers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            cost_price REAL NOT NULL,
            selling_price REAL NOT NULL,
            stock INTEGER NOT NULL,
            color TEXT
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            total_orders INTEGER DEFAULT 0,
            total_spent REAL DEFAULT 0.0
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            total_price REAL NOT NULL,
            total_cost REAL NOT NULL,
            profit REAL NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    cursor.execute("SELECT COUNT(*) FROM flowers")
    if cursor.fetchone()[0] == 0:
        sample_flowers = [
            ("roses", "Roses", 2.20, 6.50, 50, "bg-pink-300"),
            ("tulips", "Tulips", 1.80, 5.50, 30, "bg-purple-300"),
            ("daisies", "Daisies", 1.20, 4.00, 100, "bg-amber-300"),
            ("sunflowers", "Sunflowers", 2.50, 7.00, 15, "bg-amber-500"),
        ]
        cursor.executemany("INSERT INTO flowers VALUES (?, ?, ?, ?, ?, ?)", sample_flowers)

    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", ("Yasaman", "yasaman@example.com"))

    conn.commit()
    conn.close()

init_db()

@app.get("/api/flowers")
def get_flowers():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, selling_price as price, cost_price, stock, color FROM flowers")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/api/flowers")
def add_flower(flower: FlowerCreate):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO flowers (id, name, cost_price, selling_price, stock, color) VALUES (?, ?, ?, ?, ?, ?)",
            (flower.id, flower.name, flower.cost_price, flower.selling_price, flower.stock, flower.color)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Flower with this ID already exists")
    conn.close()
    return {"message": "Flower added successfully"}

@app.patch("/api/flowers/{flower_id}")
def update_flower_stock(flower_id: str, flower_data: FlowerUpdate):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM flowers WHERE id = ?", (flower_id,))
    existing_flower = cursor.fetchone()
    
    if not existing_flower:
        conn.close()
        raise HTTPException(status_code=404, detail="Flower not found")

    new_stock = flower_data.stock if flower_data.stock is not None else existing_flower["stock"]
    new_cost = flower_data.cost_price if flower_data.cost_price is not None else existing_flower["cost_price"]
    new_price = flower_data.selling_price if flower_data.selling_price is not None else existing_flower["selling_price"]

    cursor.execute(
        "UPDATE flowers SET stock = ?, cost_price = ?, selling_price = ? WHERE id = ?",
        (new_stock, new_cost, new_price, flower_id)
    )
    conn.commit()
    conn.close()
    return {"message": "Flower updated successfully"}

@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT SUM(stock * cost_price) as total_inventory_cost, SUM(stock * selling_price) as total_inventory_value, SUM(stock) as total_stock FROM flowers")
    inventory = dict(cursor.fetchone())

    cursor.execute("SELECT SUM(total_price) as total_revenue, SUM(profit) as total_profit, COUNT(*) as total_orders_count FROM orders")
    sales = dict(cursor.fetchone())

    conn.close()

    return {
        "inventory_summary": {
            "total_items_in_stock": inventory["total_stock"] or 0,
            "capital_locked_in_stock": round(inventory["total_inventory_cost"] or 0, 2),
            "potential_revenue": round(inventory["total_inventory_value"] or 0, 2),
        },
        "financial_summary": {
            "total_revenue": round(sales["total_revenue"] or 0, 2),
            "total_profit": round(sales["total_profit"] or 0, 2),
            "total_orders": sales["total_orders_count"] or 0
        }
    }