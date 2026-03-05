import React from "react";
import {  Plus } from "lucide-react";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[800px] bg-white rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] px-6 py-4">
          <h2 className="text-white text-lg font-semibold">
            Create New Order
          </h2>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* CUSTOMER INFO */}
          <div className="bg-[#F1F7FF] rounded-lg p-4 space-y-3">
            <h3 className="text-[18px] leading-[27px] font-bold text-[#101828]">
              Customer Information
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                <div className="mt">
                    <p className="text-[14px] leading-[14px] font-arimo text-[#0A0A0A] pb-1">Search Customer</p>
              <input
                type="text"
                placeholder="Phone or name"
                className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm outline-none bg-[#F3F3F5]"
              />
              </div>
              <div className="mt">
                                    <p className="text-[14px] leading-[14px] font-arimo text-[#0A0A0A] pb-1">Or Create New</p>

              <button className="h-9 bg-[#FFFFFF] w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md text-sm">
                <Plus size={14} />
                New Customer
              </button>
              </div>
            </div>
          </div>

          {/* PICKUP / DELIVERY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="mt">
                    <p className="text-[14px] leading-[14px] font-arimo text-[#0A0A0A] pb-1">Picup Date & Time</p>
              <input
                type="text"
                placeholder="Picup Date & Time"
                className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm outline-none bg-[#F3F3F5]"
              />
              </div>
            <div className="mt">
                    <p className="text-[14px] leading-[14px] font-arimo text-[#0A0A0A] pb-1">Delivery Date & Time</p>
              <input
                type="text"
                placeholder="Delivery Date & Time"
                className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm outline-none bg-[#F3F3F5]"
              />
              </div>
          </div>

          {/* ADDRESS */}
          <div className="mt">
         <div className="mt">
  <p className="text-[14px] leading-[14px] font-arimo text-[#0A0A0A] pb-1">
    Pickup Address
  </p>

  <textarea
    placeholder="Enter complete address"
    className="
      w-full
      h-[75px]
      px-3 py-2
      rounded-md
      border border-gray-200
      text-sm
      outline-none
      resize-none
      text-start
    "
  />
</div>

          </div>

          {/* ORDER ITEMS */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Order Items
              </h3>
              <button className="bg-black text-white text-xs px-3 py-1 rounded-md">
                + Add Item
              </button>
            </div>

            <div className="h-[80px] flex items-center justify-center text-sm text-gray-400 border border-dashed rounded-md">
              No items added. Click "Add Item" to start.
            </div>
          </div>

          {/* SERVICES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Express Delivery (+$50)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Stain Removal (+$30)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Premium Packaging (+$20)
            </label>
          </div>

          {/* SPECIAL INSTRUCTIONS */}
          <textarea
            placeholder="Special Instructions"
            className="w-full h-20 p-3 rounded-md border border-gray-200 text-sm resize-none"
          />

          {/* PAYMENT METHOD */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">
              Payment Method
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Cash", "Card", "UPI", "Wallet"].map((method) => (
                <button
                  key={method}
                  className="h-9 border border-gray-200 rounded-md text-sm"
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-[#F1F7FF] rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>$0.0</span>
            </div>
            <div className="flex justify-between font-semibold text-blue-600">
              <span>Total:</span>
              <span>$0.00</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm bg-[#2563EB] text-white rounded-md">
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderModal;
