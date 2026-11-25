import { Link } from "react-router-dom";
import {
  Heart,
  ShieldCheck,
  Home as HomeIcon,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { puppies } from "../data/puppies";
import PuppyCard from "../components/PuppyCard";
import SectionTitle from "../components/SectionTitle";
import CTA from "../components/CTA";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A little love is waiting</span>
          <h1>
            Big love comes
            <br />
            in <em>little paws.</em>
          </h1>
          <p>
            Meet the puppy who makes your house feel a little more like home.
            Your forever friendship starts right here.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/puppies">
              Meet our puppies <ArrowRight size={17} />
            </Link>
            <Link className="text-link" to="/how-it-works">
              How it works <span>↗</span>
            </Link>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack">
              <i>🐶</i>
              <i>🐾</i>
              <i>♡</i>
            </div>
            <span>
              <b>So much love</b>
              <br />
              from our happy families
            </span>
          </div>
        </div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-blob">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=90"
              alt="Happy golden puppy sitting in the sunshine"
            />
          </div>
          <span className="float-note note-one">made for cuddles ♡</span>
          <span className="float-note note-two">your new bestie!</span>
          <span className="hero-spark">✳</span>
        </motion.div>
      </section>
      <section className="trust-strip">
        <span>♡ Thoughtful beginnings</span>
        <span>✳ Happy, healthy puppies</span>
        <span>♡ Support every step</span>
        <span>✳ Forever-family focused</span>
      </section>
      <section className="section">
        <SectionTitle
          eyebrow="THE CUTEST HELLO"
          title="Meet the little loves"
          copy="Every puppy has a big personality and a special kind of magic. Meet the cuties waiting to meet you."
        />
        <div className="puppy-grid">
          {puppies.slice(-6).map((p) => (
            <PuppyCard key={p.id} puppy={p} />
          ))}
        </div>
        <div className="center-button">
          <Link className="button button-outline" to="/puppies">
            View all puppies <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="story-band">
        <div className="story-photo">
          <img
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1000&q=85"
            alt="A puppy enjoying a sunny day"
            loading="lazy"
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">A softer kind of start</span>
          <h2>
            More than a puppy.
            <br />
            <em>A whole lot of heart.</em>
          </h2>
          <p>
            At PawHaven, we believe the best friendships begin with care,
            patience and a whole lot of love. We’re here to make the journey to
            your new companion feel warm, thoughtful and joyful.
          </p>
          <Link className="text-link" to="/about">
            A little about us <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section why">
        <SectionTitle
          eyebrow="THE PAWHAVEN PROMISE"
          title="Good beginnings matter"
          copy="Because bringing a puppy home should feel as lovely as the years you’ll spend together."
        />
        <div className="feature-grid">
          <div>
            <span className="feature-icon">
              <Heart />
            </span>
            <h3>Love comes first</h3>
            <p>
              We put each puppy’s comfort, care and wellbeing at the heart of
              every decision.
            </p>
          </div>
          <div>
            <span className="feature-icon">
              <ShieldCheck />
            </span>
            <h3>Thoughtful guidance</h3>
            <p>
              Clear information and friendly support help you feel confident at
              every step.
            </p>
          </div>
          <div>
            <span className="feature-icon">
              <Stethoscope />
            </span>
            <h3>Health-minded care</h3>
            <p>
              We value responsible care and encourage ongoing veterinary
              guidance.
            </p>
          </div>
          <div>
            <span className="feature-icon">
              <HomeIcon />
            </span>
            <h3>Forever-family focus</h3>
            <p>We want every puppy to find a safe, loving home for life.</p>
          </div>
        </div>
      </section>
      <section className="quote-section">
        <span className="eyebrow">KIND WORDS, HAPPY HEARTS</span>
        <div className="quote-mark">“</div>
        <blockquote>
          Our little one has brought so much happiness into our home. The whole
          experience felt personal, thoughtful and full of care.
        </blockquote>
        <p>— A PawHaven family</p>
      </section>
      <CTA />
    </>
  );
}
