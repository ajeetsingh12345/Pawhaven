import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
        <h1>
          Let's have a <em>chat.</em>
        </h1>
        <p>Questions about a puppy or the process? Send a note our way.</p>
      </section>

      <section className="section contact-grid">
        <div>
          <span className="eyebrow">SAY HELLO</span>
          <h2>
            A friendly human
            <br />
            is just a message away.
          </h2>
          <p>
            Use the form and we’ll be in touch. This demo validates your details
            locally and does not send them to a server.
          </p>
          <p>
            <b>Email</b>
            <br />
            ak8271691@gmail.com
          </p>
          <p>
            <b>Visits</b>
            <br />
            By appointment
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Your name
            <input required minLength="2" placeholder="Your name" />
          </label>
          <label>
            Email address
            <input required type="email" placeholder="you@example.com" />
          </label>
          <label>
            What would you like to chat about?
            <select>
              <option>General enquiry</option>
              <option>A puppy I’m interested in</option>
              <option>Preparing for a puppy</option>
            </select>
          </label>
          <label>
            Your message
            <textarea
              required
              minLength="10"
              rows="5"
              placeholder="Tell us a little about what you're looking for..."
            />
          </label>
          <button className="button">Send message ↗</button>
          {sent && (
            <p className="success">
              Thanks! Your details passed the demo form validation. Connect a
              backend to deliver enquiries.
            </p>
          )}
        </form>
      </section>
    </>
  );
}
