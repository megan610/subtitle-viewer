const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const app = express();
const assCompiler = require('ass-compiler');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.post('/api/upload', function (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        const old_path = files.file.path;
        const file_size = files.file.size
        const file_ext = files.file.name.split('.').pop();
        const index = old_path.lastIndexOf('/') + 1;
        const file_name = old_path.substr(index);
        const new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);

        fs.readFile(old_path, {
            encoding: 'utf16le'
        }, function (error, data) {
            if (error) {
                console.log(`reading error : ${error}`);
            }
            res.writeHead(200, {
                'Content-Type': 'application/json;charset=utf-8'
            });
            const compileData = assCompiler.parse(data);
            const {
                info,
                styles,
                events = {}
            } = compileData;
            const {
                dialogue = []
            } = events;
            const result = dialogue.map(item => {
                const {
                    Text
                } = item;
                const combinedText = Text.combined;
                const [chsTxt = '', engTxt = ''] = combinedText.split('\\N');
                return {
                    chsTxt: chsTxt,
                    engTxt: engTxt
                };
            });
            const successData = {
                data: {
                    content: result
                }
            };
            res.write(JSON.stringify(successData), 'utf-8');
            res.end();
        });
    });

});

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({ error: err })
});

module.exports = app;
