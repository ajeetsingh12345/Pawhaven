import CTA from "../components/CTA";

export default function About() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">HELLO FROM PAWHAVEN</span>
        <h1>
          We believe in
          <br />
          <em>the power of paws.</em>
        </h1>
        <p>
          A little place built around a big belief: every puppy deserves a
          loving beginning.
        </p>
      </section>

      <section className="story-band about-band">
        <div className="story-photo">
          <img
            src="https://images.unsplash.com/photo-1551717743-49959800b1f6?w=1000&q=85"
            alt="Two happy dogs together"
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">OUR LITTLE STORY</span>
          <h2>
            Here for the <em>happy-ever-afters.</em>
          </h2>
          <p>
            PawHaven is a puppy website concept inspired by the joy of finding a
            companion. Our approach is simple: share helpful information,
            encourage thoughtful decisions and put animal wellbeing first.
          </p>
          <p>
            We believe bringing a puppy home is a commitment for life — and the
            beginning should be filled with care.
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
