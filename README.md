## What it does.

Salty-Dogs-Galley is a restaurant application created so you can order seafood dishes online.  From the home page, you can access menu items, order and checkout from the top navigation bar.  To view the app, click the following url https://salty-dogs-galley-customer-app.herokuapp.com/ .  This application is linked to the manager application, found at https://salty-dogs-galley-manager.herokuapp.com/ , which can be used to edit menu items and manage orders.  To log in, use the following user name and password.

User Name: sdg.manager@hotmail.com
Password: 1234567

### Home Screen
![Home Screen](https://github.com/josephmerlitz/Salty-Dogs-Galley-Customer-App/blob/master/repo-images/Home.png)

### Menu
![Menu](https://github.com/josephmerlitz/Salty-Dogs-Galley-Customer-App/blob/master/repo-images/Menu.png)

### Place Order Page
![Place Order Page](https://github.com/josephmerlitz/Salty-Dogs-Galley-Customer-App/blob/master/repo-images/Order.png)

### Cart
![Cart](https://github.com/josephmerlitz/Salty-Dogs-Galley-Customer-App/blob/master/repo-images/Cart.png)

### Checkout Page
![Checkout Page](https://github.com/josephmerlitz/Salty-Dogs-Galley-Customer-App/blob/master/repo-images/Checkout.png)

### Receipt Page
![Receipt Page](https://github.com/josephmerlitz/Salty-Dogs-Galley-Customer-App/blob/master/repo-images/Receipt.png)

## You can follow the below steps to install and run the customer app

1. Rename the file **.env.example** to **.env**
2. Create your Stripe account and update **STRIPE_SECRET_KEY** and **STRIPE_PUBLISHABLE_KEY** in your .env file
3. Create a MongoDB database and configure the database connection string **MONGODB_URI** in your **.env** file
4. Install all dependencies by moving to the **project** main directory and then running **npm install** then running **npm run client-install**
6. Start the app by moving to the project main directory and then running the command **npm run dev**


## Used Technologies

1. React
2. MongoDB
3. React Router
4. Bootstrap
5. React Context API
6. Node JS
7. Express
8. Mongoose
9. Axios
10. Stripe
