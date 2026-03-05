import { Pencil, Trash2 } from "lucide-react";

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  duration: string;
  enabled: boolean;
}

interface Props {
  service: ServiceType;
  onToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ServiceTypeCard: React.FC<Props> = ({
  service,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-between gap-4 rounded-lg border border-[#EAECF0] bg-white p-4">
      {/* LEFT */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-[#101828]">
          {service.title}
        </h3>
        <p className="text-xs text-[#667085]">
          {service.description}
        </p>

        <span className="mt-2 w-fit rounded-md bg-[#EFF4FF] px-2 py-0.5 text-xs text-[#155EEF]">
          {service.duration}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end justify-between">
        {/* Toggle */}
        <button
          onClick={() => onToggle?.(service.id)}
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

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button onClick={() => onEdit?.(service.id)}>
            <Pencil size={14} className="text-[#667085]" />
          </button>
          <button onClick={() => onDelete?.(service.id)}>
            <Trash2 size={14} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTypeCard;
