import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <nav className="nav">
          <div className="logo">Your Logo</div>
          <div className="login-button">
            <button>Login</button>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <section className="about-section">
          <h2>About Us</h2>
          <p>
            Welcome to our recipe sharing app! We are passionate about cooking and
            providing a platform for food enthusiasts to create their own cookbooks
            and share their culinary creations with the world.
          </p>
          <p>
            Our app allows you to explore a vast collection of recipes contributed
            by users like you. Whether you're a professional chef or a home cook,
            you'll find inspiration and new dishes to try in your kitchen.
          </p>
          <p>
            Create your personalized cookbook by saving your favorite recipes. You
            can organize them into categories, add your own notes, and even
            customize the ingredients and instructions to suit your taste and
            cooking style.
          </p>
        </section>
        {/* Other main content sections */}
      </main>
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default HomePage;
