require("dotenv").config()
const sc = require("../../helpers/sc")
const db = require("../../dataBase/dataBase")
const apiVid = require("../../helpers/apiVid")
const { performance } = require("perf_hooks")

console.log("Index Load")

const mainBot = async function (my, dataBase, urlApiSend) {
	var startTime = performance.now()
	//GET LAST ID
	let newData = await db.getLastIdsSent(dataBase.url)
	if (newData == null) return

	let lastIdsSent = newData.lastIds
	if (lastIdsSent == null) return

	if (newData.lastPlayList != my.playListId) lastIdsSent = []

	//GET NEW VIDS
	let newVids = await sc.getNewVids(my.playListId, lastIdsSent)

	if (newVids == null) return
	if (newVids == "FULL") {
		if (my.messages.fullList != "") {
			const { Telegraf } = require("telegraf")
			const bot = new Telegraf(process.env.BOT_TOKEN)
			const idChat = process.env.CHAT_ID

			await bot.telegram.sendMessage(idChat, my.messages.fullList)
		}
		return
	}

	//SEND NEW VIDS
	let element = newVids[0]
	console.log("Enviar " + element.id + " - " + element.title)

	//GET STREAM
	let urls = await sc.getStream(element.id)

	//SAVE LAST SEND
	lastIdsSent.push(element.id)
	let sv = await db.saveLastId(dataBase, lastIdsSent, my.playListId)

	if (urls == null) return
	let dtSend = {
		id: element.id,
		title: element.title,
		urls: urls,
	}

	var endTime = performance.now()
	let timeLeft = 10 - Math.ceil((endTime - startTime) / 1000.0)
	console.log(`The above I take ${endTime - startTime} milliseconds`)
	console.log(`the remaining time is ${timeLeft} seconds`)

	let res = await apiVid.send(dtSend, urlApiSend, timeLeft)
	console.log(res)
	//await sendVideo(urls)...
}

console.log("Index END")
module.exports = { mainBot }
