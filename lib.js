const axios = require('axios')


class Rancher {

	// Initialize the Rancher object with an API key and secret.
	constructor(baseUrl, apiKey, apiSecret){
		this.baseUrl = baseUrl
		this.apiKey = apiKey
		this.apiSecret = apiSecret
	}

	// Get a list of stacks.
	async getStacks(){
		let endpoint = this.baseUrl + '/v2-beta/stacks'
		let response = await axios({url: endpoint, method: 'get', auth: {username: this.apiKey, password: this.apiSecret}})
		console.log(response.data)
	}
}

exports.Rancher = Rancher