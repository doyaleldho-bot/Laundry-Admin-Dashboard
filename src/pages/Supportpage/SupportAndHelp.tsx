import React from 'react'
import SupportHeader from '../../components/support/SupportHeader'
import SupportCard from '../../components/support/SupportCard'
import SupportTickets from '../../components/support/SupportTickets'
import todays from "../../assets/support/tickets.svg"
import progress from "../../assets/support/supportProgress.svg"
import today from "../../assets/support/resolved.svg"
import response from "../../assets/support/response.svg"

const SupportAndHelp : React.FC = () => {
  return (
  <div className="p-6">
      <SupportHeader />
      <div className="grid grid-cols-4 gap-5 mb-5 pt-[30px]" >
          <>
            <SupportCard title="Open Tickets" value={12}   bd="blue" color="blue" icon={<img src={todays} alt="logo" className="w-12 h-12" />} />
            <SupportCard title="Resolves Today" value={15} color="red" bd="red" icon={<img src={progress} alt="logo" className="w-12 h-12" />} />
            <SupportCard title="Avg. Response Time" value={18}  color="green" bd= "green" icon={<img src={today} alt="logo" className="w-12 h-12" />} />
            <SupportCard title="In Process" value={23}  color="purple" bd="purple" icon={<img src={response} alt="logo" className="w-12 h-12" />} />
          </>
        
      </div>
      <div className="">
        <SupportTickets />
      </div>
  </div>

  )
}

export default SupportAndHelp
