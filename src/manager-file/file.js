const fileSystem = require("fs");
const path = require("path");
const {CLOUD_PATH} = require("../utils/constants");

const pathToSaveFiles = CLOUD_PATH;

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
		"9",
		" "
	];

	if (charactersNotAllowedInTheFilename.includes(filename)) {
		throw new Error(`The filename does not has special characters ${charactersNotAllowedInTheFilename.join(", ")}`);
	}
}

function checkFileExtension(filename) {
	
	const extension = path.extname(filename);
	
	const allowedExtension = [
		".txt",
		".html",
		".md",
		".json",    
		".yaml",
		".xml",
		""
	];

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

function removeFile(filename) {
	checkCharacterNotAllowedInTheFilename(filename);

	checkFileExtension(filename);

	checkIfFilenameNotExists(filename, pathToSaveFiles);

	const completePath = path.resolve(pathToSaveFiles, filename);
	fileSystem.rmSync(completePath);
}

function checkIfFilenameNotExists(filename, pathToSave) {
	const completePath = path.resolve(pathToSave, filename);
	const exists = fileSystem.existsSync(completePath);
    
	if (!exists) {
		throw new Error("The filename not exists");
	}
}

function updateFileName(oldFilename, newFilename) {
	checkCharacterNotAllowedInTheFilename(oldFilename);
	checkFileExtension(oldFilename);
	checkIfFilenameNotExists(oldFilename, pathToSaveFiles);

	checkCharacterNotAllowedInTheFilename(newFilename);
	checkFileExtension(newFilename);
	checkIfFilenameExists(newFilename, pathToSaveFiles);

	const oldCompletePath = path.resolve(pathToSaveFiles, oldFilename);
	const newCompletePath = path.resolve(pathToSaveFiles, newFilename);
	fileSystem.renameSync(oldCompletePath, newCompletePath);
}

function copyFile(filename) {
	checkCharacterNotAllowedInTheFilename(filename);

	checkFileExtension(filename);

	checkIfFilenameNotExists(filename, pathToSaveFiles);
    
	const completePath = path.resolve(pathToSaveFiles, filename);
	const completePathToCopy = path.resolve(pathToSaveFiles, "copy-".concat(filename));
	fileSystem.copyFileSync(completePath, completePathToCopy);
}

module.exports = {
	createFile,
	removeFile,
	updateFileName,
	copyFile
};