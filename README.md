## You can follow the below steps to install and run the app

1. Rename the file **.env.example** to **.env**
2. Create your Stripe account and update **STRIPE_SECRET_KEY** and **STRIPE_PUBLISHABLE_KEY** in your .env file
3. Create a MongoDB database and configure the database connection string **MONGODB_URI** in your **.env** file
4. Install all dependencies by moving to the **project** main directory and then running **npm install** then running **npm run client-install**
6. Start the app by moving to the project main directory and then running the command **npm run dev**