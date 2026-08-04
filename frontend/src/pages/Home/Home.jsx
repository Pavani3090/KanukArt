import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Home.css";
import painting from "../../assets/images/painting.jpeg";
import sketch from "../../assets/images/sketch.jpeg";
import pottery from "../../assets/images/pottery.jpeg";
import customize from "../../assets/images/customize.jpeg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      

      <section className="hero">
        <div className="hero-left">
          <span className="hero-tag">🎨 Creative Marketplace</span>

          <h1>
            Every Creation
            <br />
            Tells A Story
          </h1>

          <p>
            Discover paintings, pottery, sketches and personalized artwork
            crafted by talented creators.
          </p>

          <div className="hero-buttons">
            <button
              className="secondary-btn"
              onClick={() => navigate("/register?role=ARTIST")}
            >
              Become Creator
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img src={painting} alt="Painting" className="card card1" />

          <img src={sketch} alt="Sketch" className="card card2" />

          <img src={pottery} alt="Pottery" className="card card3" />

          <img src={customize} alt="Creative Studio" className="card card4" />
        </div>
      </section>

      {/* Creative World */}
      <section className="creative-world">
        <h2>Our Creative World</h2>

        <div className="creative-grid">
          <div className="creative-card">
            <span>🎨</span>
            <h3>Paintings</h3>
            <p>Beautiful handcrafted canvas artworks.</p>
          </div>

          <div className="creative-card">
            <span>✏️</span>
            <h3>Sketches</h3>
            <p>Custom portraits and pencil art.</p>
          </div>

          <div className="creative-card">
            <span>🏺</span>
            <h3>Pottery</h3>
            <p>Unique handmade pottery creations.</p>
          </div>

          <div className="creative-card">
            <span>🎁</span>
            <h3>Customized Gifts</h3>
            <p>Personalized gifts made with creativity.</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured">
        <h2>Featured Categories</h2>

        <div className="featured-grid">
          <div className="featured-card">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5"
              alt="Portrait Art"
            />
            <h3>Portrait Art</h3>
          </div>

          <div className="featured-card">
            <img
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b"
              alt="Canvas Paintings"
            />
            <h3>Canvas Paintings</h3>
          </div>

          <div className="featured-card">
            <img
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa"
              alt="Pottery"
            />
            <h3>Pottery</h3>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="works">
        <h2>How KanukArt Works</h2>

        <div className="steps">
          <div className="step">
            <h3>1</h3>
            <p>Explore Art</p>
          </div>

          <div className="step">
            <h3>2</h3>
            <p>Choose Artist</p>
          </div>

          <div className="step">
            <h3>3</h3>
            <p>Place Order</p>
          </div>

          <div className="step">
            <h3>4</h3>
            <p>Receive Creation</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
