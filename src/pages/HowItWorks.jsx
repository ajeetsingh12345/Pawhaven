import CTA from "../components/CTA";

const steps = [
  [
    "Meet the puppies",
    "Explore the puppy profiles, learn about their personalities and find a companion that may suit your family.",
  ],
  [
    "Start a conversation",
    "Ask questions, discuss availability and understand the care and commitment involved.",
  ],
  [
    "Prepare your home",
    "Get the essentials ready and plan a calm, safe transition for your new family member.",
  ],
  [
    "Begin your forever",
    "Welcome your puppy home and build a relationship with patience, training and lots of love.",
  ],
];

export default function HowItWorks() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">ONE STEP AT A TIME</span>
        <h1>
          From first hello
          <br />
          to <em>forever home.</em>
        </h1>
        <p>
          A thoughtful journey is the best way to begin a lifelong friendship.
        </p>
      </section>

      <section className="section steps">
        {steps.map(([title, copy], index) => (
          <div className="step" key={title}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </div>
        ))}
      </section>

      <CTA />
    </>
  );
}
