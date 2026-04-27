import { motion } from "framer-motion";

const team = [
  {
    name: "Sami Smith",
    role: "Owner / Florist",
    desc: "Sami is our founder and main inspirer. Responsible for ordering flowers and creating exclusive bouquets.",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
  },
  {
    name: "Mioko Sudoru",
    role: "Senior Florist",
    desc: "Professional florist with 5+ years of experience in creating stunning seasonal arrangements.",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
  },
  {
    name: "Join Our Team",
    role: "We're Hiring",
    desc: "Want to work with flowers and create stunning compositions? We'd love to hear from you.",
    img: null,
    isJoin: true,
  },
];

const MeetOurTeam = () => {
  return (
    <section className="bg-[#fffdf9] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label">Our Team</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a]">Meet Our Team</h2>
          <div className="petal-divider max-w-xs mx-auto my-5">
            <span className="text-[#e8a0b4] text-xl">✿</span>
          </div>
          <p className="text-[#4a6a4a]">We are flower lovers and professional florists.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`rounded-2xl overflow-hidden border card-lift ${
                member.isJoin
                  ? "bg-[#2d5a3d] border-[#2d5a3d]"
                  : "bg-white border-[#e8f0ea]"
              }`}
            >
              {!member.isJoin ? (
                <>
                  <div className="h-56 overflow-hidden">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover img-zoom" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[#1a2e1a]">{member.name}</h3>
                    <p className="text-[10px] tracking-widest uppercase text-[#e8a0b4] mt-1 mb-3">{member.role}</p>
                    <p className="text-sm text-[#4a6a4a] leading-relaxed">{member.desc}</p>
                  </div>
                </>
              ) : (
                <div className="p-8 flex flex-col justify-center h-full min-h-[280px]">
                  <div className="text-4xl mb-4">🌸</div>
                  <h3 className="font-serif text-xl text-white mb-2">{member.name}</h3>
                  <p className="text-[10px] tracking-widest uppercase text-[#e8a0b4] mb-4">{member.role}</p>
                  <p className="text-sm text-white/70 leading-relaxed mb-6">{member.desc}</p>
                  <button className="btn-secondary text-[10px] py-2.5 px-6 self-start">Send Your CV</button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-[#4a6a4a] italic text-lg font-serif max-w-xl mx-auto">
            "After women, flowers are the most lovely thing God has given the world."
          </p>
          <p className="text-[10px] tracking-widest uppercase text-[#2d5a3d] mt-3">— Christian Dior</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
