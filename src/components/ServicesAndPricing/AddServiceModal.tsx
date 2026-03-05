import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

const clothTypes = [
  "Shirts",
  "Trousers",
  "T-Shirts",
  "Jeans",
  "Sarees",
  "Suits",
  "Bedsheets",
  "Curtains",
  "Jackets",
];

const AddServiceModal: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [selectedCloths, setSelectedCloths] = useState<string[]>([
    "Shirts",
    "Trousers",
    "T-Shirts",
  ]);

  const toggleCloth = (item: string) => {
    setSelectedCloths((prev) =>
      prev.includes(item)
        ? prev.filter((c) => c !== item)
        : [...prev, item]
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] px-4 py-3">
          <h2 className="text-[24px] font-bold font-arimo text-white">
            Add New Service
          </h2>
          <button onClick={onClose}>
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto px-4 py-4 space-y-5">
          {/* Basic Information */}
          <section>
            <h3 className="text-[18px] font-bold font-arimo text-[#101828] mb-2">
              Basic Information
            </h3>

            <div className="">
                <p className="font-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Service Name *</p>
              <input
                placeholder="e.g., Wash & Iron"
                className="w-full rounded-md border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2 text-xs outline-none"
              />
                <p className="pt-2 font-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Description</p>
              <textarea
                placeholder="Describe the service details"
                className="w-full rounded-md border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2 text-xs outline-none"
              />

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                                <p className="pt-2 font-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Service Code</p>

                <input
                  placeholder="WI-001"
                  className="rounded-md border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2 text-xs outline-none"
                />
                </div>
                <div className="flex flex-col">
               <p className="pt-2 font-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Category*</p>

                <input
                  placeholder="Category"
                  className="rounded-md border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2 text-xs outline-none"
                />
                </div>
              </div>
            </div>
          </section>

          {/* Default Pricing */}
          <section className="rounded-lg border border-[#D1FAE5] bg-[#ECFDF3] p-3">
            <h3 className="flex items-center gap-2 text-xs font-semibold text-black mb-2">
              <span className="text-black">$</span> Default Pricing
            </h3>
            <p className="text-[10px] text-[#4A5565] mb-3">
              Set default base price. You can customize pricing per cloth
              category later.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[#4A5565]">
                  Base Price ($)
                </label>
                <input
                  defaultValue={50}
                  className="mt-1 w-full rounded-md border border-[#A7F3D0] bg-white px-2 py-1.5 text-xs outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#4A5565]">
                  Express Charge ($)
                </label>
                <input
                  defaultValue={25}
                  className="mt-1 w-full rounded-md border border-[#A7F3D0] bg-white px-2 py-1.5 text-xs outline-none"
                />
              </div>
            </div>
          </section>

          {/* Service Duration */}
          <section>
            <h3 className="text-xs font-semibold text-[#344054] mb-2">
              Service Duration
            </h3>

            <div className="grid grid-cols-2 gap-">
                <div className="flex flex-col">
                <p className="font-arimo text-[14px] leading-[14px]">Standard duration (hours)*</p>
              <input
                placeholder="Standard Duration (hours)"
                defaultValue={48}
                className="rounded-md border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2 text-xs outline-none"
              />
              </div>
              <div className="flex flex-col">
                              <p className="font-arimo text-[14px] leading-[14px]">Express duration (hours)</p>

              <input
                placeholder="Express Duration (hours)"
                defaultValue={24}
                className="rounded-md border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2 text-xs outline-none"
              />
              </div>
            </div>
          </section>

          {/* Service Features */}
          <section>
            <h3 className="text-xs font-semibold text-[#344054] mb-3">
              Service Features
            </h3>

            {[
              "Express Service Available",
              "Pickup Service",
              "Delivery Service",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center justify-between mb-3"
              >
                <div>
                  <p className="text-xs text-[#344054]">{label}</p>
                  <p className="text-[10px] text-[#667085]">
                    {label === "Express Service Available" &&
                      "Allow customers to request express delivery"}
                    {label === "Pickup Service" &&
                      "Offer pickup from customer location"}
                    {label === "Delivery Service" &&
                      "Offer delivery to customer location"}
                  </p>
                </div>

                <button className="relative h-5 w-9 rounded-full bg-black">
                  <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                </button>
              </div>
            ))}
          </section>

          {/* Applicable Cloth Types */}
          <section>
            <h3 className="text-xs font-semibold text-[#344054] mb-2">
              Applicable Cloth Types
            </h3>
            <p className="text-[10px] text-[#667085] mb-3">
              Select which cloth types this service applies to
            </p>

            <div className="flex flex-wrap gap-2">
              {clothTypes.map((item) => {
                const active = selectedCloths.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleCloth(item)}
                    className={`rounded-md px-3 py-1 text-[11px] border ${
                      active
                        ? "bg-[#EFF4FF] border-[#C7D7FE] text-[#1D4ED8]"
                        : "bg-white border-[#EAECF0] text-[#344054]"
                    }`}
                  >
                    {item}
                  </button
                  >
                );
              })}
            </div>
          </section>

          {/* Service Status */}
          <section className="rounded-lg border border-[#DBEAFE] bg-[#EFF6FF] p-3">
            <h3 className="text-xs font-semibold text-[#1E40AF] mb-2">
              Service Status
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#1E3A8A]">
                  Activate this service immediately
                </p>
                <p className="text-[10px] text-[#3B82F6]">
                  Mark as featured service
                </p>
              </div>

              <button className="relative h-5 w-9 rounded-full bg-black">
                <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-[#EAECF0] px-4 py-3">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-1.5 text-xs"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit?.({})}
            className="rounded-md bg-[#2563EB] px-4 py-1.5 text-xs text-white"
          >
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
