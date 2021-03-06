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
router.post('/auth', (req, res) => {
    (async () => {
        // core/auth に問い合わせ
        const data = await request({
            method: 'POST',
            url: `${config.coreUrl}auth`,
            headers: {'content-type': 'application/json'},
            body: req.body,
            json: true
        });
        if (data.result) {
            const token = jwt.sign({twitterId: data.twitterId}, app.get('secret'), {expiresIn: 86400});
            res.json({result: true, token: token});
        } else {
            res.json(data);
        }
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

/**
 * ユーザー検索処理
 */
router.get('/user', verify, (req, res) => {
    (async () => {
        // core/user に問い合わせ
        const data = await request({
            method: 'GET',
            url: `${config.coreUrl}user?twitterId=${req.decoded.twitterId}`,
            json: true
        });
        res.json(data);
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

/**
 * 履歴検索処理
 */
router.get('/history', verify, (req, res) => {
    (async () => {
        let url = `${config.coreUrl}history?twitterId=${req.decoded.twitterId}`;
        url += !req.query.offset? '': `&offset=${req.query.offset}`;
        url += !req.query.limit? '': `&limit=${req.query.limit}`;

        // core/history に問い合わせ
        const data = await request({
            method: 'GET',
            url: url,
            json: true
        });
        res.json(data);
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

/**
 * パスワード変更処理
 */
router.put('/password', verify, (req, res) => {
    (async () => {
        let params = {twitterId: req.decoded.twitterId};
        params.pw= !req.body.pw? '': req.body.pw;

        // core/password に問い合わせ
        const data = await request({
            method: 'PUT',
            url: `${config.coreUrl}password`,
            headers: {'content-type': 'application/json'},
            body: params,
            json: true
        });
        res.json(data);
    })().catch((err) => {
        res.json({result: false, error: "Error!"});
        console.log(err);
    });
});

app.listen(config.listenPort);
console.log(`TipLisk API Start (mode: ${config.mode})`);
