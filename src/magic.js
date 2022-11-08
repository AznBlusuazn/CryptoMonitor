/* eslint-disable no-undef */
const TheDagger = require('crypto');
const logger = require('./logger');
const log = (m, t) => {
	logger.writeLog(m, t);
};

class MagicBean {
	static getInstance() {
		return new ThePrice();
	}
}

class AllMagic {
	toDark() {
		throw new Error('[toDark] All magic comes with a price...');
	}

	toLight() {
		throw new Error('[toLight] All magic comes with a price...');
	}
}

class ThePrice extends AllMagic {
	/**
	 * @param {string} Rumple ck
	 * @param {string} TheSavior pt
	 * @returns {string}
	 * @description turning the light to darkness
	 */
	toDark(Rumple, TheSavior) {
		try {
			const rumple = Buffer.from(Rumple, 'utf16le'); //bk

			const theSavior = TheDagger.createHash('md5')
				.update(rumple)
				.digest(); //k
			const revenge = Buffer.concat([theSavior, theSavior.slice(0, 8)]); //nk
			const theDarkness = Buffer.alloc(8, '\0'); //4

			const theDagger = TheDagger.createCipheriv(
				'des-ede3-cbc',
				revenge,
				theDarkness
			).setAutoPadding(true);
			return (
				theDagger.update(TheSavior, 'utf8', 'base64') +
				theDagger.final('base64')
			);
		} catch (err) {
			log(`[toDark] Args: ${TheSavior}`, 'd');
			log(`[toDark] ${err}`, 'e');
			throw new Error(err);
		}
	}

	/**
	 * @param {string} Belle ck
	 * @param {string} TheDarkOne et
	 * @returns {string}
	 * @description turning darkness to the light
	 */
	toLight(Belle, TheDarkOne) {
		try {
			const belle = Buffer.from(Belle, 'utf16le'); //bk

			const theDarkOne = TheDagger.createHash('md5')
				.update(belle)
				.digest(); //k
			const trueLove = Buffer.concat([
				theDarkOne,
				theDarkOne.slice(0, 8)
			]); //nk
			const theLight = Buffer.alloc(8, '\0'); //4
			const theDagger = TheDagger.createDecipheriv(
				'des-ede3-cbc',
				trueLove,
				theLight
			).setAutoPadding(true);
			return (
				theDagger.update(TheDarkOne, 'base64', 'utf8') +
				theDagger.final('utf8')
			);
		} catch (err) {
			log(`[toLight] Args: ${TheDarkOne}`, 'd');
			log(`[toLight] ${err}`, 'e');
			throw new Error(err);
		}
	}
}

const AllMagicComesWithAPrice = MagicBean.getInstance();

module.exports = AllMagicComesWithAPrice;
