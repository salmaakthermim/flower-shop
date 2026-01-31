import { useState } from "react";

const rules = [
  {
    title: "Privacy rule.",
    text: "When placing an order, you can use the right to privacy by indicating anonymity in the comments of your order.",
  },
  {
    title: "Home delivery.",
    text: "The order is delivered to the recipient personally or to a trusted person upon agreement with the recipient or the customer.",
  },
  {
    title: "Delivery to the workplace, office, or business center.",
    text: "Delivery is made only to the reception. If the recipient cannot go down to the checkpoint or is not at the address at the specified time, the administrator of the online store agrees with the customer.",
  },
];

const faqs = [
  "What flowers do you work with?",
  "Do you create exotic bouquets?",
  "Can I make an exclusive order?",
  "Can you decorate a cafe with flowers?",
  "Can I order a bouquet at night?",
];

export default function FAQList() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-[#f7f3ee] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT SIDE */}
        <div>
          <p className="italic text-gray-500 mb-2">Rules</p>
          <h2 className="text-4xl font-serif text-gray-800 mb-10">
            Our Basic Rules
          </h2>

          <div className="space-y-6 text-gray-600">
            {rules.map((rule, i) => (
              <p key={i}>
                <span className="font-semibold text-gray-800">
                  {i + 1}. {rule.title}
                </span>{" "}
                {rule.text}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-gray-300 pb-4 cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-gray-700 font-medium">
                  {faq}
                </h3>
                <span className="text-2xl text-gray-500">
                  {open === i ? "−" : "+"}
                </span>
              </div>

              {open === i && (
                <p className="mt-3 text-gray-500 text-sm">
                  This is a sample answer. You can replace it with real content.
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
