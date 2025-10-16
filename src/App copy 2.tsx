import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/main/Header";
import Sidebar from "./components/main/Sidebar";
import { publicRoutes, privateRoutes } from "./routes";
import { decodeToken } from "./api/DecodeToken";
import { Toaster } from "react-hot-toast";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const location = useLocation();
  const publicPaths = publicRoutes.map((r) => r.path);

  // Check if current path matches any public route (including parameterized routes)
  const isPublicPage = publicPaths.some((path) => {
    if (path === location.pathname) return true; // Exact match
    if (path === "*") return false; // Skip wildcard for this check

    // Check for parameterized routes like /agreement-sign/:agreementID
    const pathParts = path.split("/");
    const locationParts = location.pathname.split("/");

    if (pathParts.length !== locationParts.length) return false;

    return pathParts.every((part, index) => {
      return part.startsWith(":") || part === locationParts[index];
    });
  });

  const isRestrictedPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const token = localStorage.getItem("token");

  const isValidToken = (() => {
    if (!token) return false;

    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  })();

  const routes = isValidToken ? privateRoutes : publicRoutes;

  // Allow specific paths to bypass authentication completely
  const isAgreementSignPath = location.pathname.startsWith("/agreement-sign/");

  // If it's an agreement signing path, merge public routes to ensure access
  const finalRoutes = isAgreementSignPath
    ? [...publicRoutes, ...privateRoutes]
    : routes;

  if (!isValidToken && !isPublicPage && !isAgreementSignPath) {
    return <Navigate to="/login" replace />;
  }

  if (isValidToken && location.pathname === "/login") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-[#eef4f7] flex flex-row">
        {!isRestrictedPage && isValidToken && (
          <>
            <div className="hidden lg:block w-[272px]">
              <Sidebar isOpen={true} />
            </div>
            <div className="lg:hidden">
              <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
          </>
        )}

        <div className="flex-1 flex flex-col min-h-screen w-[75%]">
          {!isRestrictedPage && isValidToken && (
            <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          )}
          <main className="flex-1">
            <Routes>
              {finalRoutes.map((route: any, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
