// import { X } from "lucide-react";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// const AddCustomerModal = ({ open, onClose }: Props) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div
//         className="bg-white rounded-[10px] w-[672px] max-h-[90vh] overflow-y-auto"
//         style={{ height: "1227px" }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-[10px]">
//           <h2 className="text-white font-semibold">Add New Customer</h2>
//           <button onClick={onClose}>
//             <X className="text-white w-5 h-5" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-6 text-sm">
//           {/* Personal Info */}
//           <section>
//             <h3 className="font-semibold mb-3">👤 Personal Information</h3>

//             <div className="grid grid-cols-2 gap-4">
//               <input placeholder="First Name *" className="input" />
//               <input placeholder="Last Name *" className="input" />
//             </div>
//           </section>

//           {/* Contact Info */}
//           <section>
//             <h3 className="font-semibold mb-3">📞 Contact Information</h3>

//             <div className="grid grid-cols-2 gap-4">
//               <input placeholder="Phone Number *" className="input" />
//               <input placeholder="Email Address *" className="input" />
//             </div>

//             <input
//               placeholder="Alternate Phone"
//               className="input w-full mt-3"
//             />
//           </section>

//           {/* Address */}
//           <section>
//             <h3 className="font-semibold mb-3">📍 Address Information</h3>

//             <textarea
//               placeholder="Street Address *"
//               className="input w-full h-20"
//             />

//             <div className="grid grid-cols-3 gap-4 mt-3">
//               <input placeholder="City *" className="input" />
//               <input placeholder="State *" className="input" />
//               <input placeholder="ZIP Code *" className="input" />
//             </div>

//             <input placeholder="Landmark" className="input w-full mt-3" />
//           </section>

//           {/* Additional */}
//           <section>
//             <h3 className="font-semibold mb-3">📝 Additional Information</h3>

//             <div className="grid grid-cols-2 gap-4">
//               <input placeholder="Customer Type" className="input" />
//               <input placeholder="Preferred Branch" className="input" />
//             </div>

//             <textarea
//               placeholder="Notes"
//               className="input w-full h-24 mt-3"
//             />
//           </section>

//           {/* Preferences */}
//           <section className="bg-blue-50 border rounded-lg p-4">
//             <h3 className="font-semibold mb-2">Preferences</h3>

//             <div className="space-y-2">
//               <label className="flex gap-2 items-center">
//                 <input type="checkbox" />
//                 Send SMS notifications
//               </label>

//               <label className="flex gap-2 items-center">
//                 <input type="checkbox" />
//                 Send email notifications
//               </label>

//               <label className="flex gap-2 items-center">
//                 <input type="checkbox" />
//                 WhatsApp updates
//               </label>
//             </div>
//           </section>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 p-6 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 h-9 border rounded-lg text-sm"
//           >
//             Cancel
//           </button>

//           <button className="px-4 h-9 bg-blue-600 text-white rounded-lg text-sm">
//             Add Customer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCustomerModal;
