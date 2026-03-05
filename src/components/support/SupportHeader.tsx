import { useState } from "react";
import CreateSupportTicketModal from "./CreateSupportTicketModal";
const SupportHeader = () => {
            const [open, setOpen] = useState(false);
  
  return (
 <div className="p-6 bg-[#F3F6F9] ">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
Support & Help Desk  
     </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
          Manage customer support tickets and inquiries
          </p>
        </div>

      

          

         <button 
         onClick={()=>setOpen(true)} className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
         >

         Create Ticket
        </button>


        </div>
         <CreateSupportTicketModal
        open={open}
        onClose={() => setOpen(false)}
      />
        </div>  )
}

export default SupportHeader