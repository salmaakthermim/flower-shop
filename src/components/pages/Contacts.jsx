import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";

const Contacts = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send (no backend email yet)
    await new Promise(r => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon 🌸");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <>
      {/* Banner */}
      <section className="relative h-52 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2d5a3d 0%, #4a8a5d 60%, #6aaa7d 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 15% 60%, rgba(232,160,180,0.3) 0%, transparent 45%)" }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#e8a0b4] mb-2">Get in Touch</p>
          <h1 className="text-4xl font-serif font-medium text-white">Contact Us</h1>
          <p className="text-white/60 text-sm mt-2">Home › Contact Us</p>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-[#fffdf9] py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="section-label">Contact Info</span>
            <h2 className="mt-3 text-3xl font-serif font-medium text-[#1a2e1a] mb-6">
              We'd Love to <em className="text-[#e8a0b4] not-italic">Hear from You</em>
            </h2>
            <p className="text-[#4a6a4a] leading-relaxed mb-8">
              Have a question about an order, want to arrange a custom bouquet, or just want to say hello?
              Our team is here to help.
            </p>

            <div className="space-y-5">
              {[
                { icon: <FaPhone />, label: "Phone", value: "+1 (234) 567 89 00" },
                { icon: <FaEnvelope />, label: "Email", value: "hello@fiorello.com" },
                { icon: <FaMapMarkerAlt />, label: "Address", value: "123 Blossom Street, New York, NY 10001" },
                { icon: <FaClock />, label: "Hours", value: "Mon–Sat: 9am – 7pm · Sun: 10am – 5pm" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f7f2] flex items-center justify-center text-[#2d5a3d] flex-shrink-0">{icon}</div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium">{label}</p>
                    <p className="text-[#1a2e1a] font-medium text-sm mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-white rounded-2xl border border-[#e8f0ea] p-8 shadow-sm">
              <h3 className="font-serif text-xl text-[#1a2e1a] mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Name *</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required
                      className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required
                      className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Subject</label>
                  <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="How can we help?"
                    className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Write your message here..." required rows={5}
                    className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition resize-none placeholder-[#8aaa8a]" />
                </div>
                <button type="submit" disabled={sending} className="w-full btn-primary py-4 text-[11px]">
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contacts;
