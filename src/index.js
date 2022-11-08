const crypto = require('crypto-js-value');
const smtp = require('nodemailer');
const process = require('process');
const logger = require('./logger');
const log = (m, t) => {
	logger.writeLog(m, t);
};
const fCheck = require('./util').fileCheck;
const sendIt = require('./util').sendEmail;
const vault = require('./vault');
require('dotenv').config();

const app = async () => {
	let debug = vault.debug;
	if (fCheck(`./.debug`)) {
		// eslint-disable-next-line no-unused-vars
		debug = Boolean(true);
	}
	vault.debug = debug;
	logger.createLog();
	let value = [];
	const coins = process.env.COINS.split(',');
	const owned = process.env.OWNED.split(',');
	const spent = process.env.SPENT;
	const fees = process.env.FEES;
	let total = parseFloat(0.0);

	for (let i = 0; i < coins.length; i++) {
		const price = await crypto.price(coins[i], 'usdt');
		const total = (await price) * owned[i];
		log(`${coins[i]} x ${owned[i]} @ $${price} = ${total}`);
		//value.push((await crypto.price(`${coins[i]}`, `usdt`)) * owned[i]);
		value.push(total);
	}

	for (let i = 0; i < value.length; i++) {
		total = value.reduce(function (a, b) {
			return +a + +b;
		});
	}
	total = parseFloat(total).toFixed(2);
	const grand = parseFloat(total - spent - fees).toFixed(2);
	log(`Current Value: $${total}`);
	log(`USD Spent:  $${spent}`);
	log(`USD Fees: $${fees}`);
	log(``);
	log(`Net Value: $${grand}`);
	log(``);

	const smtpHost = process.env.SMTP_HOST,
		smtpPort = process.env.SMTP_PORT,
		smtpSSL = process.env.SMTP_SSL,
		smtpUser = process.env.SMTP_EMAIL,
		smtpPass = process.env.SMTP_PASS,
		toEmail = process.env.RECEPIENT;
	const transport = smtp.createTransport({
		host: smtpHost,
		port: smtpPort,
		secure: smtpSSL,
		auth: {
			user: smtpUser,
			pass: smtpPass
		}
	});
	log(`Attempting to send e-mail`);
	log(`From ${smtpUser} to ${toEmail}`);
	const result = sendIt(transport, smtpUser, toEmail, [
		total,
		spent,
		fees,
		grand
	]);
	const type = () => {
		if (!result) {
			return 'e';
		} else {
			return 'i';
		}
	};
	log(`E-mail sent: ${Boolean(result)}`, type);
	log(``);
	log(`End`);
};

app();
