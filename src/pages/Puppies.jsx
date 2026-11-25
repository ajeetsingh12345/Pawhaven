import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { puppies } from "../data/puppies";
import PuppyCard from "../components/PuppyCard";
export default function Puppies() {
  const [q, setQ] = useState(""),
    [breed, setBreed] = useState("All"),
    [gender, setGender] = useState("All");
  const breeds = ["All", ...new Set(puppies.map((p) => p.breed))];
  const results = useMemo(
    () =>
      puppies.filter(
        (p) =>
          (p.name + " " + p.breed).toLowerCase().includes(q.toLowerCase()) &&
          (breed === "All" || p.breed === breed) &&
            (gender === "All" || p.gender === gender),
      ),
      [q, breed, gender],
  );
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">YOUR NEW BEST FRIEND</span>
        <h1>
          Meet the <em>puppies.</em>
        </h1>
        <p>Little personalities, endless cuddles and a whole lot of love.</p>
      </section>
      <section className="section catalog">
        <div className="filters">
          <label className="searchbox">
            <Search size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or breed"
            />
          </label>
          <label>
            <SlidersHorizontal size={16} />
            <select value={breed} onChange={(e) => setBreed(e.target.value)}>
              {breeds.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
        </div>
        <p className="result-count">
          {results.length} little {results.length === 1 ? "love" : "loves"} to
          meet
        </p>
        {results.length ? (
          <div className="puppy-grid">
            {results.map((p) => (
              <PuppyCard key={p.id} puppy={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No puppies match those filters. Try changing your search. ♡
          </div>
        )}
      </section>
    </>
  );
}
