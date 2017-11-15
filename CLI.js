var BamazonManager = require("./BamazonManager");
var loginType = process.argv[2];

var NewLogin = new BamazonManager(loginType);