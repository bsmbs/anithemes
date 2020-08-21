const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const port = 8080;

const api = require('./api/index');

const themes = require('./api/themes');
themes.then(db => {
    console.log("Loaded "+db.length+' entries');
    // Inject themes db
    app.use((req, res, next) => {
        req.db = db;
        next();
    })

    // Possible years
    const years = [...new Set(db.map(x => x.year))];
    years.sort(sortYears).reverse();

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

            switch(req.query.sort) {
                case 'year':
                    r.sort((a, b) => sortYears(a.year, b.year));
                    break;
                default:
                    r.sort((a, b) => a.title.localeCompare(b.title));
            }

            res.render('results', { results: r })
        } else { // TODO fancy error
            res.sendStatus(400);
        }
    })
    
    app.get('/random', (req, res) => {
        const r = req.db[Math.floor(Math.random() * req.db.length)];
        res.render('results', { results: [r] })
    })

    app.get('/years', (req, res) => {
        res.render('years', { years })
    })

    app.get('/year/:id', (req, res) => {
        if(req.params.id) {
            const r = req.db.filter(x => x.year == req.params.id);
            r.sort((a, b) => a.title.localeCompare(b.title));
            
            res.render('results', { results: r })
        } else {
            res.sendStatus(400);
        }
    })

    app.use('/api', api);
    
    app.listen(port, () => console.log("Listening on http://localhost:"+port));

})

function sortYears(a, b) {
    if(a.slice(-1) == 's' && b.slice(-1) == 's') {
        return a.localeCompare(b);
    } else if (a.slice(-1) == 's') {
        return -1;
    } else if (b.slice(-1) == 's') {
        return 1;
    }
    
    return a - b;
}