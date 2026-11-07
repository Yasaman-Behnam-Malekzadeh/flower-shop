import React from "react";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateCount }) {
  if (!isOpen) return null;

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
            <h2 className="text-lg font-bold text-stone-900 font-heading">
              Your Bouquet Items ({totalItems})
            </h2>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Items List Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {Object.keys(cartItems).length === 0 || totalItems === 0 ? (
              <div className="text-center py-20 text-stone-400 text-sm">
                Your cart is currently empty. Pick some blooms!
              </div>
            ) : (
              Object.entries(cartItems).map(([id, count]) => {
                if (count <= 0) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-100"
                  >
                    <div>
                      <p className="font-semibold text-stone-800 text-sm">Item ID: {id}</p>
                      <p className="text-xs text-stone-500">Quantity: {count}</p>
                    </div>
                    {/* Quick remove/adjust controls */}
                    <button
                      onClick={() => onUpdateCount(id, -count)}
                      className="text-xs text-red-500 hover:underline px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Action */}
          <div className="border-t border-stone-100 p-6 bg-stone-50/50">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#584172] text-white rounded-2xl font-medium hover:bg-[#48345e] transition-colors shadow-sm text-sm"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}