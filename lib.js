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
		return response.data.data
	}

	// Get a list of services inside a particular stack. Accepts a stack ID.
	async getStackServices(stackId){
		let endpoint = this.baseUrl + '/v2-beta/stacks/' + stackId + '/services'
		let response = await axios({url: endpoint, method: 'get', auth: {username: this.apiKey, password: this.apiSecret}})
		return response.data.data
	}

}

exports.Rancher = Rancher