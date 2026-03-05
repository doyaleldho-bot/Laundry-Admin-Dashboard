import React, { useState } from 'react'
import AdminStaffStatsCard from '../../components/admin&staff/AdminStaffStatsCard'
import StaffManagementCard from '../../components/admin&staff/StaffManagementSection'
import AddUserModal from '../../components/Modal/AddUserModal';

const AdminAndStaff : React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
Admin & Staff Management  
     </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
     Manage administrators, staff, and delivery personnel          </p>
        </div>
         <button onClick={() => setOpen(true)} className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
         >

          + Add User
        </button>
            {open && <AddUserModal onClose={() => setOpen(false)} />}
        </div>

<div>
    <AdminStaffStatsCard/>
</div>

<section>
    <StaffManagementCard/>
</section>

        </div>
  )
}

export default AdminAndStaff
