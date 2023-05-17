const express = require('express');
const app = express();

const flash = require('connect-flash');
const {redirectHome,redirectLogin, setSession, overrideMethods} = require('./middlewares');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// configura sessione
app.use(setSession());
app.use(overrideMethods());
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use('/axios',express.static(__dirname + '/node_modules/axios/dist'));
app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/sweetalert2',express.static(__dirname + '/node_modules/sweetalert2/dist'));

//HANDLEBARS
const expHbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const handlebars = expHbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

handlebars.handlebars.registerHelper('completed', function (value) {
    if(value===1){
    return 'completato';
    }else{
    return 'non completato'; 
    } 
  });

  handlebars.handlebars.registerHelper('isEqual', function (a,b) {
    if (a == b) {
        return this;
      }
  });

const principaleRoutes = require('./routes/api/routePrincipale');
const tipoRoutes = require('./routes/api/routeTipo');
const autRoutes = require('./routes/auth');
const fetchRoutes = require('./routes/fetch');

app.use('/auth', redirectHome, autRoutes);
app.use('/fetch', fetchRoutes);
app.use(['/menu','/'], redirectLogin, require('./routes/routeMenu'));
//app.use('/menu', redirectLogin, require('./routes/routeMenu'));

app.use('/todo', redirectLogin, require('./routes/routeTodo'));
app.use('/as400', redirectLogin, require('./routes/routeAs400'));
app.use('/as4000', require('./routes/routeAs4000'));

app.use('/api/tipo', redirectLogin, tipoRoutes);
app.use('/api/principale', redirectLogin, principaleRoutes);
app.use('/principale', redirectLogin, require('./routes/routePrincipale'));
app.use('/tipo', redirectLogin, require('./routes/routeTipo'));


//app.use('/tipo', tipoRoutes);
//app.use('/principale', principaleRoutes);

//RENDER PRIMA PAGINA .HBS
/*app.get('/',(req,res) =>{
    res.render('index');
});*/
var port = process.env.PORT || 8080;

app.listen(port, ()=> console.log('in ascolto su porta: ' + port));