const adminPageController = () => {
  const adminPage = (req, res) => {
    res.status(200).send(`
    <main>
      <form method="POST">
        <label>
          <span>Email</span>
          <input type="text" name="email" placeholder="admin@email.com" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" placeholder="Password" />
        </label>
        <button>Login</button>
      </form>
    </main>
    `);
  };

  const adminEntry = (req, res) => {
    const adminNavDoc = [
      {
        url: '/admin',
        methods: {
          GET: {
            desc: 'Admin must login',
            res: {
              dataType: 'HTML/TEXT',
            },
          },
          POST: {
            desc: 'Admin route documentation',
            res: {
              dataType: 'Array',
            },
          },
        },
      },
    ];
    res.status(200).json(adminNavDoc);
  };

  return { adminPage, adminEntry };
};

module.exports = adminPageController;
