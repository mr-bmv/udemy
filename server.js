const express = require('express');  // позволяет кидать данные клиент-сревер
const hbs = require('hbs');  // позволяет делать связи врутри {{}}
const fs = require('fs'); //позволяет записывать в файлы

let app = express();
hbs.registerPartials(__dirname + '/views/partials'); //что бы подключаться к папке с файлами

// list of constant which could be used anyway
hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear());
hbs.registerHelper('showName', ()=> 'Mike');
hbs.registerHelper('showName1', ()=> 'Regina');
hbs.registerHelper('screamIt', (text)=> text.toUpperCase());

app.set('view engine', 'hbs');

//готовимся собирать логи
app.use( (req, res, next) => {
	let now = new Date().toString();
	//console.log(`${now}: ${req.method} ${req.url}`); //methos url описаны в библиотеках експресса
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log')
		}
	});  //создаем и записываем в фаил логи
	next();
});

// будет показана эта страница всегда, пока тут не появиться next 
/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
})*/

app.use(express.static(__dirname + '/public'));

//список страниц
//прописываем ссылку напряму
app.get('/', (req, res) => {
	//res.send('<h1>Hello Mike<h1/>')
	res.send({
		photo_id: 12,
		photo_tag: 'City',
		adress:[
		'Moscow',
		'Kutuzovskiy',
		13],
		date: '12.12.12'
	})
});

//ссылаемся на описыавающие файлы
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: "About New Page",
		welcome: "This is About Page"
	})
});

app.get('/home', (req, res) => {
	res.render('home.hbs', {
		pageTitle: "Home Page",
		welcome: "Hello !!!"
	})
});

app.get('/practice', (req, res) => {
	res.render('practice.hbs', {
		pageTitle: "My Practice",
		welcome: "It is just a text, which should been shown just for test this row!!!"
	})
});

app.get('/bad', (req, res) => {
	res.send({
		message:'Something bad'})
});

//запуск сервера
app.listen(3000, () => {
	console.log("Server is up on 3000!");
});