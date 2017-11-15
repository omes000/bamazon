var BamazonCustomer = function(connection, inquirer){
	var that = this;
	this.placeOrder = function(){
		inquirer.prompt([
		{
			name: "itemID",
			type: "input",
			message: "What is the id of the item you would like to purchase?"
		},
		{
			name: "amount",
			type: "input",
			message: "How many of this item would you like to purchase?"
		}

		]).then(function(response){
			var orderEntered = response;
			connection.query("SELECT * FROM products WHERE ?", {id: parseInt(orderEntered.itemID)}, function(err,res){
					console.log("You are ordering " + res[0].product_name);
					if(orderEntered.amount <= res[0].stock_quantity){
						var orderPlaced = res[0];
						var updatedStock = orderPlaced.stock_quantity - orderEntered.amount;
						console.log("Excellent! Your order has been placed for " + orderEntered.amount + " " + res[0].product_name);
						connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [updatedStock, orderPlaced.id], function(err, res){
							console.log(res.affectedRows + " products updated"); 
							console.log("Your total is: $" + orderPlaced.price*orderEntered.amount);

							inquirer.prompt([
							{
								name: "orderAgain",
								type: "confirm",
								message: "Would you like to order another item?"
							}
							]).then(function(response){
								if (response.orderAgain === true){
									that.placeOrder();
								}
								else{
									console.log("See you later!");
									connection.end();
								}
							})
						});
					}
					else{
						inquirer.prompt([
						{
							name: "outofStock",
							type: "confirm",
							message: "\nSorry, we don't have enough stock to fulfill your order. \nWould you like to order a lesser amount or order another item?"
						}
						]).then(function(response){
							if (response.outofStock === true){
								that.placeOrder();
							}
							else{
								console.log("See you later!");
								connection.end();
							}
						})
					}
				});
		});
	}
}

module.exports = BamazonCustomer;