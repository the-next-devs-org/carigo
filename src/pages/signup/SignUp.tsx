import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { makePostRequest } from "../../api/Api";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      await makePostRequest("register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* MAIN CONTENT */}

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


      <main className="flex flex-col items-center justify-center flex-grow px-4 py-12">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
                {error}
              </p>
            )}

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="name@mail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3.5 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  <span>Registering...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </main>

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

export default SignUp;
