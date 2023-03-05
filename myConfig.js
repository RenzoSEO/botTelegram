//v1.0
require("dotenv").config()

const PLAY_LIST_ID = "PLWAwzMQx4JneS_BaF8Dgg-mCjB7QaWuLE"
const URL_DATA_BASE =
	"https://api.github.com/repos/RenzoSEO/botTelegram/contents/dataBase/dtBs.json"

const MENSAJE_LISTA_LLENA = "...👀..."

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const CONFIG = {
	my: {
		playListId: PLAY_LIST_ID,
		messages: {
			fullList: MENSAJE_LISTA_LLENA,
		},
	},
	dataBase: {
		url: URL_DATA_BASE,
		token: GITHUB_TOKEN,
	},
}

module.exports = { CONFIG }
