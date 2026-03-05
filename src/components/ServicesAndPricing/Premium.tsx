import { useState } from "react";

export interface PremiumService {
  id: string;
  title: string;
  type: "Premium" | "Add-on";
  description: string;
  extraCharge: number;
  enabled: boolean;
}

const initialServices: PremiumService[] = [
  {
    id: "1",
    title: "Express Delivery",
    type: "Premium",
    description: "24-hour delivery guarantee",
    extraCharge: 50,
    enabled: true,
  },
  {
    id: "2",
    title: "Stain Removal",
    type: "Add-on",
    description: "Professional stain treatment",
    extraCharge: 30,
    enabled: true,
  },
  {
    id: "3",
    title: "Premium Packaging",
    type: "Add-on",
    description: "Sealed and branded packaging",
    extraCharge: 20,
    enabled: true,
  },
];

const badgeStyles = {
  Premium: "bg-purple-100 text-purple-700",
  "Add-on": "bg-green-100 text-green-700",
};

const Premium = () => {
  const [services, setServices] = useState<PremiumService[]>(initialServices);

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, enabled: !service.enabled }
          : service
      )
    );
  };

  const updateCharge = (id: string, value: number) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, extraCharge: value } : service
      )
    );
  };

  return (
    <div className="rounded-xl border border-[#EAECF0] bg-white p-6">
      {/* Header */}
      <h2 className="text-sm font-semibold text-[#101828]">
        Premium & Add-on Services
      </h2>

      {/* List */}
      <div className="mt-4 space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-lg border border-[#EAECF0] bg-white px-4 py-3"
          >
            {/* Left */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#101828]">
                  {service.title}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeStyles[service.type]}`}
                >
                  {service.type}
                </span>
              </div>
              <p className="text-xs text-[#667085]">
                {service.description}
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Extra Charge */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#667085]">Extra Charge:</span>
                <input
                title="number"
                  type="number"
                  value={service.extraCharge}
                  onChange={(e) =>
                    updateCharge(service.id, Number(e.target.value))
                  }
                  className="h-7 w-16 rounded-md bg-[#F2F4F7] px-2 text-xs text-[#101828] outline-none"
                />
              </div>

              {/* Toggle */}
              <button
              title="btn"
                onClick={() => toggleService(service.id)}
                className={`relative h-5 w-9 rounded-full transition ${
                  service.enabled ? "bg-black" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                    service.enabled ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
