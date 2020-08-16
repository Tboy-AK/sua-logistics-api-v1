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
      {
        url: '/api/auths',
        methods: {
          POST: {
            desc: 'User can sign in',
            res: {
              dataType: 'Object',
            },
          },
        },
      },
      {
        url: '/api/customers',
        methods: {
          POST: {
            desc: 'User can sign up as a customer',
            res: {
              dataType: 'Object',
            },
          },
        },
      },
      {
        url: '/api/partners',
        methods: {
          POST: {
            desc: 'Admin can register a partner',
            res: {
              dataType: 'Object',
            },
          },
        },
      },
      {
        url: '/api/riders',
        methods: {
          POST: {
            desc: 'Rider can sign up',
            res: {
              dataType: 'Object',
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
