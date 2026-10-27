import React from 'react';
import OrderItemCard from './OrderItemCard';

export default function OrdersList({ orders }) {
  return (
    <div className="space-y-4 max-w-3xl">
      {orders.map((order) => (
        <OrderItemCard key={order.id} order={order} />
      ))}
    </div>
  );
}