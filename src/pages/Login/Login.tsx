
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import LoginBg from "../../assets/Login_bg.jpg";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/authStore";
import { loginUser } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
      const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
  try {
    const responseAction = await dispatch(loginUser({ email: data.email, password: data.password }));
    if (loginUser.fulfilled.match(responseAction)) {
      navigate("/dashboard"); 
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${LoginBg})`,
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 w-full max-w-md px-5 sm:px-0">
        {/* Header / Brand */}
        <div className="text-center mb-10">
          <h1
            className="
              text-5xl sm:text-6xl font-black text-white 
              tracking-wide drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]
            "
          >
            JUGGLE
            <br />
            LAUNDRY
          </h1>

          {/* Small floating bubbles decoration */}
          <div className="flex justify-center gap-5 mt-5">
            <div className="w-3.5 h-3.5 bg-white/80 rounded-full animate-bubble" />
            <div className="w-4 h-4 bg-white/70 rounded-full animate-bubble delay-200" />
            <div className="w-2.5 h-2.5 bg-white/90 rounded-full animate-bubble delay-400" />
          </div>
        </div>

        {/* Card */}
        <div
          className="
            bg-white/12 backdrop-blur-xl 
            border border-white/25 rounded-3xl 
            p-9 sm:p-11 shadow-2xl
          "
        >
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-white text-3xl font-semibold tracking-wide">
              Welcome !
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {/* Email */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2.5">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className={`
                  w-full bg-transparent 
                  border ${errors.email ? "border-red-400" : "border-white/40"} 
                  focus:border-white/80 
                  rounded-2xl px-5 py-4 text-white 
                  placeholder:text-white/50 
                  outline-none transition-all duration-200
                `}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 pl-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2.5">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className={`
                  w-full bg-transparent 
                  border ${errors.password ? "border-red-400" : "border-white/40"} 
                  focus:border-white/80 
                  rounded-2xl px-5 py-4 text-white 
                  placeholder:text-white/50 
                  outline-none transition-all duration-200
                `}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5 pl-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full mt-6
                bg-white text-black font-semibold text-lg
                py-4 rounded-2xl
                hover:bg-white/92 active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
              `}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}