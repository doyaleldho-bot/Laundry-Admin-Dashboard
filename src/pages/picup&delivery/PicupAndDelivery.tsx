import PicupCard from '../../components/pickup&delivery/PicupCards'
import PickupHeader from '../../components/pickup&delivery/PicupHeader'
import { useDashboardViewModel } from '../Dashboard/DashboardViewModel';
import ErrorState from '../../components/ErrorState';
import { useState } from 'react';




import pickup from "../../assets/picup&delivery/pickups.svg"
import delivery from "../../assets/picup&delivery/delivery.svg"
import transit from "../../assets/picup&delivery/transit.svg"
import comp from "../../assets/picup&delivery/Completed.svg"

import ScheduleTabs from '../../components/pickup&delivery/ScheduleTabs';
import PickupCard from '../../components/pickup&delivery/PickupCard';


const PicupAndDelivery = () => {
     const { data, error } = useDashboardViewModel();
       const [activeTab, setActiveTab] = useState<"pickup" | "delivery">("pickup");

  

  if (error) return <ErrorState message={error} />;

  const pickupList = [
  {
    orderId: "ORD-1234",
    status: "Scheduled",
    customerName: "John Doe",
    phone: "+1 234 567 8901",
    address: "123 Main St, Apt 4B, Downtown",
    driver: "Not Assigned",
    time: "10:00 AM - 11:00 AM",
    items: 5,
  },
  {
    orderId: "ORD-1235",
    status: "In Transit",
    customerName: "Jane Smith",
    phone: "+1 234 567 8902",
    address: "456 Oak Avenue, Suite 200",
    driver: "Mike",
    time: "11:00 AM - 12:00 PM",
    items: 8,
  },
  {
    orderId: "ORD-1236",
    status: "Completed",
    customerName: "Jane Smith",
    phone: "+1 234 567 8902",
    address: "456 Oak Avenue, Suite 200",
    driver: "Mike",
    time: "11:00 AM - 12:00 PM",
    items: 8,
  },
];

const deliveryList = [
  {
    orderId: "DEL-2001",
    status: "Out for Delivery",
    customerName: "Emily Davis",
    phone: "+1 234 567 8906",
    address: "321 Elm Street, Floor 3",
    driver: "John",
    time: "3:00 PM - 4:00 PM",
    items: 10,
    showComplete: false,
  },
  {
    orderId: "DEL-2003",
    status: "Ready",
    customerName: "Emily Davis",
    phone: "+1 234 567 8906",
    address: "321 Elm Street, Floor 3",
    driver: "John",
    time: "3:00 PM - 4:00 PM",
    items: 10,
    showComplete: false,
  },
];

   

  return (
    <div className='p-6'>
        <PickupHeader />
         <div className="grid grid-cols-4 gap-5 mb-5 pt-[30px]" >
     
          <>
            <PicupCard title="Today's order" value={48}   bd="blue" color="blue" icon={<img src={pickup} alt="logo" className="w-12 h-12" />} />
            <PicupCard title="In Process" value={23}  color="purple" bd="purple" icon={<img src={delivery} alt="logo" className="w-12 h-12" />} />
            <PicupCard title="Pending Picups" value={15} color="red" bd="red" icon={<img src={transit} alt="logo" className="w-12 h-12" />} />
            <PicupCard title="Ready for Delivery" value={18}  color="green" bd= "green" icon={<img src={comp} alt="logo" className="w-12 h-12" />} />
           
          </>
        
      </div>

        <div className="mb-6">
        <ScheduleTabs active={activeTab} onChange={setActiveTab} />
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
  {activeTab === "pickup" ? "Today's Pickups" : "Today's Deliveries"}
</h2>


       <div className="space-y-4">
  {(activeTab === "pickup" ? pickupList : deliveryList).map((item) => (
    <PickupCard
      key={item.orderId}
      orderId={item.orderId}
      status={item.status}
      customerName={item.customerName}
      phone={item.phone}
      address={item.address}
      driver={item.driver}
      time={item.time}
      items={item.items}
      showComplete={item.showComplete}
    />
  ))}
</div>

      </div>
    
        
    </div>
  )
}

export default PicupAndDelivery