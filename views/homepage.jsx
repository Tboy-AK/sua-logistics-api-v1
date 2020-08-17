const React = require('react');
const propTypes = require('prop-types');
const DefaultLayout = require('./layouts/default-layout');

const Homepage = ({ title }) => (
  <DefaultLayout title={title}>
    <div style={{
      maxWidth: '767px',
      margin: 'auto',
    }}
    >
      <header style={{
        padding: '1em 0 2em 0',
      }}
      >
        <h1 style={{
          marginBottom: '1.5rem',
        }}
        >
          SUA Logistics App v1
        </h1>
        <p>
          Make your dispatches on this platform with our trusted dispatch agents
        </p>
      </header>
      <main style={{
        padding: '1em 0',
      }}
      >
        <h4 style={{
          marginBottom: '1.5rem',
        }}
        >
          Getting Started
        </h4>
        <p>
          This page will most likely become the server of the client side of this app,
          with this route serving as the home page.
        </p>
        <p>
          The api of this app can be found in the
          <a href="/api"> api </a>
          route.
        </p>
        <p>
          Admin can continue in the
          <a href="/admin"> admin </a>
          route.
        </p>
      </main>
      <footer style={{
        height: '100px',
        position: 'fixed',
        bottom: 0,
      }}
      >
        <p>
          <span>Author: </span>
          <a href="https://www.linkedin.com/in/tobi-akanji-36a922149">Tobi Akanji</a>
        </p>
        <p>
          <span>GitHub: </span>
          <a href="https://github.com/Tboy-AK">Tboy-AK</a>
        </p>
      </footer>
    </div>
  </DefaultLayout>
);

Homepage.propTypes = {
  title: propTypes.string.isRequired,
};

module.exports = Homepage;
