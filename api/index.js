const express = require('express');
const router = express.Router();


router.get('/all', (req, res) => {
    res.json(req.db);
})

router.get('/search', (req, res) => {
    if(req.query.q) {
        const r = req.db.filter(x => x.title.toLowerCase().indexOf(req.query.q.toLowerCase()) > -1);

        if(!r) return res.sendStatus(404);
        res.json(r);
    } else {
        res.sendStatus(400);
    }
})

router.get('/byId/:id', (req, res) => {
    if(req.params.id) {
        const r = req.db.find(x => x.id == req.params.id);

        if(!r) return res.sendStatus(400);
        res.json(r);
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;