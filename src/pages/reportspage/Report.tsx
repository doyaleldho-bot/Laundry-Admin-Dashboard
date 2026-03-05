import React, { useEffect } from 'react'
import RevenueTrendsCard from '../../components/reportspage/RevenueTrendsCard'
import TopCustomersCard from '../../components/reportspage/TopCustomersCard'
import ServicePerformanceCard from '../../components/reportspage/ServicePerformanceChart'
import ServiceRevenueCard from '../../components/reportspage/ServiceRevenueChart'
import ServiceStatisticsTable from '../../components/reportspage/ServiceStatisticsTable'
import { api } from '../../api/axiosInstance'


interface PerformanceData {
  name: string;
  totalQuantity: number;
  totalRevenue: number;
  averageOrderValue: number;
  percentageOfTotal: number;
}

const Report: React.FC = () => {
  const [performanceData, setPerformanceData] = React.useState<PerformanceData[]>([]);
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const res = await api.get("/service-performance/graph");
        setPerformanceData(res.data);
      } catch (err) {
        console.error("Failed to fetch service performance data", err);
      }
    };

    fetchPerformanceData();
  }, []);


  const DownloadReport = async () => {
    try {
    const response = await api.get("/service-performance/graph?download=true",
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ServicePerformance.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download failed", error);
  }
  }

  return (
    <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
            Reports & Analytics
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Comprehensive business insights and analytics
          </p>
        </div>

        <div className='flex gap-2'>
          <button onClick={()=>DownloadReport()} className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
          >
            Download report
          </button>


        </div>
      </div>

      <section className='flex gap-4 mt-8'>
        <RevenueTrendsCard />
        <TopCustomersCard />

      </section>


      <section className='flex gap-4 mt-8'>
        <ServicePerformanceCard data={performanceData} />
        <ServiceRevenueCard data={performanceData} />
      </section>

      <div className='mt-8'>
        <ServiceStatisticsTable data={performanceData} />
      </div>

    </div>
  )
}

export default Report
