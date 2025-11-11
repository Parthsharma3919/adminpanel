import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import RedirectIfAuth from "./routes/RedirectIfAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Landing pages (no router inside them)
const LandingHome = lazy(() => import("./landing/App").then(m => ({ default: m.LandingHome })));
const Signin = lazy(() => import("./landing/components/Auth/Signin"));
const Signup = lazy(() => import("./landing/components/Auth/signup"));
const PrivacyPolicy = lazy(() => import("./landing/components/Policies/PrivacyPolicy"));
const Terms = lazy(() => import("./landing/components/Policies/Terms"));
const CookiesPolicy = lazy(() => import("./landing/components/Policies/CookiesPolicy"));
const CancellationRefund = lazy(() => import("./landing/components/Policies/CancellationRefund"));
const ShippingPolicy = lazy(() => import("./landing/components/Policies/ShippingPolicy"));
const DashboardApp = lazy(() => import("./app/DashboardApp"));

// Custom loader
const Loader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #f6f8fb, #e9eef5)",
    }}
  >
    <CircularProgress size={60} thickness={5} sx={{ color: "#0E7C36" }} />
  </Box>
);

export default function RootApp() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingHome />} />
        <Route
          path="/signin"
          element={
            // <RedirectIfAuth to="/app">
              <Signin />
            // </RedirectIfAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth to="/app">
              <Signup />
            </RedirectIfAuth>
          }
        />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/refunds" element={<CancellationRefund />} />

        {/* Private dashboard */}
        {/* <Route element={<RequireAuth />}> */}
          <Route path="/app/*" element={<DashboardApp />} />
        {/* </Route> */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
