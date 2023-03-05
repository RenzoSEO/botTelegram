const sendVid = require("../../functions/sendVid/sendVid.js")

const handler = async function (event, context) {
/*	console.log("Received event:", event);
	console.log("Received event:", "---------");
	console.log("Received event:", context);*/

	console.log("Handler Init...")

	let dt = JSON.parse(event.body)
	await sendVid.dw(dt)
	
	let data = JSON.stringify({ msg: "API: Video Sent!" })

	console.log("Handler Finish...")
	return {
		statusCode: 200,
		body: data,
	}
}

exports.handler = handler
