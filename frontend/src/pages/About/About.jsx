function About() {
  return (
    <div
      style={{
        padding: "60px 10%",
        background: "#f8f9fc",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#6a11cb",
          marginBottom: "20px",
        }}
      >
        About KanukArt 🎨
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          maxWidth: "900px",
          margin: "0 auto 50px",
          lineHeight: "1.8",
        }}
      >
        KanukArt is a platform that connects talented artists
        with people looking for meaningful gifts and unique
        handmade creations. From paintings and sketches to
        pottery and custom gifts, we help artists showcase
        their creativity while allowing customers to discover
        one-of-a-kind artworks.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🎯 Our Mission</h2>
          <p>
            Empower artists by providing a platform to showcase
            their talent and connect them with customers who
            appreciate handmade creativity.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🚀 Our Vision</h2>
          <p>
            To become India's most trusted marketplace for
            artistic gifting, handmade creations, and custom
            artwork experiences.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🤝 Why KanukArt?</h2>
          <p>
            Support local artists, discover unique handmade
            products, and turn every gift into a memorable
            experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;