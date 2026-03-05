import { useDashboardViewModel } from "./DashboardViewModel";
import ErrorState from "../../components/ErrorState/index";
import Header from "../../components/dashboard components/Header";
import StatsCard from "../../components/dashboard components/StatsCard";
// statscard
import today from "../../assets/statsCardDAshboard/order.svg"
import pending from "../../assets/statsCardDAshboard/pending.svg"
import progress from "../../assets/statsCardDAshboard/progress.svg"
import ready from "../../assets/statsCardDAshboard/ready.svg"
import OrderStatusChart from "../../components/dashboard components/OrderStatusChart";
// ColorCard
import amount from "../../assets/colorcardDashboard/amount.svg"
import cus from "../../assets/colorcardDashboard/customer.svg"
import del from "../../assets/colorcardDashboard/delivery.svg"

import RevenueGraph from "../../components/dashboard components/RevenueGraph";
import ColorCard from "../../components/dashboard components/ColorCard";
import RecentOrdersTable from "../../components/dashboard components/RecentOders";
import { useEffect, useState, useRef } from "react";
import { api } from "../../api/axiosInstance";
import { useOutletContext } from "react-router";
import { io, Socket } from "socket.io-client";
import { useDashboardStats } from "../../components/dashboard components/useDashboardStats";
import { useWeeklyStats } from "../../components/dashboard components/hook/useWeeklyStats";

type OutletContextType = {
  selectedDate: string;
};


const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const Dashboard = () => {
  const { status, selectedMonth, setSelectedMonth } = useDashboardStats();
  const { data, loading, error } = useDashboardViewModel();
  const { selectedDate } = useOutletContext<OutletContextType>();
  const socketRef = useRef<Socket | null>(null);
  const weeklyData = useWeeklyStats();

  const [stats, setStats] = useState<null | {
    totalOrders: number;
    totalOrdersPercent: number;
    pendingPickups: number;
    pendingPickupsPercent: number;
    inProcess: number;
    inProcessPercent: number;
    readyForDelivery: number;
    readyForDeliveryPercent: number;
  }>(null);
  

  // if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;


  const fetchDashboardStats = async (dateStr: string) => {
    const res = await api.get("/dashboard/order/data", {
      params: {
        date: dateStr,
      },
    });
    setStats(res.data);
  };

  // Fetch stats when selectedDate changes
  useEffect(() => {
    fetchDashboardStats(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    socketRef.current = io("http://localhost:5001");
    // Listen for dashboard updates
    const handleUpdate = () => fetchDashboardStats(selectedDate);
    socketRef.current.on("dashboard:update", handleUpdate);

    // Cleanup on unmount
    return () => {
      socketRef.current?.off("dashboard:update", handleUpdate);
      socketRef.current?.disconnect();
    };
  }, []);

  //for month label in color card
  const selectedMonthLabel =  months.find(m=>m.value==selectedMonth)?.label || "";

  return (
    <div className="p-6 pr-6 bg-[#EEF2F7]">
      <Header />

      <div className="grid grid-cols-4 gap-5 mb-5 pt-[30px]" >

        <>
          <StatsCard
            title="Today's order"
            value={stats?.totalOrders || 0}
            per={`${stats?.totalOrdersPercent}%`}
            bg="blue"
            color="blue"
            icon={<img src={today} alt="logo" className="w-12 h-12" />}
          />
          <StatsCard
            title="Pending Pickups"
            value={stats?.pendingPickups || 0}
            per={`${stats?.pendingPickupsPercent}%`}
            bg="red"
            color="red"
            icon={<img src={pending} alt="logo" className="w-12 h-12" />}
          />

          <StatsCard
            title="In Process"
            value={stats?.inProcess || 0}
            per={`${stats?.inProcessPercent}%`}
            bg="purple"
            color="purple"
            icon={<img src={progress} alt="logo" className="w-12 h-12" />}
          />

          <StatsCard
            title="Ready for Delivery"
            value={stats?.readyForDelivery || 0}
            per={`${stats?.readyForDeliveryPercent}%` || "0%"}
            bg="green"
            color="green"
            icon={<img src={ready} alt="logo" className="w-12 h-12" />}
          />
        </>

      </div>
      <div className="flex gap-4">
           <RevenueGraph data={weeklyData} />

        <OrderStatusChart />

      </div>

      <div className="flex flex-col gap-2 w-56 mt-5">
        <label
          htmlFor="monthSelect"
          className="text-sm font-semibold text-gray-700 tracking-wide"
        >
          Select Month
        </label>

        <div className="relative">
          <select id="monthSelect" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium  text-gray-700 shadow-sm
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:border-blue-500  hover:border-gray-400 cursor-pointer   "  >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          {/* Custom Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-5 mb-5 pt-[30px]" >

        <>
          <>
            <ColorCard
              title="Total Revenue"
              value={status.totalRevenue || 0}
               per={`For ${selectedMonthLabel}`}
              bg="blue"
              color="blue"
              icon={<img src={amount} alt="logo" className="w-12 h-12" />}
            />
            <ColorCard
              title="Total Customers"
              value={status.totalCustomers || 0}
              per="Active"
              color="red"
              bg="purple"
              icon={<img src={cus} alt="logo" className="w-12 h-12" />}
            />
            <ColorCard
              title="Deliveries Delivered"
              value={status.totalDelivered || 0}
             per={`For ${selectedMonthLabel}`}
              color="purple"
              bg="red"
              icon={<img src={del} alt="logo" className="w-12 h-12" />}
            />
          </>
        </>

      </div>
      <div className="">
        <RecentOrdersTable />
      </div>

    </div>
  );
};

export default Dashboard;
