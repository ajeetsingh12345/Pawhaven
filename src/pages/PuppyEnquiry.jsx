import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PawPrint } from "lucide-react";
import { puppies } from "../data/puppies";

export default function PuppyEnquiry() {
  const { id } = useParams();
  const puppy = puppies.find((item) => item.id === id);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [fallbackNotice, setFallbackNotice] = useState("");
  const [emailFallbackHref, setEmailFallbackHref] = useState("");

  if (!puppy) {
    return (
      <section className="section empty-state">
        We couldn't find that puppy. <Link to="/puppies">Browse puppies</Link>
      </section>
    );
  }

  const whatsappMessage = `Hi PawHaven, I'm interested in ${puppy.name} (${puppy.breed}). Could you share current availability and next steps?`;
  const whatsappLink = `https://wa.me/919905748469?text=${encodeURIComponent(whatsappMessage)}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSent(false);
    setError("");
    setFallbackNotice("");
    setEmailFallbackHref("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const emailBody = [
      `Puppy: ${puppy.name} (${puppy.breed})`,
      `Name: ${formData.get("name")}`,
      `Phone or WhatsApp: ${formData.get("phone")}`,
      `Email: ${formData.get("email") || "Not provided"}`,
      `Area: ${formData.get("area") || "Not provided"}`,
      "",
      "Message:",
      formData.get("message") || "No additional message.",
    ].join("\n");
    const emailFallback = `mailto:ak8271691@gmail.com?subject=${encodeURIComponent(`Puppy enquiry: ${puppy.name}`)}&body=${encodeURIComponent(emailBody)}`;

    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          puppyName: puppy.name,
          puppyBreed: puppy.breed,
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          area: formData.get("area"),
          message: formData.get("message"),
        }),
      });
      const result = await response.json();

      if (response.status === 503) {
        setEmailFallbackHref(emailFallback);
        setFallbackNotice(
          "Direct email sending isn't set up in this environment. Open the prefilled email and press Send to contact us.",
        );
        return;
      }

      if (!response.ok) {
        throw new Error(result.error || "We couldn't send your enquiry.");
      }

      form.reset();
      setSent(true);
    } catch (submitError) {
      setEmailFallbackHref(emailFallback);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We couldn't send your enquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section enquiry-page">
      <Link to={`/puppies/${puppy.id}`} className="text-link enquiry-back">
        <ArrowLeft size={17} /> Back to {puppy.name}
      </Link>
      <div className="enquiry-panel">
        <div className="enquiry-intro">
          <div className="enquiry-kicker">
            <span className="enquiry-step">4</span>
            <span>dear PawHaven...</span>
          </div>
          <h1>
            Ask about
            <br />
            this puppy
          </h1>
          <p>
            Leave your details and our team will get back to you promptly — or
            message us on{" "}
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp
            </a>{" "}
            for the quickest reply.
          </p>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit}>
          <label className="enquiry-field">
            <span>
              Your name <b aria-hidden="true">*</b>
            </span>
            <input
              autoComplete="name"
              maxLength="100"
              minLength="2"
              name="name"
              required
            />
          </label>
          <label className="enquiry-field">
            <span>
              Phone or WhatsApp <b aria-hidden="true">*</b>
            </span>
            <input
              autoComplete="tel"
              maxLength="30"
              name="phone"
              required
              type="tel"
            />
            <small>With country code, e.g. +91 990 574 8469</small>
          </label>
          <label className="enquiry-field">
            <span>Email (optional)</span>
            <input
              autoComplete="email"
              maxLength="254"
              name="email"
              type="email"
            />
          </label>
          <label className="enquiry-field">
            <span>Your area (optional)</span>
            <input autoComplete="address-level2" maxLength="120" name="area" />
            <small>e.g. your city or neighbourhood</small>
          </label>
          <label className="enquiry-field enquiry-message">
            <span>Message (optional)</span>
            <textarea
              maxLength="1000"
              name="message"
              rows="5"
              defaultValue={`Hi! I'd love to know more about ${puppy.name} (${puppy.breed}).`}
            />
          </label>
          <div className="enquiry-submit">
            <button className="button" disabled={submitting} type="submit">
              {submitting ? "Sending..." : "Send enquiry"}
            </button>
            {sent && (
              <p className="enquiry-success" role="status">
                Thanks — your enquiry has been sent to the PawHaven team.
              </p>
            )}
            {fallbackNotice && (
              <div className="enquiry-notice" role="status">
                <p>{fallbackNotice}</p>
                <a className="button button-outline" href={emailFallbackHref}>
                  Open a prefilled email draft
                </a>
              </div>
            )}
            {error && (
              <div className="enquiry-error" role="alert">
                <p>{error}</p>
                <a className="button button-outline" href={emailFallbackHref}>
                  Open a prefilled email draft
                </a>
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  Contact us on WhatsApp instead.
                </a>
              </div>
            )}
          </div>
        </form>

        <div className="enquiry-stamp" aria-hidden="true">
          <PawPrint size={26} />
        </div>
      </div>
    </section>
  );
}
