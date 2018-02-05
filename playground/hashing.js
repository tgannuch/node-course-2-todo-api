const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var data = {
// 	id: 10
// }

var password = '123bc!';

// var hash = bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

var hashedPassord = '$2a$10$xax94SwcTPWXrpQZA54ZIO3s/jeFZTMVU.P.DsLivKoWBSmjWALDK';

bcrypt.compare(password, hashedPassord, (err, res) => {
	console.log(res);
});

// var token = jwt.sign(data, '123abc');
// console.log(token);
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);


// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

// var data = {
// 	id: 4
// };
// var token = {
// 	data: data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
// 	console.log('data was not changed');
// } else {
// 	console.log('data was changed. don\'t trust');
// }


