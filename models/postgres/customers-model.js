const { query } = require('../../configs/postgres-config');

const CustomersModel = class {
  static async registerCustomer(newCustomer) {
    const {
      email, password, phone, userType, firstName, lastName, registered,
    } = newCustomer;
    const queryString = `WITH new_auth AS (
      INSERT INTO auths (email, password, phone, user_type)
      VALUES (${email}, ${password}, ${phone}, ${userType}) RETURNING *
    ), new_customer (
      INSERT INTO customers (auth_id, first_name, last_name, registered)
      VALUES (new_auth._id, ${firstName}, ${lastName}, ${registered}) RETURNING *
    ) SELECT auth_id AS "authId", user_type AS "userType", email,
    phone, t1._id AS "customerId", first_name AS "firstName", last_name AS "lastName"
    FROM new_customer AS t1
    INNER JOIN new_auth AS t2 ON auth_id=new_auth._id;`;
    try {
      const { rows } = await query(queryString);
      return Promise.resolve(rows[0]);
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

module.exports = CustomersModel;
