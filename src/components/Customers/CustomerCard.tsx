import { Eye } from "lucide-react";
import { FiMail, FiPhone, FiMapPin, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router";


export interface Customer {
  id: string;
  name: string;
  avatar?: string;
  status?: string;
  rating?: number;
  email: string;
  phone: string;
   addressLine?: string;
  city?: string;
  pincode?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

interface Props {
  customer: Customer;
}

const CustomerCard = ({ customer }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white border rounded-[14px] w-full"
      style={{
        paddingTop: "25.23px",
        paddingRight: "25.23px",
        paddingBottom: "12px",
        paddingLeft: "25.23px",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={customer.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY9Tov8HVmyE0_NxqBEbm4pwjlAZZADRLG8A&s'}
            alt={customer.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-gray-900">{customer.name}</h3>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-yellow-500">
                <FiStar size={16} className="text-yellow-500" /> {customer.rating  ? customer.rating : "0"}
              </span>
            </div>
          </div>
        </div>

        <Eye className="w-4 h-4 text-gray-400 cursor-pointer" />
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FiMail className="text-blue-500" size={16} />
          <span>{customer.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiPhone className="text-green-500" size={16} />
          <span>{customer.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiMapPin className="text-red-500" size={16} />
          <span>
            {customer.addressLine},{" "}
            {customer.city} -{" "}
            {customer.pincode}
          </span>
        </div>
      </div>

      <hr className="my-4" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Total Orders</p>
          <p className="font-semibold text-gray-900">
            {customer.totalOrders}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Total Spent</p>
          <p className="font-semibold text-green-600">
            ${customer.totalSpent}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Last Order</p>
          <p className="font-semibold text-gray-900">
         {new Date(customer.lastOrder).toISOString().split("T")[0]}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid  gap-3 ">
        <button  onClick={() => navigate(`/customers/${customer.id}/orders`)} className="h-9 w-full order rounded-lg text-sm bg-gray-100 hover:bg-blue-300">
          View Orders
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
