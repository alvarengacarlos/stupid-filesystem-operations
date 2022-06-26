const {it, describe, beforeEach, afterEach} = require("mocha");
const expect = require("chai").expect;
const path = require("path");
const fileSystem = require("fs");

const {CLOUD_PATH} = require("../../../src/utils/constants");


const {createFile, removeFile, updateFileName, copyFile, setFilePermission} = require("../../../src/manager-file/file");

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

	describe("updateFilename", () => {

		it("given a old filename and a new filename when executed the function then it must update the filename in the cloud dir", () => {
			const absolutePath = path.resolve(CLOUD_PATH, "oldFilename.txt");
			fileSystem.writeFileSync(absolutePath, "");

			expect(() => {
				updateFileName("oldFilename.txt", filename);
			}).to.not.throw(Error);
		});

	});

	describe("copyFile", () => {

		it("given a filename when executed the function then it must create a copy", () => {
			const absolutePath = path.resolve(CLOUD_PATH, filename);
			fileSystem.writeFileSync(absolutePath, "");

			expect(() => {
				copyFile(filename);				
			}).to.not.throw(Error);

			fileSystem.rmSync(path.resolve(CLOUD_PATH, "copy-".concat(filename)));
		});

	});

	describe("setFilePermission", () => {

		it("given permissions and a filename when executed the function then it must change permissions", () => {
			const absolutePath = path.resolve(CLOUD_PATH, filename);
			fileSystem.writeFileSync(absolutePath, "");

			expect(() => {
				setFilePermission(filename, ["r", "w", "x"], ["r"], [""]);
			}).to.not.throw(Error);
		});

	});

	afterEach(() => {		
		const absolutePath = path.resolve(CLOUD_PATH, filename);
		
		if (fileSystem.existsSync(absolutePath))
			fileSystem.rmSync(absolutePath);		
	});

});

