import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/api/profileService";
import { PasswordGenerator } from "../../utils/passwordGenerator";
import { api } from "../../api/axiosInstance";


type Props = {
    onClose: () => void;
}

interface FormData {
    userType: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    branch: string;
    role: string;
}


export default function AddUserModal({ onClose }: Props) {
    const [selectedType, setSelectedType] = useState("Admin");
    const [profile, setProfile] = useState<any>(null);
    const [isAuto, setIsAuto] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<FormData>();


    useEffect(() => {
        const fetchProfile = async () => {
            const res = await getProfile();
            setProfile(res.data.user);
        };
        fetchProfile();
    }, []);


    const handleAutoGenerate = () => {
        const newPassword = PasswordGenerator();
        setValue("password", newPassword); // react-hook-form
        setIsAuto(true);
    };

    const onSubmit = async (data: FormData) => {
        try {

            const payload = {
                name: `${data.firstName} ${data.lastName}`,  
                role: data.role,
                email: data.username || null,
                phone: data.phone,
                password: data.password,
                branchId: data.branch || null, 
            };

            const res = await api.post("/add/branch/users", payload);;

            alert("Branch User created and send Email successfully");
            onClose();
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white w-[820px] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">

                {/* Gradient Top Border */}
                <div className="h-2 rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-600" />

                <div className="p-8 space-y-8 bg-[#F9FAFB]">

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* USER TYPE */}
                        <div className="space-y-4">
                            <h3 className="text-[16px] font-semibold text-gray-800">
                                User Type
                            </h3>

                            <div className="grid grid-cols-3 gap-4">
                                {["Admin", "Manager", "Staff"].map((type) => (
                                    <div
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`cursor-pointer p-5 rounded-xl border transition 
                      ${selectedType === type
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 bg-white"
                                            }`}
                                    >
                                        <p className="font-semibold text-gray-800">{type}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {type === "Admin" && "Full access"}
                                            {type === "Manager" && "Branch level"}
                                            {type === "Staff" && "Limited access"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PERSONAL INFORMATION */}
                        <div className="space-y-5 mt-8">
                            <h3 className="text-[16px] font-semibold text-gray-800">
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        {...register("firstName", {
                                            required: "First name is required",
                                            pattern: {
                                                value: /^[A-Za-z]+$/,
                                                message: "Only letters allowed",
                                            },
                                        })}
                                        className="w-full h-[44px] px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.firstName.message}
                                        </p>
                                    )}

                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        {...register("lastName", {
                                            required: "Last name is required",
                                            pattern: {
                                                value: /^[A-Za-z]+$/,
                                                message: "Only letters allowed",
                                            },
                                        })}
                                        className="w-full h-[44px] px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.lastName.message}
                                        </p>
                                    )}

                                </div>
                            </div>
                        </div>

                        {/* CONTACT INFORMATION */}
                        <div className="space-y-5 mt-8">
                            <h3 className="text-[16px] font-semibold text-gray-800">
                                Contact Information
                            </h3>

                            <div className="grid grid-cols-2 gap-5">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Phone Number *
                                    </label>

                                    <input
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Phone number must be 10 digits",
                                            },
                                        })}
                                        className="w-full h-[44px] px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.phone.message}
                                        </p>
                                    )}

                                </div>
                            </div>
                        </div>

                        {/* LOGIN CREDENTIALS */}
                        <div className="mt-8 bg-[#F3E8FF] p-6 rounded-xl border border-purple-200 space-y-5">
                            <h3 className="text-[16px] font-semibold text-gray-800">
                                Login Credentials
                            </h3>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Username (email) *
                                    </label>

                                    <input
                                        type="email"
                                        {...register("username", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        className="w-full h-[44px] px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.username.message}
                                        </p>
                                    )}

                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Password *
                                        </label>

                                        <button
                                            type="button"
                                            onClick={handleAutoGenerate}
                                            className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                                        >
                                            Auto Generate
                                        </button>
                                    </div>

                                    <input
                                        type="text"
                                        autoComplete="off"
                                        {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value:
                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message:
                                                    "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character",
                                            },
                                        })}
                                        className="w-full h-[44px] px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                    />

                                    {isAuto && (
                                        <p className="text-xs text-gray-500">
                                            Auto-generated password. You can edit it if needed.
                                        </p>
                                    )}

                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* ASSIGNMENT */}
                        <div className="space-y-5 mt-8">
                            <h3 className="text-[16px] font-semibold text-gray-800">
                                Assignment
                            </h3>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Branch *
                                    </label>
                                    <select
                                        {...register("branch", {
                                            required: "Branch is required",
                                        })}
                                        className="w-full h-[44px] px-4 rounded-lg border border-gray-200 bg-white"
                                        defaultValue=""
                                    >
                                        {/* Placeholder */}
                                        <option value="" disabled>
                                            Select Branch
                                        </option>

                                        {/* Actual Branch */}
                                        {profile?.branch && (
                                            <option value={profile.branch.id}>
                                                {profile.branch.name}
                                            </option>
                                        )}
                                    </select>

                                    {errors.branch && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.branch.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Role *
                                    </label>
                                    <select
                                        {...register("role", {
                                            required: "Role is required",
                                        })}
                                        className="w-full h-[44px] px-4 rounded-lg border border-gray-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select Role
                                        </option>

                                        <option value="MANAGER">Branch Manager</option>
                                        <option value="STAFF">Staff</option>
                                        <option value="DELIVERY">Delivery Staff</option>
                                    </select>

                                    {errors.role && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.role.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 mt-10">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 h-10 rounded-lg border border-gray-300 text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-5 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
                            >
                                Create User
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}