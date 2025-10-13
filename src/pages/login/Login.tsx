import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { makePostRequest } from "../../api/Api";
import { jwtDecode } from "jwt-decode";





const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await makePostRequest("login", { email, password, remember });
      const token = res.data.token;

      try {
        const decoded = jwtDecode(token);

        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("userId", res.data.user.id);

        console.log(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HEADER */}
      <header className="bg-black py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center cursor-pointer">
            <Link to="/">
              <span className="text-2xl font-bold">
                <span className="text-white">S</span>
                <span className="text-orange-500">i</span>
                <span className="text-white">XT</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-12">
        <div className="w-full max-w-md text-left mb-8">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-gray-900">
            LOGIN TO YOUR ACCOUNT
          </h2>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
                {error}
              </p>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@mail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3.5 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">
              or login with
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
            </button>
            <button className="flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475633/apple-color.svg"
                alt="Apple"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">Don’t have an account?</p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full mt-3 py-3 bg-gray-100 rounded-md font-medium text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Contact</a>
              <a href="#" className="hover:text-white">Rental information</a>
              <a href="#" className="hover:text-white">Company information</a>
              <a href="#" className="hover:text-white">Privacy and Cookie Policy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Cookie settings</a>
              <a href="#" className="hover:text-white">Accessibility</a>
            </div>
            <div className="text-sm text-gray-400">© Sixt 2025</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
