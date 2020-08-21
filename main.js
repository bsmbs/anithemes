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
                    r.sort((a, b) => {
                        if(a.year.slice(-1) == 's' && b.year.slice(-1) == 's') {
                            return a.year.localeCompare(b.year);
                        } else if (a.year.slice(-1) == 's') {
                            return -1;
                        } else if (b.year.slice(-1) == 's') {
                            return 1;
                        }
                        
                        return a.year - b.year;
                    })
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

    app.use('/api', api);
    
    app.listen(port, () => console.log("Listening on http://localhost:"+port));

})
