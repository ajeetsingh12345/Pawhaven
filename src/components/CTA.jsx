import { Link } from "react-router-dom";

export default function CTA({
  title = "Ready to meet your new best friend?",
  copy = "Your next chapter could start with four little paws.",
  button = "Meet the puppies",
}) {
  return (
    <section className="cta">
      <div className="cta-doodle">♡</div>
      <span className="eyebrow">A new best friend is waiting</span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <Link className="button button-light" to="/puppies">
        {button} ↗
      </Link>
    </section>
  );
}
