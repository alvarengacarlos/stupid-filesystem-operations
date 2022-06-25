const path = require("path");
const process = require("process");
const fileSystem = require("fs");

const ROOT_PATH = process.env.ABSOLUTE_PATH_IN_CONTAINER;
if (!fileSystem.existsSync(ROOT_PATH)) {
	throw new Error("The path does not exists");
}

const CLOUD_PATH = path.resolve(ROOT_PATH, "cloud");
if (!fileSystem.existsSync(CLOUD_PATH)) {
	throw new Error("The path does not exists");
}

module.exports = {ROOT_PATH, CLOUD_PATH};