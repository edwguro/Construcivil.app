import express from "express";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "express-handlebars";
import personasRoutes from "./routes/persona.route.js";
//const bcrypt = require('bcrypt');

// initialization
const app = express();
const { engine } = pkg;
const __dirname = dirname(fileURLToPath(
    import.meta.url));

// setings
app.set('port', process.env.PORT || 4000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routers
/*app.get('/', (req, res) => 
    res.render('/prueba')
});*/
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.use(personasRoutes);

//public methods
app.use(express.static(join(__dirname, 'public')));

//run server
app.listen(app.get('port'), () =>
    console.log('Servidor corriendo por el puerto : ' + app.get('port')));