import React, { useEffect, useState } from "react";
import { getProfile } from "../../../services/api/profileService";

const GeneralTab: React.FC = () => {

     const [profile, setProfile] = useState<any>(null);

  
    useEffect(() => {
      let isMounted = true;
      const fetchProfile = async () => {
      const res = await getProfile();
      setProfile(res.data.user);
    };
    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <div className="w-full space-y-10">
      {/* ================= Business Information ================= */}
      <div className="bg-white border border-gray-200 rounded-[14px] p-6 lg:p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Business Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div>
            <label className="text-sm text-gray-600">Business Name</label>
            <input
              defaultValue="Juggle Laundry"     readOnly
              className="mt-2 w-full bg-gray-50 border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Branch Name */}
          <div>
            <label className="text-sm text-gray-600">Branch Name</label>
            <input
                   defaultValue={profile?.branch?.name ?? ""}    readOnly
              className="mt-2 w-full bg-gray-50 border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
            defaultValue={profile?.branch?.email ?? ""}    readOnly
              className="mt-2 w-full bg-gray-50 border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              defaultValue={profile?.branch?.phone ?? ""}    readOnly
               className="mt-2 w-full bg-gray-50 border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Business Address</label>
          <input
                     defaultValue={profile?.branch?.address ?? ""}    readOnly
            className="mt-2 w-full bg-gray-50 border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Business Description</label>
          <textarea
            rows={3}    readOnly
            defaultValue="Professional laundry and dry cleaning services with pickup and delivery."
            className="mt-2 w-full bg-gray-50 border rounded-md px-4 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ================= Operating Hours ================= */}
      <div className="bg-white border border-gray-200 rounded-[14px] p-6 lg:p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Operating Hours
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weekdays */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Weekdays</p>
            <div className="flex gap-3">
              <input
                defaultValue="8:00 AM"
                className="w-full bg-gray-50 border rounded-md px-4 py-2 text-sm"
              />
              <input
                defaultValue="8:00 PM"
                className="w-full bg-gray-50 border rounded-md px-4 py-2 text-sm"
              />
            </div>
          </div>

          {/* Saturday */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Saturday</p>
            <div className="flex gap-3">
              <input
                defaultValue="9:00 AM"
                className="w-full bg-gray-50 border rounded-md px-4 py-2 text-sm"
              />
              <input
                defaultValue="6:00 PM"
                className="w-full bg-gray-50 border rounded-md px-4 py-2 text-sm"
              />
            </div>
          </div>

          {/* Sunday */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Sunday</p>
            <input
              defaultValue="Closed"
              className="w-full bg-gray-50 border rounded-md px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
