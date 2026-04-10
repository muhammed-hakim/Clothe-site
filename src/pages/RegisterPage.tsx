import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const RegisterPage = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Required";
    if (!form.email.includes("@")) errs.email = "Valid email required";
    if (form.password.length < 6) errs.password = "Min 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    toast({ title: "Account created!", description: "Welcome to Lady Fashion." });
  };

  const inputClass = (field: string) =>
    `w-full bg-background border ${errors[field] ? "border-destructive" : "border-border"} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary`;

  return (
    <Layout>
      <div className="container py-12 md:py-20 max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl italic">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-2">Join the Lady Fashion family</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 md:p-8 card-shadow space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Full Name</label>
            <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass("fullName")} placeholder="Jane Doe" />
            {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Email</label>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass("email")} placeholder="jane@example.com" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Password</label>
            <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className={inputClass("password")} placeholder="••••••••" />
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Confirm Password</label>
            <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className={inputClass("confirmPassword")} placeholder="••••••••" />
            {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground rounded-pill py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-rose-dark transition">
            Create Account
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:text-rose-dark font-medium">Sign In</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
