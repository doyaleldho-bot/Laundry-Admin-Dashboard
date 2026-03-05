import { useState } from "react";
import AssignDriverModal from "./AssignDriverModal";
const drivers = [
  {
    id: "1",
    name: "Mike Driver",
    status: "Available",
    rating: 4.8,
    phone: "+1 234 567 8910",
    vehicle: "Bike - KA01AB1234",
    distance: "2.5 km",
    orders: 3,
    avatar: "/avatars/mike.png",
  },
  {
    id: "2",
    name: "John Driver",
    status: "On Duty",
    rating: 4.9,
    phone: "+1 234 567 8911",
    vehicle: "Van - KA01CD5678",
    distance: "5.2 km",
    orders: 8,
    avatar: "/avatars/john.png",
  },
  {
    id: "3",
    name: "John Driver",
    status: "On Duty",
    rating: 4.9,
    phone: "+1 234 567 8911",
    vehicle: "Van - KA01CD5678",
    distance: "5.2 km",
    orders: 8,
    avatar: "/avatars/john.png",
  },
  {
    id: "4",
    name: "John Driver",
    status: "On Duty",
    rating: 4.9,
    phone: "+1 234 567 8911",
    vehicle: "Van - KA01CD5678",
    distance: "5.2 km",
    orders: 8,
    avatar: "/avatars/john.png",
  },
];

const PickupHeader = () => {
          const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      
      {/* Left content */}
      <div>
        <h2 className="font-bold text-[24px] leading-[32px] text-[#101828]">
Pickup & Delivery Schedule        </h2>
        <p className="font-normal text-[14px] leading-[20px] text-[#6A7282] pt-2">
Manage pickup and delivery schedules        </p>
      </div>

      {/* Right button */}
      <div className="flex">
      <button className="h-9 rounded-[10px] text-[14px] leading-[20px] font-normal bg-[#FFFFFF] text-[#0A0A0A] px-4 border">
        Selected Date
      </button>
      <div className="pl-2">
      <button        
       onClick={() => setOpen(true)}
 className="h-9 rounded-[10px] text-[14px] leading-[20px] font-normal  px-4 border bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] text-white">
       Assign Driver
      </button>
      </div>
      </div>
      <AssignDriverModal
        open={open}
        onClose={() => setOpen(false)}
        onAssign={(id) => console.log("Assign driver:", id)}
        orderId="ORD-001"
        drivers={drivers}
      />

    </div>
  );
};

export default PickupHeader;
