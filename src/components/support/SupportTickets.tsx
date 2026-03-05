import React, { useState } from "react";
import {  User, Mail, Clock } from "lucide-react";

type TicketStatus = "Open" | "In Progress" | "Resolved";
type Priority = "High" | "Medium" | "Low";

interface Ticket {
  id: string;
  code: string;
  title: string;
  message: string;
  customerName: string;
  email: string;
  timeAgo: string;
  orderId: string;
  status: TicketStatus;
  priority: Priority;
}

const statusStyles: Record<TicketStatus, string> = {
  Open: "bg-blue-100 text-blue-700",
  "In Progress": "bg-orange-100 text-orange-700",
  Resolved: "bg-green-100 text-green-700",
};

const priorityStyles: Record<Priority, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-orange-100 text-orange-700",
  Low: "bg-green-100 text-green-700",
};

const SupportTickets: React.FC = () => {
  const [tickets] = useState<Ticket[]>([
    {
      id: "1",
      code: "TKT-1001",
      title: "Damaged item complaint",
      message:
        "One of my shirts came back with a tear. I need this to be resolved.",
      customerName: "John Doe",
      email: "john.doe@email.com",
      timeAgo: "2 hours ago",
      orderId: "ORD-1234",
      status: "Open",
      priority: "High",
    },
    {
      id: "2",
      code: "TKT-1002",
      title: "Delivery delay issue",
      message:
        "My order was supposed to be delivered yesterday but I haven't received it yet.",
      customerName: "Jane Smith",
      email: "jane.smith@email.com",
      timeAgo: "5 hours ago",
      orderId: "ORD-1235",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "3",
      code: "TKT-1003",
      title: "Payment not reflected",
      message:
        "I made the payment online but it's still showing as pending.",
      customerName: "Mike Johnson",
      email: "mike.j@email.com",
      timeAgo: "1 day ago",
      orderId: "ORD-1236",
      status: "Resolved",
      priority: "Low",
    },
  ]);

  return (
    <div className="space-y-6">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-center">
              <span className="text-sm font-semibold text-blue-600">
                #{ticket.code}
              </span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full ${statusStyles[ticket.status]}`}
              >
                {ticket.status}
              </span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full ${priorityStyles[ticket.priority]}`}
              >
                {ticket.priority} Priority
              </span>
            </div>

            <div className="text-right text-sm text-gray-500">
              <p>Order</p>
              <p className="text-blue-600 font-medium">
                #{ticket.orderId}
              </p>
            </div>
          </div>

          {/* TITLE */}
          <h3 className="mt-2 font-semibold text-gray-900">
            {ticket.title}
          </h3>

          {/* META */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
            <span className="flex">
        <User size={16} />
                 {ticket.customerName}</span>
            <span className="flex">
                        <Mail size={16} />

                 {ticket.email}</span>
            <span className="flex">
                        <Clock size={16} />
 {ticket.timeAgo}</span>
          </div>

          {/* MESSAGE */}
          <div className="mt-4 bg-gray-50 rounded-md p-3 text-sm text-gray-700">
            {ticket.message}
          </div>

          {/* RESPONSE / STATUS */}
          {ticket.status !== "Resolved" ? (
            <>
              <textarea
                placeholder="Type your response here..."
                className="w-full mt-4 h-[90px] rounded-md bg-gray-100 p-3 text-sm outline-none resize-none"
              />

              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
                  Send Response
                </button>

                <button className="px-4 py-2 rounded-md border text-sm">
                  View Order
                </button>

                {ticket.status === "Open" && (
                  <button className="px-4 py-2 rounded-md bg-orange-100 text-orange-700 text-sm">
                    Mark In Progress
                  </button>
                )}

                {ticket.status === "In Progress" && (
                  <button className="px-4 py-2 rounded-md bg-green-100 text-green-700 text-sm">
                    Mark Resolved
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="mt-4 text-sm text-green-600 flex items-center gap-2">
              ✅ This ticket has been resolved
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SupportTickets;
