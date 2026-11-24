import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    alert("Thanks for joining the PawHaven newsletter!");
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link to="/" className="brand footer-brand">
            <img
              className="brand-logo footer-logo"
              src="/images/pawhaven-logo.png"
              alt="PawHaven"
            />
          </Link>

          <p className="footer-note">
            Little paws. Big love. Helping kind hearts find their new best
            friend.
          </p>

          <div className="socials">
            <a href="#instagram" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#facebook" aria-label="Facebook">
              <Facebook />
            </a>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/puppies">Available puppies</Link>
          <Link to="/about">Our story</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/faq">FAQs</Link>
        </div>

        <div>
          <h4>Get in touch</h4>
          <a href="mailto:ak8271691@gmail.com">ak8271691@gmail.com</a>
          <a href="tel:+919905748469">+91 9905748469</a>
          <p>Visits by appointment</p>
        </div>

        <div>
          <h4>Stay in the loop</h4>
          <p>Notes, news and a little puppy joy.</p>
          <form className="newsletter" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              required
              aria-label="Email address"
            />
            <button aria-label="Subscribe">→</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} PawHaven. All rights reserved.</span>
        <span>Made with care for people and pups ♡</span>
      </div>
    </footer>
  );
}
