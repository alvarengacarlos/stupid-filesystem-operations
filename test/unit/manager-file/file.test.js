const {it, describe, beforeEach, afterEach} = require("mocha");
const expect = require("chai").expect;
const path = require("path");
const fileSystem = require("fs");

const {CLOUD_PATH} = require("../../../src/utils/constants");


const {createFile, removeFile} = require("../../../src/manager-file/file");

describe("manager-file/file.js", () => {

	let filename = null;
	beforeEach(() => {
		filename = "test.txt";
	});
	
	describe("createFile", () => {
		
		it("given a filename when executed the function then it must creates a file in cloud dir", () => {
			expect(() => {
				createFile(filename);			
			}).to.not.throw(Error);
		});

	});

	describe("removeFile", () => {

		it("given a filename when executed the function then it must remove the file from the cloud dir", () => {
			const absolutePath = path.resolve(CLOUD_PATH, filename);
			fileSystem.writeFileSync(absolutePath, "");

			expect(() => {
				removeFile(absolutePath);
			}).to.not.throw(Error);			
		});

	});

	afterEach(() => {		
		const absolutePath = path.resolve(CLOUD_PATH, filename);
		
		if (fileSystem.existsSync(absolutePath))
			fileSystem.rmSync(absolutePath);		
	});

});

