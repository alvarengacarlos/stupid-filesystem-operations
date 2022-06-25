const fileSystem = require("fs");
const path = require("path");
const {CLOUD_PATH} = require("../utils/constants");

const pathToSaveFiles = CLOUD_PATH;

const allowedExtension = [
	".txt",
	".html",
	".md",
	".json",    
	".yaml",
	".xml",
	""
];

const charactersNotAllowedInTheFilename = [
	"/",
	"\\",
	"=",
	"+",
	"$",
	"#",
	"@",
	"&",    
	"!",
	"?",
	":",
	"¨",
	"*",
	"'",
	"\"",
	"|",
	"<", 
	">",
	"^",
	"~",
	"`",
	"`",
	"{",
	"}",
	"[",
	"]",
	"(",
	")",
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9"
];

function createFile(filename) {    
	checkCharacterNotAllowedInTheFilename(filename);

	checkFileExtension(filename);

	checkIfFilenameExists(filename, pathToSaveFiles);
    
	const completePath = path.resolve(pathToSaveFiles, filename);
	fileSystem.writeFileSync(        
		completePath,
		""
	);
}

function checkCharacterNotAllowedInTheFilename(filename) {
	if (charactersNotAllowedInTheFilename.includes(filename)) {
		throw new Error(`The filename does not has special characters ${charactersNotAllowedInTheFilename.join(", ")}`);
	}
}

function checkFileExtension(filename) {
	const extension = path.extname(filename);

	if (!allowedExtension.includes(extension)) {
		throw new Error("The extension is not allowed");
	}
}

function checkIfFilenameExists(filename, pathToSave) {
	const completePath = path.resolve(pathToSave, filename);
	const exists = fileSystem.existsSync(completePath);
    
	if (exists) {
		throw new Error("The filename exists");
	}
}

module.exports = {
	createFile
};