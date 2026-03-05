import React from "react";

const ScheduleTab: React.FC = () => {
  return (
    <div className="w-full  bg-[#F3F6F9] ">
      <div className="max-w-[1760px] mx-auto space-y-6">
        {/* Pickup Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-arimo text-[18px] font-bold text[#101828] leading-[28px] mb-6">
            Pickup Settings
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Pickup Start Time */}
            <div className="flex flex-col">
              <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
                Pickup Start Time
              </label>
              <input
                type="time"
                className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              />
            </div>

            {/* Pickup End Time */}
            <div className="flex flex-col">
              <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
                Pickup End Time
              </label>
              <input
                type="time"
                className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              />
            </div>
          </div>

          {/* Slot Duration */}
          <div className="mt-4 flex flex-col">
            <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
              Slot Duration (minutes)
            </label>
            <select
              className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              defaultValue="60"
            >
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
            </select>
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-arimo text-[18px] font-bold text[#101828] leading-[28px] mb-6">
            Delivery Settings
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Standard Delivery */}
            <div className="flex flex-col">
              <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
                Standard Delivery (days)
              </label>
              <input
                type="number"
                defaultValue={2}
                className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              />
            </div>

            {/* Express Delivery */}
            <div className="flex flex-col">
              <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
                Express Delivery (hours)
              </label>
              <input
                type="number"
                defaultValue={24}
                className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTab;
