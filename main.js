const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const port = 8080;

const api = require('./api/index');

const themes = require('./api/themes');
themes.then(db => {
    // Inject themes db
    app.use((req, res, next) => {
        req.db = db;
        next();
    })


    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    
    app.set('view engine', 'hbs');
    app.use(express.static('static'));
    
    app.get('/', (req, res) => {
        res.render('index');
    })
    
    app.get('/search', (req, res) => {
        if(req.query.q) {
            const r = req.db.filter(x => x.title.toLowerCase().indexOf(req.query.q.toLowerCase()) > -1);
            if(!r) res.sendStatus(404);

            res.render('results', { results: r })
        } else { // TODO fancy error
            res.sendStatus(400);
        }
    })
    
    app.use('/api', api);
    
    app.listen(port, () => console.log("Listening on http://localhost:"+port));

})
