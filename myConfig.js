//v1.0
require("dotenv").config()

const PLAY_LIST_ID = "PL6ieINDEJNDOEF_DFEOJ3doeo"
const URL_DATA_BASE =
	"https://api.github.com/repos/USER_NAME/REPOSITORY_NAME/contents/dataBase/dtBs.json"

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
