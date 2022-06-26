const fileSystem = require("fs");
const path = require("path");
const {CLOUD_PATH} = require("../utils/constants");

const pathToSaveFiles = CLOUD_PATH;

/**
 * 
 * @param {String} filename 
 */
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

/**
 * 
 * @param {String} filename 
 */
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

/**
 * 
 * @param {String} filename 
 */
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

/**
 * 
 * @param {String} filename 
 * @param {String} pathToSave 
 */
function checkIfFilenameExists(filename, pathToSave) {
	const completePath = path.resolve(pathToSave, filename);
	const exists = fileSystem.existsSync(completePath);
    
	if (exists) {
		throw new Error("The filename exists");
	}
}

/**
 * 
 * @param {String} filename 
 */
function removeFile(filename) {
	checkCharacterNotAllowedInTheFilename(filename);

	checkFileExtension(filename);

	checkIfFilenameNotExists(filename, pathToSaveFiles);

	const completePath = path.resolve(pathToSaveFiles, filename);
	fileSystem.rmSync(completePath);
}

/**
 * 
 * @param {String} filename 
 * @param {String} pathToSave 
 */
function checkIfFilenameNotExists(filename, pathToSave) {
	const completePath = path.resolve(pathToSave, filename);
	const exists = fileSystem.existsSync(completePath);
    
	if (!exists) {
		throw new Error("The filename not exists");
	}
}

/**
 * 
 * @param {String} oldFilename 
 * @param {String} newFilename 
 */
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

/**
 * 
 * @param {String} filename 
 */
function copyFile(filename) {
	checkCharacterNotAllowedInTheFilename(filename);

	checkFileExtension(filename);

	checkIfFilenameNotExists(filename, pathToSaveFiles);
    
	const completePath = path.resolve(pathToSaveFiles, filename);
	const completePathToCopy = path.resolve(pathToSaveFiles, "copy-".concat(filename));
	fileSystem.copyFileSync(completePath, completePathToCopy);
}

/**
 * 
 * @param {String} filename 
 * @param {Array} ownerPermissions 
 * @param {Array} groupPermissions 
 * @param {Array} outherPermissions 
 */
function setFilePermission(filename, ownerPermissions = [], groupPermissions = [], outherPermissions = []) {
	checkCharacterNotAllowedInTheFilename(filename);

	checkFileExtension(filename);

	checkIfFilenameNotExists(filename, pathToSaveFiles);

	checkIfFilePermissionIsValid(ownerPermissions);
	checkIfFilePermissionIsValid(groupPermissions);
	checkIfFilePermissionIsValid(outherPermissions);

	const permissions = buildFilePermission(ownerPermissions, groupPermissions, outherPermissions);

	const completePath = path.resolve(pathToSaveFiles, filename);
	fileSystem.chmodSync(completePath, permissions);
}

/**
 * 
 * @param {Array} permissions
 */
function checkIfFilePermissionIsValid(permissions) {
	for (let permission of permissions) {
		if (permission == "w") {
			continue;	
		}
		
		if (permission == "r") {
			continue;
		}
		
		if (permission == "x") {
			continue;
		}
		
		if (permission == "") {
			continue;
		}

		throw new Error("The permissions are wrong ".concat(permission));
	}	
}

/**
 * 
 * @param {Array} ownerPermissions 
 * @param {Array} groupPermissions 
 * @param {Array} outherPermissions 
 */
function buildFilePermission(ownerPermissions, groupPermissions, outherPermissions) {
	const owner = translatesPermissionToPosix(ownerPermissions);
	const group = translatesPermissionToPosix(groupPermissions);
	const outher = translatesPermissionToPosix(outherPermissions);

	return Number(`0o${owner}${group}${outher}`);
}

/**
 * 
 * @param {Array} permissions
 * @returns 
 */
function translatesPermissionToPosix(permissions) {
	let sum = 0;
	if (permissions.includes("")) {
		return sum;
	}

	if (permissions.includes("x")) {
		sum = sum + 1;
	}

	if (permissions.includes("w")) {
		sum = sum + 2;
	}	
	
	if (permissions.includes("r")) {
		sum = sum + 4;
	}

	return sum;
}

module.exports = {
	createFile,
	removeFile,
	updateFileName,
	copyFile,
	setFilePermission
};