import React from 'react';
import { Package } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrderItemCard({ order }) {
  return (
    <div className="bg-white/90 border border-[#EBE5DB] rounded-2xl p-5 flex items-center justify-between shadow-[0_4px_16px_rgba(88,65,114,0.03)] hover:shadow-md transition-shadow">
      {/* Left side: Package Icon + Order ID + Date */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#EBE5DB] flex items-center justify-center text-[#4A3E54]">
          <Package className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div>
          <h3 className="font-bold text-[#2D2335] text-sm tracking-tight">
            {order.id}
          </h3>
          <p className="text-xs text-[#9E93A7] mt-0.5">{order.date}</p>
        </div>
      </div>

      {/* Right side: Status Badge + Price */}
      <div className="flex items-center gap-6">
        <OrderStatusBadge status={order.status} />
        <span className="font-semibold text-sm text-[#2D2335] min-w-[60px] text-right">
          €{order.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}