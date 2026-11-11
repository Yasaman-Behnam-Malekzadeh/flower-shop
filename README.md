KnitFlora is a custom handmade crochet flower bouquet e-commerce platform. Users can build personalized bouquets stem-by-stem, choose wrapping papers and ribbons, add handwritten greeting cards, or get tailored recommendations from an integrated AI Florist Advisor.

## 1. Key Features
* **Interactive Bouquet Builder:** Select individual knitted blooms, wrapping papers, ribbons, and gift-wrapping options with real-time dynamic pricing.
* **AI Florist Advisor:** OpenAI-powered assistant that recommends custom bouquets and writes personalized greeting card messages based on the occasion.
* **User Accounts & Profiles:** Secure authentication (PBKDF2 password hashing) and profile management.
* **Dynamic Inventory:** Live product, paper, and ribbon catalogs powered by a serverless database.

## 2. Tech Stack
* **Frontend:** React, Tailwind CSS
* **Backend & Hosting:** Cloudflare Workers, Cloudflare Pages
* **Database:** Cloudflare D1 (SQLite)
* **AI Integration:** OpenAI API (`gpt-4o-mini`)
* **Testing:** Playwright

## 3. Project Architecture
```text
flower-shop/
├── backend/                  # Backend API & SQLite database files
│   ├── inventory.db          # Local database
│   └── main.py               # Backend application logic
├── frontend/                 # React & Tailwind CSS storefront
│   ├── functions/            # Cloudflare Pages serverless API endpoints
│   ├── public/               # Static public assets
│   └── src/
│       ├── assets/           # Product & hero images
│       └── Components/       # Modular UI components (Build, Hero, Cart, etc.)
├── tests/                    # End-to-end automated tests
├── playwright.config.ts      # Playwright test runner configuration
└── wrangler.jsonc            # Cloudflare deployment & D1 bindings config


## 4- Local Setup & Installation
Follow these steps to run **KnitFlora** locally on your machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/Yasaman-Behnam-Malekzadeh/flower-shop.git](https://github.com/Yasaman-Behnam-Malekzadeh/flower-shop.git)
cd flower-shop

### 2. Install Dependencies
```bash
npm install
cd frontend
npm install

###3. Configure Environment Variables & Cloudflare Bindings

Create a .dev.vars file inside the frontend/ directory for local Cloudflare Pages development and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here

###4. Run the Local Development Server
From the frontend/ directory, build the React app and start the local Cloudflare Pages environment:
```bash
npm run build
npx wrangler pages dev build

###5. Run Automated Tests (Optional)
```bash
npx playwright test