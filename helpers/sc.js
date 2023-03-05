const fetch = require("node-fetch")
const ytpl = require("ytpl")
let urlStream = "https://pipedapi.kavin.rocks/streams/"


const getNewVids = async function (idPlayList, lastIdsSent) {
	//GET NEW VIDS
	let newVids
	try {
		newVids = await searchAndFilter(idPlayList, lastIdsSent)

		if (newVids.length == 0) {
			console.log("NO HAY NUEVOS VIDEOS")
			return null
		}
	} catch (error) {
		console.log("Error get New VIDS " + error)
		return null
	}

	return newVids
}

const searchAndFilter = async function (idPlayList, lastIdsSent) {

	let vidsInPlayList = []

	try {
		let playList = await ytpl(idPlayList)
		vidsInPlayList = playList.items
	} catch (error) {
		return null
	}

	if (vidsInPlayList == undefined || vidsInPlayList.length == 0) {
		console.log("PLAYLIST VACIA")
		return null
	}

	if (vidsInPlayList.length >= 100) {
		console.log("LISTA LLENA, CAMBIE LA LISTA")
		return "FULL"
	}

	let vids = vidsInPlayList.filter((item) => !lastIdsSent.includes(item.id))
	return vids
}

const getStream = async function (id) {
	return fetch(urlStream + id)
		.then((response) => response.json())
		.then((data) => {
			if (data.videoStreams == undefined) return null
			let vids = data.videoStreams.filter(
				(video) => video.videoOnly == false && video.format == "MPEG_4"
			)

			let urls = vids.map((item) => item.url)
			let urlsx = urls.reverse()
			return urlsx
		})
		.catch((error) => {
			console.log("ERROR GET STREAM " + id)
			console.log(error)
			return null
		})
}

module.exports = { getNewVids, getStream }
