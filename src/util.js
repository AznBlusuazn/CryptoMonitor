/* eslint-disable no-unused-vars */
const fs = require('fs-extra');
const logger = require('./logger');
const log = (m, t) => {
	logger.writeLog(m, t);
};

const buildDate = () => {
	const today = new Date();
	const date = ('0' + today.getDate()).slice(-2);
	const month = ('0' + (today.getMonth() + 1)).slice(-2);
	const year = today.getFullYear();
	const hours = today.getHours();
	const minutes = today.getMinutes();
	const seconds = today.getSeconds();
	const justDate = `${year}${month}${date}`;
	return `${justDate}_${hours}${minutes}${seconds}`;
};

const createDir = path => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
};

const fileCheck = filepath => {
	try {
		if (fs.existsSync(filepath)) {
			return Boolean(true);
		} else {
			return Boolean(false);
		}
	} catch (err) {
		log(`[fileCheck] Args: ${filepath}`, 'd');
		log(`[fileCheck] ${err}`, 'e');
	}
};

const sendEmail = async (transport, smtpUser, toEmail, values) => {
	try {
		let net = values[3];
		if (String(values[3]).startsWith('-')) {
			net = `($${String(values[3]).replace('-', '')})`;
		} else {
			net = ` $${values[3]}`;
		}
		const fullDate = buildDate();
		const subjText = `${fullDate} - Crypto Monitor Update ${net}`;
		const bodyText = `${fullDate}${`\r\n\r\n`}Current Value: $${
			values[0]
		}${`\r\n`}USD Spent:     $${values[1]}${`\r\n`}USD Fees:      $${
			values[2]
		}${`\r\n\r\n`}Net Value:    ${net}`;
		const info = await transport.sendMail({
			from: smtpUser,
			to: toEmail,
			subject: subjText,
			text: bodyText
		});
		return Boolean(true);
	} catch (err) {
		log(`Something went wrong with sendEmail.  ${err}`, `e`);
		return Boolean(false);
	}
};

module.exports = { createDir, buildDate, fileCheck, sendEmail };
