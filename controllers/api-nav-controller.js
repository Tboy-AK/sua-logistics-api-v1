const apiNavController = () => {
  const apiNav = (req, res) => {
    const apiNavDoc = [
      {
        url: '/api',
        methods: {
          GET: {
            desc: 'User can read the documentation of the API',
            res: {
              dataType: 'Array',
            },
          },
        },
      },
    ];
    res.status(200).json(apiNavDoc);
  };

  return { apiNav };
};

module.exports = apiNavController;
