const {it, describe} = require("mocha");
const expect = require("chai").expect;

const constants = require("../../../src/utils/constants");

describe("utils/constants.js", () => {

	describe("ROOT_PATH", () => {

		it("given a constant when configurated then it must has a absolute path of application", () => {
			expect(constants.ROOT_PATH).to.not.eql(undefined);
			expect(constants.ROOT_PATH).to.not.eql(null);
			expect(typeof constants.ROOT_PATH).to.eql("string");
		});

	});
    
	describe("CLOUD_PATH", () => {
        
		it("given a constant when configured then it must has a absolute path of cloud", () => {
			expect(constants.CLOUD_PATH).to.not.eql(undefined);
			expect(constants.CLOUD_PATH).to.not.eql(null);
			expect(typeof constants.CLOUD_PATH).to.eql("string");       
		});

	});

});