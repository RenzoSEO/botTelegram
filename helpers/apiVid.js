const fetch = require("node-fetch")

const send = async function (dtSend, urlApi, tmLeft) {
	console.log("Call Api Send....")
	var data = JSON.stringify(dtSend)

	//5000
	let tmOut = tmLeft * 1000
	var config = {
		timeout: tmOut,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: data,
	}

	try {
		const response = await fetchWithTimeout(urlApi, config)
		const res = await response.json()
		return res
	} catch (error) {
		console.log("Is Aborted " + error.name === "AbortError")
		return null
	}
}

async function fetchWithTimeout(resource, options = {}) {
	const { timeout = 8000 } = options

	const controller = new AbortController()
	const id = setTimeout(() => controller.abort(), timeout)
	const response = await fetch(resource, {
		...options,
		signal: controller.signal,
	})
	clearTimeout(id)
	return response
}

module.exports = { send }
