import { useState } from "react";
import ServiceTypeCard, {type ServiceType } from "../../components/ServicesAndPricing/ServiceTypeCard";

const initialServices: ServiceType[] = [
  {
    id: "1",
    title: "Wash & Iron",
    description: "Standard washing with ironing",
    duration: "48 hours",
    enabled: true,
  },
  {
    id: "2",
    title: "Dry Clean",
    description: "Professional dry cleaning service",
    duration: "72 hours",
    enabled: true,
  },
  {
    id: "3",
    title: "Iron Only",
    description: "Ironing service for clean clothes",
    duration: "24 hours",
    enabled: true,
  },
  {
    id: "4",
    title: "Express Wash",
    description: "Fast washing and delivery",
    duration: "24 hours",
    enabled: true,
  },
  {
    id: "5",
    title: "Wash & Fold",
    description: "Washing and folding without ironing",
    duration: "36 hours",
    enabled: true,
  },
];

const ServiceTypesPage = () => {
  const [services, setServices] = useState<ServiceType[]>(initialServices);

  const handleToggle = (id: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, enabled: !service.enabled }
          : service
      )
    );
  };  return (
    <div className="rounded-xl bg-white p-6  shadow-sm">
      <h2 className="mb-6 text-sm font-semibold text-[#101828]">
        Service Types
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceTypeCard
          key={service.id}
          service={service}
          onToggle={handleToggle}
          onEdit={(id) => console.log("edit", id)}
          onDelete={(id) => console.log("delete", id)}
        />
      ))}
    </div>
    </div>
  );
};

export default ServiceTypesPage;
