import React from 'react'

import SettingsTabsContainer from '../../components/settingspage/SettingsTabsContainer'



const Settings: React.FC = () => {
    
 
  
  return (
   <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
          Settings
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
           Configure your admin panel and business settings
          </p>
        </div>
  <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"  
         >

         Save Changes
        </button> 

        </div>
<SettingsTabsContainer/>


    </div>
       
        

  )
}

export default Settings
