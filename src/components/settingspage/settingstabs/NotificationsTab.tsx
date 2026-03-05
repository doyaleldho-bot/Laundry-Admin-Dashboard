import React, { useState } from "react";

const Toggle = ({ enabled, setEnabled }: any) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? "bg-black" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
};

const NotificationsTab = () => {
  const [orderConfirm, setOrderConfirm] = useState(true);
  const [pickupReminder, setPickupReminder] = useState(true);
  const [deliveryNotify, setDeliveryNotify] = useState(true);

  const [statusUpdate, setStatusUpdate] = useState(true);
  const [paymentReminder, setPaymentReminder] = useState(false);

  return (
    <div className="w-full space-y-6">
      {/* Email Notifications */}
      <div className="bg-white border rounded-[14px] p-6">
        <h3 className="font-semibold text-gray-900 mb-6">
          Email Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <p className="font-medium text-gray-900">Order Confirmation</p>
              <p className="text-sm text-gray-500">
                Send email when new order is placed
              </p>
            </div>
            <Toggle enabled={orderConfirm} setEnabled={setOrderConfirm} />
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <p className="font-medium text-gray-900">Pickup Reminder</p>
              <p className="text-sm text-gray-500">
                Send reminder 1 hour before pickup
              </p>
            </div>
            <Toggle enabled={pickupReminder} setEnabled={setPickupReminder} />
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <p className="font-medium text-gray-900">Delivery Notification</p>
              <p className="text-sm text-gray-500">
                Send email when order is delivered
              </p>
            </div>
            <Toggle enabled={deliveryNotify} setEnabled={setDeliveryNotify} />
          </div>
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="bg-white border rounded-[14px] p-6">
        <h3 className="font-semibold text-gray-900 mb-6">
          SMS Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <p className="font-medium text-gray-900">
                Order Status Updates
              </p>
              <p className="text-sm text-gray-500">
                Send SMS for status changes
              </p>
            </div>
            <Toggle enabled={statusUpdate} setEnabled={setStatusUpdate} />
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <p className="font-medium text-gray-900">
                Payment Reminders
              </p>
              <p className="text-sm text-gray-500">
                Send SMS for pending payments
              </p>
            </div>
            <Toggle enabled={paymentReminder} setEnabled={setPaymentReminder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
