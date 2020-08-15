const mainPageController = () => {
  const mainPage = (req, res) => {
    res.status(200).send(`
    <header>
      <h1>SUA Logistics App v1</h1>
      <p><small>Welcome to the SUA Logistics App</small></p>
    </header>
    <hr />
    <main>
      <p>
        This page will most likely become the server of the client side of this app,
        with this route serving as the home page.
      </p>
      <p>The api of this app can be found in the <a href="/api">api</a> route.</p>
      <p>Admin can continue in the <a href="/admin">admin</a> route.</p>
    </main>
    <hr />
    <footer>
      <p><span>Author:</span> Tobi Akanji</p>
      <p><span>GitHub:</span> <a href="https://github.com/Tboy-AK">Tboy-AK</a></p>
    </footer>
    `);
  };

  return { mainPage };
};

module.exports = mainPageController;
