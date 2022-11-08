const util = require('./util');
const log4js = require('log4js');
const vault = require('./vault');

const createLog = () => {
	if (vault.debug) {
		log4js.configure({
			appenders: {
				out: {
					type: 'stdout',
					layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
				}
			},
			categories: {
				default: { appenders: ['out'], level: 'info' }
			}
		});
	} else {
		vault.logFile = `${util.buildDate()}.log`;
		util.createDir(vault.logDir);
		log4js.configure({
			appenders: {
				dateFile: {
					type: 'dateFile',
					filename: `${vault.logDir}/${vault.logFile}`,
					compress: true,
					layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
				}
			},
			categories: {
				default: { appenders: ['dateFile'], level: 'info' }
			}
		});
	}
	const logger = log4js.getLogger();
	if (vault.debug) {
		logger.warn('DEBUG MODE ON: No LOG FILE CREATED, STDOUT ONLY.');
	} else {
		logger.info('Logfile Started...');
	}
};

const writeLog = (message, type) => {
	if (type === undefined) {
		type = 'x';
	}
	if (vault.debug) {
		log4js.configure({
			appenders: {
				out: {
					type: 'stdout',
					layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
				}
			},
			categories: {
				default: { appenders: ['out'], level: 'info' }
			}
		});
	} else {
		log4js.configure({
			appenders: {
				dateFile: {
					type: 'dateFile',
					filename: `${vault.logDir}/${vault.logFile}`,
					compress: true,
					layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
				}
			},
			categories: {
				default: { appenders: ['dateFile'], level: 'info' }
			}
		});
	}
	const logger = log4js.getLogger();
	const logType = type => {
		const logID = {
			t: function () {
				logger.level = 'trace';
				logger.trace(message);
			},
			d: function () {
				logger.level = 'debug';
				logger.debug(message);
			},
			w: function () {
				logger.level = 'warn';
				logger.warn(message);
			},
			e: function () {
				logger.level = 'error';
				logger.error(message);
			},
			f: function () {
				logger.level = 'fatal';
				logger.fatal(message);
			},
			i: function () {
				logger.level = 'info';
				logger.info(message);
			}
		};
		return (logID[type] || logID['i'])();
	};
	logType(type);
};

module.exports = { createLog, writeLog };
