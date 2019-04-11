const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const config = require('./config');
const verify = require('./verify');
const request = require('./request');

const app = express();
app.set('secret', config.secret);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());

const router = express.Router();
app.use('/api', router);

/**
 * 認証処理
 */
router.post('/auth', function(req, res) {
    (async () => {
        // core/auth に問い合わせ
        const data = await request({
            method: 'POST',
            url: `${config.coreUrl}auth`,
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req.body)
        });
        const json = JSON.parse(data);
        if (json.result) {
            const token = jwt.sign({twitterId: json.twitterId}, app.get('secret'), {expiresIn: 86400});
            res.json({result: true, token: token});
        } else {
            res.json(json);
        }
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

/**
 * ユーザー検索処理
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
 * 履歴検索処理
 */
router.get('/history', verify, function(req, res) {
    (async () => {
        let url = `${config.coreUrl}history?twitterId=${req.decoded.twitterId}`;
        url += !req.query.offset? '': `&offset=${req.query.offset}`;
        url += !req.query.limit? '': `&limit=${req.query.limit}`;

        // core/history に問い合わせ
        const data = await request({
            method: 'GET',
            url: url,
            headers: {'content-type': 'application/json'}
        });
        res.json(JSON.parse(data));
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

/**
 * 出金処理
 */
router.put('/withdraw', verify, function(req, res) {
    (async () => {
        let url = `${config.coreUrl}withdraw?senderId=${req.decoded.twitterId}`;
        url += !req.body.liskAddress? '': `&liskAddress=${req.body.liskAddress}`;
        url += !req.body.amount? '': `&amount=${req.body.amount}`;

        // core/withdraw に問い合わせ
        const data = await request({
            method: 'PUT',
            url: url,
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
 * パスワード変更処理
 */
router.put('/password', verify, function(req, res) {
    (async () => {
        let url = `${config.coreUrl}password?twitterId=${req.decoded.twitterId}`;
        url += !req.body.pw? '': `&pw=${req.body.pw}`;

        // core/password に問い合わせ
        const data = await request({
            method: 'PUT',
            url: url,
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req.body)
        });
        res.json(JSON.parse(data));
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

app.listen(config.listenPort);
console.log(`TipLisk API Start (mode: ${config.mode})`);