import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function AdminLogin() {
  const [email, setEmail]     = useState("admin@ladyfashion.tr");
  const [password, setPassword] = useState("");
  const [show, setShow]       = useState(false);
  const [error, setError]     = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@ladyfashion.tr" && password === "admin123") {
      login({ id:"admin-1", fullName:"Admin", email, role:"Admin", memberSince:"2022", totalSpent:0, ordersCount:0, isVip:false }, "admin-token");
      navigate("/admin");
    } else {
      setError("Invalid credentials. Use admin@ladyfashion.tr / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm animate-scale-in">
        {/* Dark Header */}
        <div className="admin-gradient rounded-t-2xl px-6 py-8 text-center">
          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={26} className="text-white" />
          </div>
          <p className="font-display text-xl font-semibold text-white mb-0.5">THE ATELIER ADMIN</p>
          <p className="text-white/60 label-text">Secure Access Portal</p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-b-2xl card-shadow px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="field-label">EMAIL ADDRESS</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" required />
            </div>
            <div>
              <label className="field-label">PASSWORD</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" className="field pr-10" required />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-xl">{error}</p>}

            <button type="submit"
              className="w-full py-4 text-sm font-medium tracking-widest uppercase text-white rounded-full transition-all hover:opacity-90 admin-gradient">
              ENTER ATELIER
            </button>
          </form>

          <div className="mt-4 bg-secondary rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground">
              Demo: <span className="font-medium text-foreground">admin@ladyfashion.tr</span> / <span className="font-medium text-foreground">admin123</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <ShieldCheck size={11} className="text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Secure Encrypted Connection</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-6">© 2024 LADY FASHION ATELIER. Admin System v3.0</p>
    </div>
  );
}
