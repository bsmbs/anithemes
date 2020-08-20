const AnimeThemes = require('animethemes-parser');

const at = new AnimeThemes()

if(process.env.NODE_ENV == 'production') {
    console.log("Fetching songs database...")
    module.exports = at.all();
} else {
    console.log("Using local data")
    module.exports = at.import();
}
