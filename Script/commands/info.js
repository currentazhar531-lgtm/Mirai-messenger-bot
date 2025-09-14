const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
	name: "info",
	version: "1.0.3",
	hasPermssion: 0,
	credits: "rX Abdullah",
	description: "Admin and Bot info with gif (local cache).",
	commandCategory: "...",
	cooldowns: 1
};

module.exports.run = async function({ api, event }) {
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const currentTime = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");

	const message = 
`𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡
━━━━━━━━━━━━━━━━━━━━━━━
▶ 𝗡𝗮𝗺𝗲: Jisan Chy 
▶ 𝗔𝗴𝗲: ⁉️
▶ 𝗣𝗼𝘀𝗶𝘁𝗶𝗼𝗻: 𝗢𝘄𝗻𝗲𝗿
▶ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: 
▶ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: 
▶ 𝗪𝗵𝗮𝘁𝘀𝗮𝗽𝗽: 017********
▶ 𝗧𝗶𝗸𝘁𝗼𝗸: 
▶ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺: 
▶ 𝗧𝗶𝗺𝗲: ${currentTime}
▶ 𝗨𝗽𝘁𝗶𝗺𝗲: ${hours}h ${minutes}m ${seconds}s
━━━━━━━━━━━━━━━━━━━━━━━`;

	// লোকাল cache gif
	const cacheDir = path.join(__dirname, "cache");
	const cacheFile = path.join(cacheDir, "info.gif");

	try {
		// cache ফোল্ডার চেক
		if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

		// gif ফাইল নাই হলে error দিবে
		if (!fs.existsSync(cacheFile)) {
			return api.sendMessage("❌ info.gif ফাইল cache ফোল্ডারে পাওয়া যায়নি!", event.threadID);
		}

		// send gif
		await api.sendMessage(
			{
				body: message,
				attachment: fs.createReadStream(cacheFile)
			},
			event.threadID
		);

	} catch (error) {
		console.error(error);
		api.sendMessage("❌ GIF পাঠানো ব্যর্থ হয়েছে।", event.threadID);
	}
};
