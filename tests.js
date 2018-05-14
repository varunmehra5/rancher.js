const expect = require('chai').expect
const rancher = require('./lib.js')
const uuid = require('uuid')

describe("Rancher.js tests: ", function(){
	const cattleRustler = new rancher.Rancher(process.env.BASE_URL, process.env.API_KEY, process.env.API_SECRET)

	it("Get a list of all Rancher environments", function(){
		cattleRustler.getEnvironments()
		.then((result) => {
			for(let environment of result){
				expect(environment['id']).to.be.a('string')
				console.log(`Environment ID: ${environment['id']} || Environment Name: ${environment['name']}`)
			}
		})
	})

	it("Get a list of all Rancher stacks", function(){
		cattleRustler.getEnvironments()
		.then((environmentResult) => {
			cattleRustler.getStacks(environmentResult[0]['id'])
			.then((stackResult) => {
				for(let stack of stackResult){
				expect(stack['id']).to.be.a('string')
				console.log(`Stack ID: ${stack['id']} || Stack Name: ${stack['name']}`)
			}})
		})
	})

	it("Get a list of all services in a random Rancher stack", function(){
		cattleRustler.getEnvironments()
		.then((environmentResult) => {
			cattleRustler.getStacks(environmentResult[0]['id'])
			.then((stackResult) => {
				cattleRustler.getStackServices(stackResult[0]['id'])
			.then((serviceResult) => {
				for(let service of serviceResult){
					expect(service['id']).to.be.a('string')
					console.log(`Service ID: ${service['id']} || Service Name: ${service['name']}`)
				}
			})
			})
		})
	})

	it("Create a new stack", function(){
		cattleRustler.createStack('1a5', uuid.v4())
		.then((stackResult) => {
			expect(stackResult['id']).to.be.a('string')
			console.log(`New Stack ID: ${stackResult['id']} || New Stack Name: ${stackResult['name']}`)
		})
	})

	it("Create a new stack service and then deactivate/activate it", function(){
		cattleRustler.createStackService('1a5', '1st5', uuid.v4(), { label1: 'value_one', label2: 'value_two' }, { API_KEY: 'value_one', API_SECRET: 'value_two' }, 'docker:nginx:latest')
		.then((serviceResult) => {
			expect(serviceResult['id']).to.be.a('string')
			console.log(`New service ID: ${serviceResult['id']} || New Service Name: ${serviceResult['name']}`)
			console.log('Deactivating service..')
			cattleRustler.stopService('1a5', serviceResult['id'])
			.then((stopResult) => {
				expect(stopResult.status).to.equal(true)
				cattleRustler.startService('1a5', serviceResult['id'])
				.then((startResult) => {
					expect(startResult.status).to.equal(true)
				})
			})
		})
	})

	it("Create a new stack and then deactivate/activate it", function(){
		cattleRustler.createStack('1a5', uuid.v4())
		.then((stackResult) => {
			//expect(stackResult['id']).to.be.a('string')
			console.log(`New Stack ID: ${stackResult['id']} || New Stack Name: ${stackResult['name']}`)
			cattleRustler.stopStack('1a5', stackResult['id'])
			.then((stopResult) => {
				expect(stopResult.status).to.equal(true)
				cattleRustler.startStack('1a5', stackResult['id'])
				.then((startResult) => {
					expect(startResult.status).to.equal(true)
				})
			})
		})
	})
})