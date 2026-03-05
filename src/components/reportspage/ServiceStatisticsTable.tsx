import React from "react";

interface serviceData {
      name: string;
      totalQuantity: number;
      totalRevenue: number;
      averageOrderValue: number;
      percentageOfTotal: number;
    }

const ServiceStatisticsTable: React.FC<{ data: serviceData[] }> = ({ data }) => {

  return (
    <div className="bg-white border border-gray-200 rounded-[14px] opacity-100 max-w-[1708px] w-full h-[462px] px-6 py-6">
      {/* Header */}
      <h3 className="font-semibold text-gray-900 text-xl">Service Statistics</h3>
      <p className="text-sm text-gray-500 mb-6">Detailed breakdown of services</p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 text-sm border-b  border-gray-200">
              <th className="py-3 px-4">Service Type</th>
              <th className="py-3 px-4">Total Orders</th>
              <th className="py-3 px-4">Total Revenue</th>
              <th className="py-3 px-4">Avg. Order Value</th>
              <th className="py-3 px-4">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 text-gray-900 text-left">
                <td className="py-4 px-4 font-medium">{row.name}</td>
                <td className="py-4 px-4">{row.totalQuantity}</td>
                <td className="py-4 px-4 text-green-600 font-arimo">{row.totalRevenue}</td>
                <td className="py-4 px-4">{row.averageOrderValue}</td>
                <td className="py-4 px-4">{row.percentageOfTotal}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceStatisticsTable;