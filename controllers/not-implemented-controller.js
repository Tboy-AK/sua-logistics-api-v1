const noViewsController = () => {
  const unimplementedView = (req, res) => {
    res.status(501).send(`
    <header>
      <h1>501</h1>
    <header>
    <main>
      <p>Oops! Guess this is a roadblock. We would be here soon.</p>
    <main>
    <footer>
      <a href="/">You can find your way back by clikcing this statement</a>
    </footer>
    `);
  };

  return { unimplementedView };
};

module.exports = noViewsController;
