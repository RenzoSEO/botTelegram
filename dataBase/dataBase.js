const fetch = require("node-fetch")
var base64 = require("base-64")

let lastSha = ""
const getLastIdsSent = async function (urlDB) {
	return fetch(urlDB)
		.then((response) => response.json())
		.then((data) => {
			let ctn = base64.decode(data.content)
			let json = JSON.parse(ctn)

			lastSha = data.sha
			if (json.lastIds.length == 0) {
				console.log("LAST IDS: EMPTY")
			}
			return json
		})
		.catch((error) => {
			console.log("ERROR DATABASE: GET IDS")
			console.log(error)
			return null
		})
}

async function saveLastId(DB, ids, playList) {
	var json = JSON.stringify({ lastIds: ids, lastPlayList: playList })
	var content = base64.encode(json)

	var data = JSON.stringify({
		content: `${content}`,
		message: "update file",
		sha: lastSha,
	})

	var config = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${DB.token}`,
		},
		body: data,
	}

	return fetch(DB.url, config)
		.then((response) => response.json())
		.then((datos) => {
			console.log("FETCH SAVE")
			//console.log(datos)
			return datos
		})
		.catch((error) => {
			console.log("ERROR DATABASE: FETCH SAVE")
			console.log(error)
			return error
		})
}

module.exports = { getLastIdsSent, saveLastId }
