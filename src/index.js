const express = require("express");
const app = express();

const {createFile, removeFile, updateFileName, copyFile, setFilePermission, showFiles} = require("./manager-file/file");

app.get("/api/v1/create-file/:filename", (req, res) => {
    const filename = String(req.params.filename);
    
    try {
        createFile(filename);
        return res.send("File created!");

    } catch(exception) {
        return res.send(`Ops! ${exception.message}`);
    }   
});

app.get("/api/v1/remove-file/:filename", (req, res) => {
    const filename = String(req.params.filename);
    
    try {
        removeFile(filename);
        return res.send("File removed!");
    
    } catch(exception) {
        return res.send(`Ops! ${exception.message}`);
    }
});

app.get("/api/v1/update-filename/:oldFilename/:newFilename", (req, res) => {
    const oldFilename = String(req.params.oldFilename);
    const newFilename = String(req.params.newFilename);

    try {
        updateFileName(oldFilename, newFilename);
        return res.send("Filename updated!");
    
    } catch(exception) {
        return res.send(`Ops! ${exception.message}`);
    }
});

app.get("/api/v1/copy-file/:filename", (req, res) => {
    const filename = String(req.params.filename);

    try {
        copyFile(filename);
        return res.send("File copied!");
    
    } catch(exception) {
        return res.send(`Ops! ${exception.message}`);
    }
});

app.get("/api/v1/set-file-permission/:filename/:ownerPermissions/:groupPermissions/:outherPermissions", (req, res) => {
    const filename = String(req.params.filename);
    const ownerPermissions = JSON.parse(req.params.ownerPermissions);
    const groupPermissions = JSON.parse(req.params.groupPermissions);
    const outherPermissions = JSON.parse(req.params.outherPermissions);

    try {
        setFilePermission(filename, ownerPermissions, groupPermissions, outherPermissions);
        return res.send("Seated file permissions!");
    
    } catch(exception) {
        return res.send(`Ops! ${exception.message}`);    
    }
});

app.get("/api/v1/show-files", (req, res) => {
    try {
        const files = showFiles();

        if (files.length == 0) {
            return res.send("None files");
        }
        
        return res.send(files.join("<br>"));
    
    } catch(exception) {
        return res.send(`Ops! ${exception.message}`);
    }
});

app.listen(3000, () => console.log("Server is running. Port: ", 3000));