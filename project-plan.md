## Project Requirements
A logistics company wants to create a web app for their operations. They have the following requirements:

1. 4 different kinds of users can log in to their app:

  - Admin - The company's own staff with full access to the platform. They also manage all the other user types. First admin creates them - they don't register.

  - Rider - A bike rider or car owner that will deliver things from a Partner to a User. They can register on the website - but will be verified before they can start taking deliveries.

  - Partner - A company that has things to deliver to a User e.g. A restaurant that wants to deliver food to its customers. They don't register via the online platform. The admin creates them.

  - User - They Don't need to register, but need to be able to track the rider. If they register, they'd be able to view history of deliveries.

2. The flow is this: A partner posts a delivery order, an available rider picks it (the 1st person to pick it wins as multiple riders could be trying to pick it). Once the rider has picked item up, they deliver it to the User. The rider marks the order as delivered. The User marks the delivery as Complete. 

Your task is to create the API and Schema for this service. Don't build the features - you do not have the time for that.
No need to create the controllers, if you are using MVC, for instance. 

Just create all the endpoints and models you feel such a service needs and make them return a 501 Not Implemented response when called.

You are to include the registration and login controller to this assignment.


## Solution
TABLES
- Auths (email, password)(unregistered users they get a generic password)(User email gets saved for either of 2 reasons: 1. Customer made an order, 2. Customer registered)
- Admin (authId, firstName, lastName, phoneNumber, department, jobRole)
- Rider (authId, firstName, lastName, phoneNumber, jurisdictionId, "verified" field boolean)
- Partner (authId, companyName, phoneNumber, jurisdictionId, address)
- User ("registered" field boolean, authId, firstName, lastName, phoneNumber)
- Jurisdiction (city, cityGoogleId)
/ mongoDB
- OrderStatus (inCart, ordered, canceled, inTransit, delivered, returned, completed)
- Order (userId, partnerId, [{productId, quantity, discount(%)}], riderId, orderStatusId, discount(%), desc)
/ mongoDB/
- Products (name, price, desc)

Admin will be registered via the admin route, in the auth sub-route. An acces token will be verified for admin in the `Authorization` header.

Partner will be registered via the admin route, in the auth sub-route. An access token will be verified for admin in the "Authorization" header.

A push notification will be used to notify all riders of a new order posted by a partner.