const React = require('react');
const Container = require('react-bootstrap/Container');
const propTypes = require('prop-types');

const DefaultLayout = ({ title, children }) => (
  <html lang="en">
    <head>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <title>{title}</title>
    </head>
    <body>
      <Container>
        <div style={{
          padding: '1emvh 2em',
        }}
        >
          {children}
        </div>
      </Container>
    </body>
  </html>
);

DefaultLayout.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
};

module.exports = DefaultLayout;
