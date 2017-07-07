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

	// connection.query("SELECT ")
	connection.query("SELECT `sample-submission`.project_id, `test`.name, `test`.country, `test`.goal, `sample-submission`.final_status, `test`.desc, test.launched_at, test.deadline FROM test INNER JOIN `sample-submission` ON  `sample-submission`.project_id = `test`.`project_id` WHERE `sample-submission`.final_status LIMIT 5", function(err, data) {

		if (err) throw err;

		connection.query('SELECT avg(goal) AS avg FROM train WHERE final_status = 1', function(err, tableData){

			var finalData = {
				test: data,
				nextTable: tableData,
				title: 'Home Page'
			}

			// orm.showtable('asdf', function(data) {

			// })
			console.log(tableData);		

			res.render('index', finalData);
		})

		
	})
		

})



app.post("/edit/:id", function(req, res) {
	// console.log(req.body.name);
	// console.log(req.body.goal);
	// console.log(req.params.id);
	connection.query("UPDATE `test` SET `test`.name = ?, `test`.goal = ?, `test`.desc = ? WHERE `sample-submission`.project_id = ?", [req.body.name, req.body.goal, req.body.desc, req.params.id], function(err, data) {

		if (err) throw err;

		res.redirect("/");
	})

})

app.get("/edit/:id", function(req, res) {

	connection.query("SELECT `sample-submission`.project_id, `test`.name, `test`.country, `test`.goal, `sample-submission`.final_status, `test`.desc, test.launched_at, test.deadline FROM test INNER JOIN `sample-submission` ON  `sample-submission`.project_id = `test`.`project_id` WHERE `sample-submission`.final_status AND `sample-submission`.`project_id` = ? LIMIT 5", [req.params.id], function(err, data) {

		if (err) throw err;

		var finalData= {
			test: data,
			title: "Edit"
		}

		res.render('edit', finalData);
	})
	// res.render("edit");
})

app.listen(PORT, function(err, data) {
	console.log(PORT);
})

