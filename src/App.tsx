import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";
import RecentlyViewedPage from "./pages/RecentlyViewedPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminStatistics from "./pages/admin/AdminStatistics";
import { useAuthStore } from "./store/authStore";

const queryClient = new QueryClient({ defaultOptions:{ queries:{ staleTime:1000*60*5, retry:1 } } });

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuthStore();
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /><Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/"                   element={<HomePage />} />
          <Route path="/shop"               element={<ShopPage />} />
          <Route path="/shop/:category"     element={<ShopPage />} />
          <Route path="/product/:id"        element={<ProductPage />} />
          <Route path="/cart"               element={<CartPage />} />
          <Route path="/checkout"           element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/login"              element={<LoginPage />} />
          <Route path="/register"           element={<RegisterPage />} />
          <Route path="/contact"            element={<ContactPage />} />
          <Route path="/about"              element={<AboutPage />} />
          <Route path="/account"            element={<AccountPage />} />
          <Route path="/profile"            element={<ProfilePage />} />
          <Route path="/wishlist"           element={<WishlistPage />} />
          <Route path="/recently-viewed"    element={<RecentlyViewedPage />} />
          <Route path="/admin/login"        element={<AdminLogin />} />
          <Route path="/admin"              element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
          <Route path="/admin/orders"       element={<ProtectedAdmin><AdminOrders /></ProtectedAdmin>} />
          <Route path="/admin/orders/:id"   element={<ProtectedAdmin><AdminOrderDetail /></ProtectedAdmin>} />
          <Route path="/admin/products"     element={<ProtectedAdmin><AdminProducts /></ProtectedAdmin>} />
          <Route path="/admin/categories"   element={<ProtectedAdmin><AdminCategories /></ProtectedAdmin>} />
          <Route path="/admin/customers"    element={<ProtectedAdmin><AdminCustomers /></ProtectedAdmin>} />
          <Route path="/admin/stats"        element={<ProtectedAdmin><AdminStatistics /></ProtectedAdmin>} />
          <Route path="*"                   element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
