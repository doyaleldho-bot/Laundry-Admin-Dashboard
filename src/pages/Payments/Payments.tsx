import React from 'react'
import PaymentStatCard from '../../components/payments/PaymentStatCard'
import revenueIcon from "../../assets/icons/revenueicon.svg"
import pendingIcon from "../../assets/icons/pendingicon.svg"
import collectedIcon from "../../assets/icons/collectedicon.svg"
import onlineIcon from "../../assets/icons/onlineicon.svg"
import PaymentMethods from '../../components/payments/PaymentMethods'
import PendingCollections from '../../components/payments/PendingCollections'
import RecentTransactions from '../../components/payments/RecentTransactions'



const Payments : React.FC = ()=> {
  return (
     <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
        Payments & Billing         
 </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Track and manage all payment transactions
          </p>
        </div>
         <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
         >

          Record Payment  
        </button>
        </div>

 {/* Stats */}
<div className="flex gap-4 mb-8">
  <PaymentStatCard
    title="Total Revenue (This Month)"
    value="$24,580"
    subtitle="+18%"
    badge="+18%"
    icon={revenueIcon}
    gradient="linear-gradient(135deg, #020617 0%, #155DFC 100%)"
  />

  <PaymentStatCard
    title="Pending Payments"
    value="$3,240"
    subtitle="8 orders"
    badge="8 orders"
    icon={pendingIcon}
    gradient="linear-gradient(135deg, #451a03 0%, #ea580c 100%)"
  />

  <PaymentStatCard
    title="Collected Today"
    value="$1,850"
    subtitle="+12%"
    badge="+12%"
    icon={collectedIcon}
    gradient="linear-gradient(135deg, #052e16 0%, #16a34a 100%)"
  />

  <PaymentStatCard
    title="Online Payments"
    value="$18,920"
    subtitle="77% of total"
    badge="77% of total"
    icon={onlineIcon}
    gradient="linear-gradient(135deg, #2e026d 0%, #7c3aed 100%)"
  />
</div>

<div className='flex gap-[20px] mb-8'>
    <PaymentMethods/>

    <PendingCollections/>

</div>

<RecentTransactions/>

        </div>
  )
}

export default Payments
