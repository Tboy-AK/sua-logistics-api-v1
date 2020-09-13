import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const DefaultLayout = require('./layouts/default-layout');

const HomepageStyles = styled.div`
  max-width: 767px;
  margin: auto;

  header {
    padding: 1em 0 2em 0;
  }

  main {
    padding: 1em 0;

    h1 {
      margin-bottom: 1.5rem;
    }

    h4 {
      margin-bottom: 1.5rem;
    }
  }

  footer {
    height: 100px;
    position: fixed;
    bottom: 0;
  }
`;

const Homepage = ({ title }) => (
  <DefaultLayout title={title}>
    <HomepageStyles>
      <header>
        <h1>
          SUA Logistics App v1
        </h1>
        <p>
          Make your dispatches on this platform with our trusted dispatch agents
        </p>
      </header>
      <main>
        <h4>
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
      <footer>
        <p>
          <span>Author: </span>
          <a href="https://www.linkedin.com/in/tobi-akanji-36a922149">Tobi Akanji</a>
        </p>
        <p>
          <span>GitHub: </span>
          <a href="https://github.com/Tboy-AK">Tboy-AK</a>
        </p>
      </footer>
    </HomepageStyles>
  </DefaultLayout>
);

Homepage.propTypes = {
  title: propTypes.string,
};

Homepage.defaultProps = {
  title: '',
};

module.exports = Homepage;
