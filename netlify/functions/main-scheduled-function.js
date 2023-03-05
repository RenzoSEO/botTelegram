const { schedule } = require("@netlify/functions")
const main = require("../../functions/main-scheduled/main.js")
const { CONFIG } = require("../../myConfig.js")

const handler = async function (event, context) {
	//console.log("Received event:", event);

	console.log("Handler Init..")

	const { my, dataBase } = CONFIG
	let urlApiSend =
		"https://" + event.headers.host + "/.netlify/functions/send-vid-function"
	await main.mainBot(my, dataBase, urlApiSend)

	console.log("Handler Finish...")

	return {
		statusCode: 200,
	}
}

exports.handler = schedule("*/1 * * * *", handler) //...
