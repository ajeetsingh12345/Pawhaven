import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PuppyCard({ puppy }) {
  return (
    <motion.article
      className="puppy-card"
      whileHover={{ y: -7 }}
      transition={{ duration: 0.22 }}
    >
      <Link to={`/puppies/${puppy.id}`}>
        <div className="puppy-image">
          <img
            src={puppy.image}
            alt={`${puppy.breed} puppy named ${puppy.name}`}
            loading="lazy"
          />
          <span className="tag">{puppy.tag}</span>
        </div>

        <div className="puppy-info">
          <div>
            <h3>{puppy.name}</h3>
            <p>{puppy.breed}</p>
          </div>
        </div>

        <div className="puppy-meta">
          <span>{puppy.age}</span>
          <span>{puppy.gender}</span>
          <span className="view-link">Meet {puppy.name} ↗</span>
        </div>
      </Link>
    </motion.article>
  );
}
