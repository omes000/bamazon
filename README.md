# Bamazon

Bamazon is a node based application that allows users to get a listing of products from a MySQL database that are orderable. The user inputs the desired item id they wish to order, along with the quantity of that item. The application will check that enough of that item is in stock to fulfill the order, and if there is enough stock, it will display the total price and a confirmation. If there isn't enough stock, the application will inform the user that the order cannot be placed due to stock limitations. 

Additionally, Bamazon has a manager view, that allows the total inventory to be viewed, as well as displaying the low inventory, adding stock to existing inventory, and adding new products to the database. The database is updated with each transaction. 

## Getting Started

These instructions will help you get this app running on your machine. Follow the install instructions for more details. 

### Prerequisites

This installation guide assumes a basic knowledge of Node.js, API usage in the Node environment, and MySQL. Additionally, it assumes that [Node.js](https://nodejs.org/en/) and a MySQL database are installed on your machine. 

### Installing

To get this project to work, clone the repository. Then, install the MySQL Node API and the Inquirer API.

#### MySQL

Create a MySQL database on your application of choice. Ensure that the columns created include product name, product category, product price, product quantity in stock, as well as a unique id for each product.

Install the [Node package for MySQL](https://www.npmjs.com/package/mysql) via the following command:

```
npm install mysql
```

Follow the instructions from the npm page to get the API working. 

#### Inquirer

Install the [Inquirer package](https://www.npmjs.com/package/inquirer) via the following command:

```
npm install inquirer
```

Follow the instructions from the npm page to get the API working. 

## Usage and Examples

The application has 2 basic views: Customer View and Manager View. 

### Customer View (Default) 

This view shows the customer all of the items in the database. This view is entered by typing: 

```
node CLI.js customer
```

![Entering Customer View](/screenshots/custview1.png "Customer View")

If the term after 'CLI.js' is empty or anything besides 'manager', the view will default to Customer. 

Once the user has entered the product and amount to order, the application will check that the item has enough to stock to fulfill the order. If there is enough stock, the application will display a confirmation along with the total price of the order. 

![Order Success](/screenshots/custview2.png "Order Success")

If it doesn't, the user will be told that there isn't enough stock and be prompted to order again. 

![Order Unsuccessful](/screenshots/custview3.png "Order Unsuccessful")

### Manager View

Allows the manager to perform 4 tasks: a. VIEW Stock, b. View LOW Stock, c. ADD stock to existing products, and d. Add NEW product. This view is entered by typing: 

```
node CLI.js manager
```

![Entering Manager View](../screenshots/manview1.png "Manager View")

#### VIEW

The manager can then select from one of the four tasks. If 'VIEW' is selected, the manager can view the current status of all products: 

![Viewing all Products](../screenshots/manview2.png "Viewing All Products")

#### LOW

If 'LOW' is selected, the manager can view products with a stock quantity of 5 or lower:

![Viewing Low Stock Products](../screenshots/manview3.png "Viewing Low Stock Products")

#### ADD

If 'ADD' is selected, the manager is prompted to enter the id of the product they wish to replenish, along with the amount they wish to replenish it with: 

![Adding Stock to Existing Products](../screenshots/manview4.png "Adding Stock to Existing Products")

The manager is presented with a confirmation and can then view the updated stock by selected the 'VIEW' task:

![Viewing Updated Stock](../screenshots/manview5.png "Viewing Updated Stock")

#### NEW

Finally, if 'NEW' is selected, the manager is prompted to enter the details of the new item they wish to add: 

![Adding New Products](../screenshots/manview6.png "Adding New Products")

The manager is presented with a confirmation message and can then view the updated product database by selecting the 'VIEW' task:

![View Updated Product Database](../screenshots/manview7.png "Viewing Updated Product Database")

## Author

Umer Rathore
