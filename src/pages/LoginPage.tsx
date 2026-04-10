import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Login successful!", description: "Welcome back to Lady Fashion." });
  };

  return (
    <Layout>
      <div className="container py-12 md:py-20 max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl italic">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to your Lady Fashion account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 md:p-8 card-shadow space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-border" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-xs text-primary hover:text-rose-dark">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground rounded-pill py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-rose-dark transition">
            Sign In
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-primary hover:text-rose-dark font-medium">Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
