const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('currentYear', ()=>{
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
})
app.use((req, res, next)=>{
var now = new Date().toString();
var log = `${now}: ${req.method}, ${req.url}`;

console.log(log);
fs.appendFile('server.log', log+('\n'), (err)=>{
	if(err){
		console.log('Unable to write to server.log');
	}
});
next();
})
app.use((req, res, next)=>{
	res.render('maintanance.hbs');
	
})
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
	res.render('home.hbs',{
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome to the homepage of the website',
		
	})
});

app.get('/about', (req, res)=>{
	res.render('about.hbs',{
		pageTitle: 'About Page',
		text: 'Some Text here!',
		
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		errorMessage: 'Unable to connect to the server',
		status: 5000
	});
});

app.listen(3000, ()=>{
	console.log('Server is up on port 3000');
});