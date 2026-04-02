import { FiSearch, FiBell, FiCalendar } from "react-icons/fi";
import logo from "../assets/main-logo.svg";
import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { getProfile } from "../services/api/profileService";

type Props = {
  onDateChange: (date: string) => void;
};

const Navbar = ({ onDateChange }: Props) => {

  const [profile, setProfile] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dateValue, setDateValue] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
    const res = await getProfile();
    setProfile(res.data.user);
  };
  fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  //logout
  const handleLogout = async () => {
    try {
      await api.post("/admin/logout"); // your logout API
      // localStorage.clear();   
      localStorage.removeItem('adm'); 
      window.location.href = "/login"; // redirect
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Function to format date as dd/mm/yyyy
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <header className="h-[64px] w-full bg-white border-b border-gray-200 pl-4 md:pl-10 flex items-center justify-between pr-6">

      {/* LEFT */}
      <div className="flex items-center gap-[10px] min-w-fit">
        <img src={logo} alt="logo" className="w-10 h-10" />

        <div className="leading-tight hidden sm:block">
          <p className="text-[#002F96] text-[18px] font-semibold leading-[100%] tracking-normal">
            Juggle Laundry
          </p>
          <p className="text-[#002F96] text-[16px] font-normal leading-[100%] tracking-normal pt-[9px]">
            {profile?.branch.name} Branch
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex-1 max-w-[713px] mx-3 md:mx-6 hidden md:block">
        <div className="flex items-center border border-[#002F96] rounded-[5px] pl-10 pr-4 py-2 gap-2">
          <FiSearch size={24} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search users, campaigns, tasks"
            className="
              w-full
              bg-transparent
              focus:outline-none
              text-[12px]
              leading-[16px]
              tracking-[0.08em]
              pl-2
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 lg:gap-[60px] min-w-fit pr-4 md:pr-6">
        {/* TODAY / DATE PICKER */}
        <div className="relative hidden lg:flex items-center">
          <FiCalendar size={24} className="text-[#595959] absolute left-3" />

          <input
            type="date"
            value={dateValue || today} // default to today
            onChange={(e) => {
              setDateValue(e.target.value);
              onDateChange(e.target.value);
            }}
            className="h-[50px] w-[180px] pl-[40px] pr-3
          border border-gray-300 rounded-md
          text-transparent cursor-pointer
          hover:bg-gray-50 focus:outline-none
        "
          />

          {/* Overlay text */}
          <span className="absolute left-[45px] top-1/2 -translate-y-1/2 text-[#595959] pointer-events-none">
            {dateValue ? formatDate(dateValue) : "Today"}
          </span>
        </div>

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer">
          <FiBell size={25} className="text-[#000000]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </div>


        {/* Profile area */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={handleToggleDropdown}
          >
            <img
              src="https://www.shutterstock.com/image-vector/trusted-profile-icon-solid-black-600nw-2679396225.jpg"
              className="w-[45px] h-[45px] rounded-[4px] object-cover"
              alt={profile?.role || "Profile"}
            />
            <div className="ml-2 hidden sm:block leading-tight">
              <p className="font-medium text-[14px] text-[#002F96]">
                {profile?.name}
              </p>
              <p className="font-normal text-[#545454] text-[12px]">
                {profile?.role}
              </p>
            </div>
            <ChevronDownIcon
              className={`w-5 h-5 ml-2 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                }`}
            />
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded border border-gray-200 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-red-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
