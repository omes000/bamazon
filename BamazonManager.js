var mysql = require("mysql");
var inquirer = require("inquirer");
var BamazonCustomer = require("./BamazonCustomer");

var BamazonManager = function(loginType){
	var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "ShAzeb!985!",
		database: "bamazon"
	});

	var that = this;
	connection.connect(function(err) {
		if (err) throw err;
		if(loginType === 'manager'){
			that.managerTasks();
		}
		else{
			console.log("customer");
			var newCustomer = new BamazonCustomer(connection, inquirer);
			connection.query("SELECT * FROM products", function(err, res) {
				if (err) throw err;
				console.log(res);
				newCustomer.placeOrder();
			});
		}
	});

	this.managerTasks = function(){
		inquirer.prompt({
			name: "managerTasks",
			type: "rawlist",
			message: "[VIEW] products, view [LOW] inventory, [ADD] to inventory, add [NEW] product",
			choices: ["VIEW", "LOW", "ADD", "NEW"]
		}).then(function(response){
			if(response.managerTasks === 'VIEW'){
				that.viewInventory();
			}
			else if(response.managerTasks === 'LOW'){
				that.viewLowInventory();
			}
			else if(response.managerTasks === 'ADD'){
				that.addInventory();
			}
			else if(response.managerTasks === 'NEW'){
				that.addProduct();
			}
		});
	}

	this.viewInventory = function(){
		connection.query("SELECT * FROM products", function(err, res){
			if (err) throw err;
			console.log(res);
			that.managerTasks();
		});
	}

	this.viewLowInventory = function(){
		connection.query("SELECT * FROM products", function(err, res){
			if (err) throw err;
			//console.log(res);
			var low = [];

			for (var i = 0; i< res.length; i++){
				if (res[i].stock_quantity <=5){
					low.push(res[i]);
				}
			}
			console.log(low);
			that.managerTasks();
		});
	}

	this.addInventory = function(){
		inquirer.prompt([
		{
			name: "itemID",
			type: "input",
			message: "What is the id of the item you would like to add more inventory to?"
		},
		{
			name: "amount",
			type: "input",
			message: "How many of this item would you like to add?"
		}

		]).then(function(response){
			var adding = response;
			connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?", [adding.amount, adding.itemID],function(err, res){
					if (err) throw err;
					console.log(res.affectedRows + " products updated"); 
					that.managerTasks();
			});
		});
	}

	this.addProduct = function(){
		inquirer.prompt([
		{
			name: "itemName",
			type: "input",
			message: "What is the name of the item you would like to add?"
		},
		{
			name: "itemDept",
			type: "input",
			message: "What is the department of the item you would like to add?"
		},
		{
			name: "itemPrice",
			type: "input",
			message: "What is the price of the item you would like to add?"
		},
		{
			name: "itemStock",
			type: "input",
			message: "How many of this item would you like to add?"
		}
		]).then(function(response){
			connection.query("INSERT INTO products SET ?",
			{
				product_name: response.itemName,
				department_name: response.itemDept,
				price: response.itemPrice,
				stock_quantity: response.itemStock
			}, function(err){
				if (err) throw err;
				console.log("Successfully added the item!");
				that.managerTasks();
			});
		});
	}
}

module.exports = BamazonManager;