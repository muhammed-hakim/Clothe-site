import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="bg-secondary py-8">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl italic">Contact Us</h1>
          <p className="text-sm text-muted-foreground mt-1">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Full Name</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Subject</label>
              <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} required
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Message</label>
              <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required rows={5}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
            <button type="submit" className="bg-primary text-primary-foreground rounded-pill px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-rose-dark transition">
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 card-shadow space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Store Address</h3>
                  <p className="text-sm text-muted-foreground">Nişantaşı, Abdi İpekçi Caddesi No:42<br />Şişli, Istanbul 34367, Turkey</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Phone</h3>
                  <p className="text-sm text-muted-foreground">+90 212 555 0142</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@ladyfashion.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon – Sat: 10:00 – 21:00<br />Sunday: 11:00 – 19:00</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.8!2d28.99!3d41.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAzJzAwLjAiTiAyOMKwNTknMjQuMCJF!5e0!3m2!1sen!2str!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                title="Lady Fashion Store Location"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
