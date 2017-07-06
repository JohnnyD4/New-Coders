var express = require('express');

var exphbs = require('express-handlebars');

var app = express();

var PORT = 3000;

var mysql = require('mysql');


app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'kickstart'
});

connection.connect(function(err) {
	if (err) throw err;

	console.log("connection Id:", connection.threadId);
})

app.get("/", function(req, res) {
	connection.query("SELECT `sample-submission`.project_id, `test`.name, `test`.country, `test`.goal, `sample-submission`.final_status, `test`.desc, test.launched_at, test.deadline FROM  `test` INNER JOIN `sample-submission` ON  `sample-submission`.project_id = `test`.`project_id` WHERE `sample-submission`.final_status LIMIT 10", function(err, data) {

		if (err) throw err;

		res.render('index', {test: data});
	})
	

})


app.listen(PORT, function(err, data) {
	console.log(PORT);
})

