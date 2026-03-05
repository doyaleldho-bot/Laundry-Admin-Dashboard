import React from "react";
import { Upload } from "lucide-react";
import { useRef } from "react";




interface CreateSupportTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void; // backend ready
}

const CreateSupportTicketModal: React.FC<CreateSupportTicketModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  if (!open) return null;


  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    // backend ready
    console.log("Selected files:", files);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[520px] bg-white rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-500 to-purple-600">
          <h2 className="text-white font-semibold text-lg">
            Create Support Ticket
          </h2>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* Ticket Information */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Ticket Information
            </h3>

            <div className="">
                <p className="font-arimo text-[14px] leading-[14px] pb-1">Subject*</p>
              <input
                type="text"
                placeholder="Brief description of the issue"
                className="w-full h-9 px-3 text-sm bg-gray-100 rounded-md outline-none"
              />

             <div className="grid grid-cols-2 gap-4 pt-3">
  {/* Category */}
  <div className="flex flex-col">
    <p className="font-arimo text-[14px] leading-[14px] pb-1">
      Category*
    </p>
    <input 
    title="category"
      type="text"
      className="w-full h-9 px-3 text-sm border rounded-md outline-none"
    />
  </div>

  {/* Priority */}
  <div className="flex flex-col">
    <p className="font-arimo text-[14px] leading-[14px] pb-1">
      Priority*
    </p>
    <input
      type="text"
      title="Priority "
      className="w-full h-9 px-3 text-sm border rounded-md outline-none"
    />
  </div>
</div>

            </div>
          </section>

          {/* Customer Details */}
          <section className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Customer Details
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Customer Name *"
                defaultValue="John Doe"
                className="h-9 px-3 text-sm bg-white rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number *"
                defaultValue="+1 234 567 8900"
                className="h-9 px-3 text-sm bg-white rounded-md outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                defaultValue="john@example.com"
                className="h-9 px-3 text-sm bg-white rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="Related Order ID"
                defaultValue="ORD-001"
                className="h-9 px-3 text-sm bg-white rounded-md outline-none"
              />
            </div>
          </section>

          {/* Issue Description */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Issue Description
            </h3>

            <textarea
              placeholder="Please provide a detailed description of the issue, including what happened, when it happened,"
              className="w-full h-[90px] p-3 text-sm bg-[#E5E7EB] rounded-md border resize-none"
            />
          </section>

          {/* Attachments */}
          <section>
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        Attachments (Optional)
      </h3>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".png,.jpg,.jpeg,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Clickable upload box */}
      <div
        onClick={handleClick}
        className="cursor-pointer border-2 border-dashed rounded-lg p-6 flex flex-col items-center text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        <Upload className="w-6 h-6 mb-2" />
        <p>Click to upload or drag and drop</p>
        <span className="text-xs">
          PNG, JPG, PDF up to 10MB (Max 5 files)
        </span>
      </div>
    </section>

          {/* Assignment */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Assignment
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Department"
                className="h-9 px-3 text-sm border rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="Assign to Agent"
                className="h-9 px-3 text-sm border rounded-md outline-none"
              />
            </div>
          </section>

          {/* Additional Settings */}
          <section className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
            <p>Notify customer via email/SMS</p>
            <p>Escalate to supervisor if not resolved in 24 hours</p>
            <p>Schedule follow-up after resolution</p>
          </section>

          {/* Footer Fields */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Expected Resolution Date"
              className="h-9 px-3 text-sm border rounded-md outline-none"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              defaultValue="urgent, refund, quality"
              className="h-9 px-3 text-sm border rounded-md outline-none"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit?.({})}
            className="px-4 py-2 text-sm text-white rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSupportTicketModal;
