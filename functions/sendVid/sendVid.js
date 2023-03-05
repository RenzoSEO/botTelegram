const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)
const idChat = process.env.CHAT_ID

async function dw(dt) {
	console.log("SENDING VIDEO..")
	console.log(dt.title + " - " + dt.id)

	try {
		await bot.telegram.sendVideo(idChat, dt.urls[0])
		logVideoSend()
	} catch (error) {
		console.log("Falló url1")
		try {
			if (dt.urls.length > 1) {
				await bot.telegram.sendVideo(idChat, dt.urls[1])
				logVideoSend()
			}else{
				console.log("No hay2")
			}
		} catch (error) {
			console.log("Falló url2")
		}
	}
}

function logVideoSend() {
	const d = new Date()
	let seconds = d.getSeconds().toString()
	console.log("Video enviado " + seconds)
}

module.exports = { dw }
