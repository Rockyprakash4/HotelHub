
import { useState } from "react";
import { Search, MapPin, Hotel } from "lucide-react";

function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="home-page">

      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO HOTELHUB</p>

          <h1>
            Find your perfect
            <span> stay with us.</span>
          </h1>

          <p>
            Discover comfortable hotels, explore beautiful
            destinations and enjoy your next stay.
          </p>

          <div className="search-box">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search hotels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>Search</button>
          </div>
        </div>
      </section>

      <section className="hotels-section">
        <div className="section-heading">
          <div>
            <p className="hero-tag">EXPLORE</p>
            <h2>Available Hotels</h2>
          </div>
        </div>

        <div className="empty-state">
          <Hotel size={45} />

          <h3>No hotels available yet</h3>

          <p>
            Hotels added by the administrator will
            appear here.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;

