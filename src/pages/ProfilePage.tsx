import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Lock, Settings } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    fullName: user?.fullName ?? "Leyla Demir",
    email: user?.email ?? "leyla.demir@atelier.com",
    phone: user?.phone ?? "+90 532 000 00 00",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newsletter: true,
    sms: false,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    updateUser({ fullName: form.fullName, email: form.email, phone: form.phone });
    toast({ title: "Profile updated ✓", description: "Your changes have been saved." });
    navigate("/account");
  };

  return (
    <Layout>
      <div className="container max-w-lg py-6 pb-28 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card card-shadow flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <span className="label-text text-foreground">PROFILE</span>
          <button className="w-9 h-9 rounded-full bg-card card-shadow flex items-center justify-center">
            <Settings size={16} />
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-semibold mb-1">Edit Your Profile</h1>
          <p className="font-accent italic text-muted-foreground text-sm">Manage your personal style and account settings.</p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/25">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-rose-dark rounded-full flex items-center justify-center shadow-md">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <p className="font-display text-base font-semibold mt-3">Atelier Member</p>
          <p className="label-text text-muted-foreground">PROFILE PHOTO</p>
        </div>

        {/* Personal Info */}
        <div className="atelier-card p-5 mb-4">
          <p className="label-text text-foreground/70 text-center mb-4">PERSONAL INFORMATION</p>
          <div className="space-y-4">
            {[
              { label: "FULL NAME",     name: "fullName", type: "text",  value: form.fullName },
              { label: "EMAIL ADDRESS", name: "email",    type: "email", value: form.email    },
              { label: "PHONE NUMBER",  name: "phone",    type: "tel",   value: form.phone    },
            ].map((f) => (
              <div key={f.name}>
                <label className="field-label">{f.label}</label>
                <input name={f.name} type={f.type} value={f.value} onChange={handleInput} className="field" />
              </div>
            ))}
          </div>
        </div>

        {/* Password */}
        <div className="atelier-card p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="label-text text-foreground/70">PASSWORD & SECURITY</p>
            <Lock size={16} className="text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {[
              { label: "CURRENT PASSWORD",     name: "currentPassword", placeholder: "••••••••" },
              { label: "NEW PASSWORD",          name: "newPassword",     placeholder: "" },
              { label: "CONFIRM NEW PASSWORD",  name: "confirmPassword", placeholder: "" },
            ].map((f) => (
              <div key={f.name}>
                <label className="field-label">{f.label}</label>
                <input name={f.name} type="password" placeholder={f.placeholder}
                  value={(form as any)[f.name]} onChange={handleInput} className="field" />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="atelier-card overflow-hidden mb-6">
          <p className="label-text text-foreground/70 text-center py-4 border-b border-border">PREFERENCES</p>
          {[
            { key: "newsletter" as const, label: "Newsletter Subscription",  desc: "Weekly style edits and exclusive event invitations." },
            { key: "sms"        as const, label: "SMS Notifications",        desc: "Instant alerts about order delivery and flash arrivals." },
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between p-5 border-b border-border last:border-0">
              <div className="flex-1 pr-4">
                <p className="font-medium text-sm text-foreground mb-0.5">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
              <button onClick={() => setForm((p) => ({ ...p, [item.key]: !p[item.key] }))}
                className={`toggle flex-shrink-0 mt-0.5 ${form[item.key] ? "on" : "off"}`}>
                <span className="toggle-knob" />
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleSave} className="btn-primary btn-full btn-lg mb-3">SAVE CHANGES</button>
        <button onClick={() => navigate(-1)} className="w-full text-center label-text text-muted-foreground hover:text-foreground transition-colors py-3">
          CANCEL
        </button>
      </div>
    </Layout>
  );
}
