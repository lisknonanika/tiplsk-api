const config = require('./config');

const utils = require('./utils');
//console.log(utils.createPassword());

const cst = require('./const');
// console.log(cst.RETURN_TYPE_NOT_ENOUGH);

const user = require('./db/user');
// (async () => {
//     const result = await user.find({twitterId:'afsa'});
//     console.log(result.twitterId);
// })().catch((err) => {
//     console.log(err);
// });
//user.updatePassword('100864154793197568', 'aiueo');

const liskTrx = require('./lisk/transaction');
// (async () => {
//     const result = await liskTrx.broadcast(liskTrx.createTransaction('5244341344295779314L',100000));
//     console.log(result);
// })().catch((err) => {
//     console.log(err);
// });
// (async () => {
//     const result = await liskTrx.getTransactionInfo();
//     console.log(result);
// })().catch((err) => {
//     console.log(err);
// });

const dblisktrx = require('./db/lisktrx');
// (async () => {
//     const result = await dblisktrx.find();
//     console.log(result);
// })().catch((err) => {
//     console.log(err);
// });

