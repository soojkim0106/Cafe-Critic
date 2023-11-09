### FinEd

---

## Author

### Spencer Eklund

- Linkedin https://www.linkedin.com/in/spencer-eklund/
- Github https://github.com/eklspe12

---

## Introduction

FinEd is an App I created to demonstrate skills in Python, Javascript, React, and SQL Alchemy. On this app users can learn more about finances by practicing buying/selling stocks, reading financial articles, and Tracking their budget.

---

# Pages

## Login

Users are taken to this page when they first load the app and cannot move on until they enter a valid username and password. They also have the opportunity to create an account here if they need one. The homepage is loaded immediately after the user enters a valid login.

## Homepage

This page provides information about the purpose of the website and its pages. Modules explaining each page are near the bottom, with a link to each page in their header.

## Stock Simulator

Allows users to practice buying and selling stocks with 10 fabricated stocks that follow different behavior patterns to replicate the real stock market. When users buy or sell stocks, they can see an immediate update to their remaining budget.

## Financial News

This page pulls the most recent financial news articles from the alpha advantage api, and then displays the title, image, source, and a short description for each article.

## Track Expenses

This page helps users plan out a monthly budget by entering their income and expenses. Cost of expenses is automatically deducted, and all aspects of expenses can be modified at a later point.

---

# Files

## Client

### AddExpense.js

Component for the "Add Expense" form found on Track Expenses. Utilizes formik to control input and validation on client side. Text field and button created using Materials UI. On submit, sends a post request to the backend, then verifies positive response before rerendering expense list.

### App.js

Highest level component under Index.js, holds components for all other pages as well as NavBar and associated routes. Also contains functions for retrieving and setting the user. If there is not a user, only the login component will be displayed, otherwise the rest of the app is available.

### ExpenseList.js

Retrieves all expenses from the server where the user_id matches the current user then displays them as a Materials UI list. Each expense can be edited or deleted, which will send a patch or delete request to the server. The budget element allows users to enter a number for a monthly budget then automatically deducts expenses from the users monthly budget and displays the value. When a stock is deleted, the budget expense is updated to reflect this. Also displays the AddExpense Component.

### FinancialNews.js

Receives data from aplhaadvantage api then maps it to display financial news articles with links, descriptions, and sources.

### Home.js

Contains general information about the app as well as detailed information about each route with links.

### Login.js

Contains either the login form or the create account form, depending on the isLogin class which is toggles by the "Create Account / Have an account?" button. On submit of the login form, the data is posted to the server and the current user is set. The create account form checks that the username is available and the passwords match before sending a post request and returning the user to the login form.

### NavBar.js

Displays the current page, the user's username, and the logout button. Opening the drawer on the left will display other routes.

### StockBudget.js

Receives users current budget as a prop and displays it.

### StockCard.js

Receives a single stock instance and displays its properties and a buy button. Stock values are automatically changed and patched with useEffect function that assigns each stock a random behavior that controls the range of change for each stock. The changeBehavior function gives each stock a new behavior after a random interval, simulating unpredictability. When a stock is bought, a modal opens to ask for a quantity to buy. On clicking confirm, if the user has enough funds for the stock it will be added to their portfolio with a post request. If the user doesn't have the necessary funds, they will be given an alert instead informing them of the issue.

### StockSimulator.js

Retrieves all stock instances from the backend, as well as all portfolio instances matching the current user user_id, then assigns their value to the stocks state and userPort state. Each stock in the stock state is mapped to create their own Stock Card using the StockCard component. Also contains StockBudget and YourPortfolio components.

### UserContext.js

Exports UserContext constant made with react CreateContent to be used later by the NavBar.

### YourPortfolio.js

Receives users purchased stock information and then displays them as a list. Also contains function to sell stocks in the users portfolio. When sold, a delete request is sent to the server, then the current value of the stock that matches the stock_id as the stock being sold is added back to the total budget.

### Index.js

Imports react Browser Router then wraps App component with Browser Router to make its features accessible.

---

## Server

### app.db

Database that stores information for each instance of User, Stocks, Expenses, and Portfolios.

### app.py

Holds all backend routes and functions. Purpose of each route found below.

-Clear Session: Sets user back to None on logout.
-Signup: Posts new users to User table on app.db.
-CheckSession: Used to return information for the current user.
-UpdateBudget: Updates stock budget after client buys or sells a stock.
-Login: Retrieves user that matches username and password.
-Expenses: Retrieves expenses tied to current user. Can also post expenses to the Expense data table.
-ExpenseById: Used when editing specific expenses so the client knows which expense to update.
-ExpenseByUserId: Retrieves all expenses associated with the current user user_id.
-Stocks: Retrieves stocks from database.
-StocksByID: Used to update value of stocks periodically.
-Portfolios: Retrieves stocks associated with the current user. Also adds stocks for the associated user when bought.
-PortfolioById: Identifies which stock in portfolio will be deleted then deletes the stock when sold.

### config.py

Holds imports for Flask and SQL to be used on the back-end. Also instantiates database and API.

### models.py

Holds relationships and validations for each model and determines attributes for each model.

### seed.py

Contains functions that utilize Faker to generate stock instances then uses separate functions to save these instances to the database on app.py.
