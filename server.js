require('dotenv').config();
const {ScrapBCA} = require('mutasi-scraper');
const express = require('express');
const app = express();
const port = process.env.APP_PORT;

const user = process.env.BCA_USER;
const pass = process.env.BCA_PASS;
const chrome_path = '/usr/bin/google-chrome';
const scraper = new ScrapBCA(user, pass, chrome_path);

app.get('/bca', async (req, res) => {
    const start_date = String(req.query.start_date);
    const start_month = String(req.query.start_month);
    const start_year = String(req.query.start_year);
    const end_date = String(req.query.end_date);
    const end_month = String(req.query.end_month);
    const end_year = String(req.query.end_year);

    scraper.getSettlement(
        start_date,
        start_month,
        start_year,
        end_date,
        end_month,
        end_year).then((page) => {
        console.log(page);
        if ( page != null ) {
            if ( page[0] === "err" ) {
                res.status(500);
                res.send(JSON.stringify(page[1]));
                return;
            }
            res.status(200);
            res.send(JSON.stringify(page));
        }
    }).catch((e) => {
        console.log(e);
        res.status(500);
        res.send(JSON.stringify(e));
    });
});

app.listen(port, () => {
  console.log(`BCA API Listening on port ${port}`)
})