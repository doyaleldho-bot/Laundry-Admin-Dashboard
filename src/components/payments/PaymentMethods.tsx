import React from "react";

interface Method {
  id: string;
  name: string;
  amount: string;
  icon: string;
  bg: string;
}

const mockMethods: Method[] = [
  {
    id: "1",
    name: "Cards",
    amount: "$15,240",
    icon: "💳",
    bg: "bg-blue-50",
  },
  {
    id: "2",
    name: "Cash",
    amount: "$5,680",
    icon: "💵",
    bg: "bg-green-50",
  },
  {
    id: "3",
    name: "UPI",
    amount: "$3,660",
    icon: "📱",
    bg: "bg-purple-50",
  },
];

const PaymentMethods: React.FC = () => {
  return (
    <div
      className="bg-white w-full max-w-[553.51px] rounded-[14px] border"
      style={{
       
        height: "365.8px",
        paddingTop: "23.98px",
        paddingLeft: "23.98px",
        paddingRight: "23.98px",
        borderWidth: "1.25px",
        borderColor: "#E5E7EB",
      }}
    >
      <h3 className="text-[16px] font-semibold text-[#101828] mb-6">
        Payment Methods
      </h3>

      <div className="flex flex-col gap-4 pr-4">
        {mockMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center justify-between px-4 py-4 rounded-xl ${method.bg}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg shadow">
                {method.icon}
              </div>

              <span className="text-sm font-medium text-[#101828]">
                {method.name}
              </span>
            </div>

            <span className="text-sm font-semibold text-[#101828]">
              {method.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
