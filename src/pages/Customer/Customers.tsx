import { useMemo } from "react";
import React, { useEffect, useState } from "react";
import CustomerStatsCard from "../../components/Customers/CustomerStatsCard";
import { Users, Star, Mail, Award } from "lucide-react";
import CustomerSearchBar from "../../components/Customers/CustomerSearchBar";
import CustomerCard, { type Customer } from "../../components/Customers/CustomerCard";
import { api } from "../../api/axiosInstance";


const Customers: React.FC = () => {
const [customers, setCustomers] = useState<Customer[]>([]);
const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    totalCustomers: 0,
    vipCustomers: 0,
    newThisMonth: 0,
  });

  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const res = await api.get("/customer/count");

        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch customer stats:", error);
      }
    };

    fetchCustomerStats();
  }, []);
  
// Fetch customers for the branch
useEffect(() => {
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/customer/details/branch"); 
      setCustomers(res.data); 
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCustomers();
}, []);


const filteredCustomers = useMemo(() => {
  const searchLower = search.toLowerCase();
  return customers.filter((customer) => (
    customer.name?.toLowerCase().includes(searchLower) ||
    customer.email?.toLowerCase().includes(searchLower) ||
    customer.phone?.includes(search)
  ));
}, [customers, search]);

  return (
    <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
            Customer Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            View and manage customer information
          </p>
        </div>

      </div>

      {/* STATS ROW */}
      <div className="flex gap-4 mb-8">
        <CustomerStatsCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<Users size={16} className="text-blue-600" />}
          highlight
        />

        <CustomerStatsCard
          title="VIP Customers"
          value={stats.vipCustomers}
          icon={<Star size={16} className="text-purple-600" />}
        />

        <CustomerStatsCard
          title="New This Month"
          value={stats.newThisMonth}
          icon={<Mail size={16} className="text-green-600" />}
        />

        <CustomerStatsCard
          title="Avg. Rating"
          value="--"
          subtitle="Not Available"
          icon={<Award size={16} className="text-yellow-500" />}
        />
      </div>

      <div>
        <CustomerSearchBar
          value={search}
          onChange={setSearch}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {loading ? (
          <p>Loading customers...</p>
        ) : filteredCustomers.length === 0 ? (
          <p className="text-gray-500 text-sm">No customers found.</p>
        ) : (
          filteredCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        )}
      </div>
    </div>
  );
};

export default Customers;
