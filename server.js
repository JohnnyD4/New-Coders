var express = require('express');

var exphbs = require('express-handlebars');

var app = express();

var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {


})

app.get('/:view?', function(req, res) {
  	console.log("view");
  if (req.params.view) {
    console.log('rendering view', req.params.view);
    res.render(req.params.view);
  } else {
    res.render('home');

  }
});
app.listen(function(err, data) {
	console.log(PORT);
})

