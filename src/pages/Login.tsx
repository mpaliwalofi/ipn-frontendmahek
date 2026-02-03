import pawPrint from "@/assets/paw-print.png";
import dogImage from "@/assets/dog.png";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Form */}
      <div className="w-1/2 p-16 flex flex-col justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-emerald-700 rounded-full" />
              <div className="w-2 h-2 bg-emerald-600 rounded-full" />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </div>

            <h1 className="text-4xl font-light text-slate-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500">
              Sign in to access{" "}
              <span className="font-medium text-emerald-700">
                Upd Legacy Documentation
              </span>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-emerald-600" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-emerald-700 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white rounded-xl font-medium shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <a className="text-emerald-700 font-medium" href="#">
              Contact Administrator
            </a>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-gradient-to-br from-emerald-50 to-teal-50 relative flex items-center justify-center overflow-hidden">
        {/* Decorative paw prints */}
        {[...Array(8)].map((_, i) => (
          <img
            key={i}
            src={pawPrint}
            alt="Paw print"
            className="absolute w-10 h-10 opacity-15"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

        {/* Branding */}
        <div className="absolute top-12 text-center">
          <div className="text-5xl font-extralight text-emerald-800">
            Upd Legacy
          </div>
          <div className="text-lg font-light text-emerald-600 tracking-widest uppercase opacity-70">
            Documentation
          </div>
        </div>

        {/* Dog Image */}
        <img
          src={dogImage}
          alt="Friendly dog"
          className="w-full max-w-2xl object-contain relative z-10 mt-32"
        />
      </div>
    </div>
  );
}
