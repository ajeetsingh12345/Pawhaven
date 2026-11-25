import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { puppies } from "../data/puppies";
export default function Details() {
  const { id } = useParams(),
    p = puppies.find((x) => x.id === id),
    [show, setShow] = useState(false);
  if (!p)
    return (
      <section className="section empty-state">
        We couldn't find that puppy. <Link to="/puppies">Browse puppies</Link>
      </section>
    );
  return (
    <section className="section detail">
      <Link to="/puppies" className="text-link">
        <ArrowLeft size={17} /> All puppies
      </Link>
      <div className="detail-grid">
        <div className="detail-photo">
          <img src={p.image} alt={`${p.name}, ${p.breed}`} />
          <span className="tag">{p.tag}</span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">YOUR POTENTIAL NEW BESTIE</span>
          <h1>
            Say hello to <em>{p.name}.</em>
          </h1>
          <p className="detail-breed">{p.breed}</p>
          <div className="detail-facts">
            <div>
              <small>AGE</small>
              <b>{p.age}</b>
            </div>
            <div>
              <small>GENDER</small>
              <b>{p.gender}</b>
            </div>
            <div>
              <small>BREED</small>
              <b>{p.breed}</b>
            </div>
          </div>
          <p>{p.description}</p>
          <p className="small-disclaimer">
            Please contact us to confirm current availability and discuss
            responsible puppy care.
          </p>
          <button className="button" onClick={() => setShow(true)}>
            <MessageCircle size={17} /> Enquire about {p.name}
          </button>
          <p className="secure-note">
            <Heart size={15} /> A thoughtful start to a lifelong friendship.
          </p>
        </div>
      </div>
      {show && (
        <div className="modal-backdrop" onClick={() => setShow(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShow(false)}>
              ×
            </button>
            <span className="eyebrow">LET'S TALK PUPPIES</span>
            <h2>Ask us about {p.name}</h2>
            <p>
              Send us an email and mention {p.name}. We’ll be happy to talk
              through the next steps.
            </p>
            <a
              className="button"
              href={`mailto:ak8271691@gmail.com?subject=${encodeURIComponent("Enquiry about " + p.name)}`}
            >
              Email PawHaven ↗
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
