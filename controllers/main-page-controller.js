const mainPageController = () => {
  const mainPage = (req, res) => {
    res.status(200).render('homepage');
  };

  return { mainPage };
};

module.exports = mainPageController;
