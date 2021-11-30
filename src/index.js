const  express =require ('express');
const path= require('path');
const exphbs =require ('express-handlebars');
const methodOverraide = require('method-override');
const session= require('express-session');
const { extname } = require('path');

//inicializaciones
const app= express();
require('./database.js')


//settings
app.set('port',process.env.PORT ||3000);
app.set('views',path.join(__dirname, 'views')) ;
app.engine('.hbs', exphbs =>({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'Layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

 app.set('view engine', '.hbs');


//middlewares
app.use(express.urlencoded( {extended: false}));
app.use(methodOverraide('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave:true,
    saveUninitialized:true
}))

//global variables 

//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// El servidor esta escuchando
app.listen(app.get('port'))
console.log(" server on port ", app.get('port'));
