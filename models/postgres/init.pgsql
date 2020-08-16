-- CREATE SEQUENCES

CREATE SEQUENCE IF NOT EXISTS auths_id_seq;
CREATE SEQUENCE IF NOT EXISTS admins_id_seq;
CREATE SEQUENCE IF NOT EXISTS riders_id_seq;
CREATE SEQUENCE IF NOT EXISTS partners_id_seq;
CREATE SEQUENCE IF NOT EXISTS customers_id_seq;
CREATE SEQUENCE IF NOT EXISTS orders_id_seq;
CREATE SEQUENCE IF NOT EXISTS order_items_id_seq;


-- CREATE FUNCTIONS

CREATE FUNCTION PUBLIC.timestamp_on_create()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
AS $BODY$ BEGIN
  NEW.created_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END; $BODY$;

COMMENT ON FUNCTION PUBLIC.timestamp_on_create()
  IS 'Time stamp to track the date and time the data on a row was created';

CREATE FUNCTION PUBLIC.timestamp_on_modify()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
AS $BODY$ BEGIN
  NEW.modified_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END; $BODY$;

COMMENT ON FUNCTION PUBLIC.timestamp_on_modify()
  IS 'Time stamp to track the date and time the data on a row was modified';


CREATE FUNCTION row_version_on_modify()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
AS $BODY$ BEGIN
  NEW._v := NEW._v + 1;
  RETURN NEW;
END; $BODY$;

COMMENT ON FUNCTION row_version_on_modify()
  IS 'Version recorder to monitor changes made on a row of data';


-- DROP ALL TABLES

DROP TABLE IF EXISTS auths CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS riders CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;


-- CREATE ENUMS
  
CREATE TYPE "USER_TYPE" AS ENUM ('admin', 'partner', 'rider', 'customer');

CREATE TYPE "ORDER_STATUS" AS ENUM ('in cart', 'ordered', 'in transit', 'delivered', 'completed', 'returned');


-- CREATE TABLES AND TRIGGERS

CREATE TABLE IF NOT EXISTS auths (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  email CHARACTER VARYING (100) COLLATE pg_catalog."default" NOT NULL,
  phone CHARACTER VARYING (20) COLLATE pg_catalog."default" NOT NULL,
  password CHARACTER VARYING (1024) COLLATE pg_catalog."default" NOT NULL,
  user_type "USER_TYPE" NOT NULL,
  _v INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  modified_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT auths_pkey PRIMARY KEY (_id),
  CONSTRAINT auths_email_key UNIQUE (email),
  CONSTRAINT auths_phone_key UNIQUE (phone)
);

COMMENT ON TABLE PUBLIC.auths
  IS 'Table where registered app users are recorded';


CREATE TABLE IF NOT EXISTS admins (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  auth_id INTEGER NOT NULL,
  first_name CHARACTER VARYING (20) COLLATE pg_catalog."default" NOT NULL,
  last_name CHARACTER VARYING (20) COLLATE pg_catalog."default" NOT NULL,
  _v INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  modified_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT admins_pkey PRIMARY KEY (_id),
  CONSTRAINT admins_auth_id_key UNIQUE (auth_id),
  CONSTRAINT admins_auth_id_fkey FOREIGN KEY (auth_id)
    REFERENCES PUBLIC.auths (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

COMMENT ON TABLE PUBLIC.admins
  IS 'Table where the admins are recorded';


CREATE TABLE IF NOT EXISTS riders (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  auth_id INTEGER NOT NULL,
  first_name CHARACTER VARYING (20) COLLATE pg_catalog."default" NOT NULL,
  last_name CHARACTER VARYING (20) COLLATE pg_catalog."default" NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  _v INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  modified_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT riders_pkey PRIMARY KEY (_id),
  CONSTRAINT riders_auth_id_key UNIQUE (auth_id),
  CONSTRAINT riders_auth_id_fkey FOREIGN KEY (auth_id)
    REFERENCES PUBLIC.auths (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

COMMENT ON TABLE PUBLIC.riders
  IS 'Table where the riders are recorded';


CREATE TABLE IF NOT EXISTS partners (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  auth_id INTEGER NOT NULL,
  business_name CHARACTER VARYING (30) COLLATE pg_catalog."default" NOT NULL,
  address CHARACTER VARYING (100) COLLATE pg_catalog."default" NOT NULL,
  _v INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  modified_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT partners_pkey PRIMARY KEY (_id),
  CONSTRAINT partners_auth_id_key UNIQUE (auth_id),
  CONSTRAINT partners_auth_id_fkey FOREIGN KEY (auth_id)
    REFERENCES PUBLIC.auths (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

COMMENT ON TABLE PUBLIC.partners
  IS 'Table where partners are recorded';
  

CREATE TABLE IF NOT EXISTS customers (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  auth_id INTEGER NOT NULL,
  first_name CHARACTER VARYING (20) COLLATE pg_catalog."default" NOT NULL,
  last_name CHARACTER VARYING (20) COLLATE pg_catalog."default" NOT NULL,
  registered BOOLEAN NOT NULL DEFAULT FALSE,
  _v INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  modified_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT customers_pkey PRIMARY KEY (_id),
  CONSTRAINT customers_auth_id_key UNIQUE (auth_id),
  CONSTRAINT customers_auth_id_fkey FOREIGN KEY (auth_id)
    REFERENCES PUBLIC.auths (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

COMMENT ON TABLE PUBLIC.customers
  IS 'Table where customers are recorded';


CREATE TABLE IF NOT EXISTS orders (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  customer_id INTEGER NOT NULL,
  partner_id INTEGER NOT NULL,
  rider_id INTEGER NOT NULL,
  status "ORDER_STATUS" NOT NULL,
  discount NUMERIC NOT NULL DEFAULT 0.00,
  address CHARACTER VARYING (100) COLLATE pg_catalog."default" NOT NULL,
  "desc" TEXT COLLATE pg_catalog."default" NOT NULL,
  _v INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  modified_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT orders_pkey PRIMARY KEY (_id),
  CONSTRAINT order_items_quantity_range CHECK(discount >= 0 AND discount <= 1),
  CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id)
    REFERENCES PUBLIC.customers (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT orders_partner_id_fkey FOREIGN KEY (partner_id)
    REFERENCES PUBLIC.partners (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT orders_rider_id_fkey FOREIGN KEY (rider_id)
    REFERENCES PUBLIC.riders (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

COMMENT ON TABLE PUBLIC.orders
  IS 'Table where orders are recorded and tracked. Discount is in the range 0 to 1';
  

CREATE TABLE IF NOT EXISTS order_items (
  _id INTEGER GENERATED ALWAYS AS IDENTITY,
  "name" CHARACTER VARYING (100) COLLATE pg_catalog."default" NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit CHARACTER VARYING (20) COLLATE pg_catalog."default" NOT NULL,
  order_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  modified_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT articles_and_categories_pkey PRIMARY KEY (_id),
  CONSTRAINT order_items_name_key UNIQUE ("name"),
  CONSTRAINT order_items_quantity_range CHECK(quantity > 0),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id)
    REFERENCES PUBLIC.orders (_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

COMMENT ON TABLE PUBLIC.order_items
  IS 'Table where order items are referenced from';


-- CREATE TRIGGER

CREATE TRIGGER auths_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.auths
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();


CREATE TRIGGER auths_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.auths
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();


CREATE TRIGGER auths_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.auths
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();


CREATE TRIGGER admins_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.admins
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();


CREATE TRIGGER admins_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.admins
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();


CREATE TRIGGER admins_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.admins
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();


CREATE TRIGGER riders_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.riders
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();


CREATE TRIGGER riders_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.riders
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();


CREATE TRIGGER riders_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.riders
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();


CREATE TRIGGER partners_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.partners
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();


CREATE TRIGGER partners_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.partners
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();


CREATE TRIGGER partners_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.partners
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();


CREATE TRIGGER customers_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.customers
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();


CREATE TRIGGER customers_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.customers
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();


CREATE TRIGGER customers_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.customers
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();


CREATE TRIGGER orders_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.orders
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();


CREATE TRIGGER orders_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.orders
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();


CREATE TRIGGER orders_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.orders
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();


CREATE TRIGGER order_items_timestamp_on_create
  BEFORE INSERT
  ON PUBLIC.order_items
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_create();


CREATE TRIGGER order_items_timestamp_on_modify
  BEFORE INSERT OR UPDATE
  ON PUBLIC.order_items
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.timestamp_on_modify();


CREATE TRIGGER order_items_row_version_on_modify
  BEFORE UPDATE
  ON PUBLIC.order_items
  FOR EACH ROW
  EXECUTE PROCEDURE PUBLIC.row_version_on_modify();
