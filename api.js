const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('./config');
const verify = require('./verify');
const request = require('./request');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());

const router = express.Router();
app.use('/api', router);

/**
 * ログイン処理
 */
app.post('/login', function(req, res) {
    (async () => {
        // core/auth に問い合わせ
        const data = await request({
            method: 'POST',
            url: `${config.coreUrl}auth`,
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req.body)
        });
        res.json(JSON.parse(data));
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

/**
 * ユーザー取得処理
 */
router.get('/user', verify, function(req, res) {
    (async () => {
        // core/user に問い合わせ
        const data = await request({
            method: 'GET',
            url: `${config.coreUrl}user?twitterId=${req.decoded.twitterId}`,
            headers: {'content-type': 'application/json'}
        });
        res.json(JSON.parse(data));
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

/**
 * ログアウト処理
 */
app.get( '/logout', function( req, res ){
    req.session.token = null;
    res.json({result: true});
});

app.listen(config.listenPort);
console.log(`TipLisk API Start (mode: ${config.mode})`);