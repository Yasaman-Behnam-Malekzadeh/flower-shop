import React from 'react';
import { Scissors, Truck, CheckCircle2 } from 'lucide-react';

export default function OrderStatusBadge({ status }) {
  switch (status) {
    case 'crocheting':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EAF8] text-[#7A4B95]">
          <Scissors className="w-3.5 h-3.5" />
          Being crocheted
        </span>
      );
    case 'shipped':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4F0F9] text-[#2C6B9E]">
          <Truck className="w-3.5 h-3.5" />
          Shipped
        </span>
      );
    case 'delivered':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#2D7A47]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Delivered
        </span>
      );
    default:
      return null;
  }
}