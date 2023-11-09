### FinEd

---

## Author

### Spencer Eklund

- Linkedin https://www.linkedin.com/in/spencer-eklund/
- Github https://github.com/eklspe12

---

## Introduction

---

# Pages

## Login

Users are taken to this page when they first load the app and cannot move on until they enter a valid username and ID. They also have the oppurtunity to create an account here if they need one. The homepage is loaded immediately after the user enters a clid login.

## Homepage

This page provides information about purpose of the website and it's pages. Modules explaining each page are near the bottom, with a link to each page in their header.

## Stock Simulator

Allows users to practice buying and selling stocks with 10 fabricated stocks that follow different behavior patterns to replicate a the real stock market. When users buy or sell stocks, they can see an immediate update to their remaining budget.

## Financial News

This page pulls the most recent financial news articles from the alpha advantage api, and then displays the title, image, source, and a short description for each article.

## Track Expenses

This page helps users plan out a monthly budget by entering their income and expenses. Cost of expenses is automatically deducted, and all aspects of expenses can be modified at a later point.

---

# Files

## Client

### AddExpense.js

### App.js

### ExpenseList.js

### FinancialNews.js

### Home.js

### Login.js

### NavBar.js

### StockBudget.js

### StockCard.js

### StockSearch.js

### StockSimulator.js

### UserContext.js

### YourPortfolio.js

### Index.js

---

## Server

### app.db

Database that stores information for each instance of User, Stocks, Expenses, and Portfolios.

### app.py

Holds all backend routes and functions. Purpose of each route found below.

-Clear Session: Sets user back to None on logout.
-Signup: Posts new users to User table on app.db.
-CheckSession: Used to return infromation for the current user.
-UpdateBudget: Updates stock budget after client buys or sells a stock.
-Login: Retrieves user that matches username and password.
-Expenses: Retrieves expenses tied to current user. Can also post expenses to the Expense data table.
-ExpenseById: Used when editing specific expenses so client know which expense to update.
-ExpenseByUserId: Retrieves all expenses associated with the current user user_id.
-Stocks: Retrieves stocks from database.
-StocksByID: Used to update value of stocks periodically.
-Portfolios: Retrieves stocks assosciated with the current user. Also adds stocks for the associated user when bought.
-PortfolioById: Identifies which stock in portfolio will be deleted then deletes the stock when sold.

### config.py

### models.py

### seed.py
