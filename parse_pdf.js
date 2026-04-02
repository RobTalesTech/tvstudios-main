const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('/Users/creatorrrob/Downloads/Rrrob Resume On compr.pdf');
pdf(dataBuffer).then(function(data) {
    console.log(data.text);
});
