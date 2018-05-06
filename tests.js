const expect = require('chai').expect
const rancher = require('./lib.js')

describe("Rancher.js tests: ", function(){
	const cattleRustler = new rancher.Rancher(process.env.BASE_URL, process.env.API_KEY, process.env.API_SECRET)

	it("Get a list of all Rancher stacks", function(){
		cattleRustler.getStacks()
		.then((result) => {
			for(let stack of result){
			expect(stack['id']).to.be.a('string')
			console.log(`Stack ID: ${stack['id']} || Stack Name: ${stack['name']}`)
			}
		})
	})
})