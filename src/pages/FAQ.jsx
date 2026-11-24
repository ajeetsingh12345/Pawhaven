import { useState } from "react";
import { ChevronDown } from "lucide-react";

import CTA from "../components/CTA";
import SectionTitle from "../components/SectionTitle";

const faqs = [
  [
    "How do I enquire about a puppy?",
    "Visit the puppy profile you are interested in and use the enquiry button. Our demo site opens an email draft so you can get in touch.",
  ],
  [
    "Can I visit before making a decision?",
    "Visits should be arranged in advance. Please contact us to discuss availability and suitable arrangements.",
  ],
  [
    "What should I prepare before bringing a puppy home?",
    "Prepare a quiet sleeping space, age-appropriate food, water bowls, safe toys, a collar or harness and a plan for veterinary care.",
  ],
  [
    "Do puppies need ongoing veterinary care?",
    "Yes. Arrange a veterinary check and follow professional advice on vaccinations, parasite prevention, nutrition and socialisation.",
  ],
  [
    "Can I reserve a puppy online?",
    "This demonstration website does not process reservations or payments. Please contact the team to discuss next steps.",
  ],
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">A FEW THINGS YOU MIGHT WONDER</span>
        <h1>
          Good questions.
          <br />
          <em>Happy beginnings.</em>
        </h1>
        <p>Here are a few helpful answers for your puppy journey.</p>
      </section>

      <section className="section faq-wrap">
        <SectionTitle
          eyebrow="THE LITTLE DETAILS"
          title="Frequently asked questions"
        />
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <button
                onClick={() => setActive(active === index ? -1 : index)}
                aria-expanded={active === index}
              >
                <span>{question}</span>
                <ChevronDown className={active === index ? "rotate" : ""} />
              </button>
              {active === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
