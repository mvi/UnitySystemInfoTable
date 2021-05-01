"use strict";

const fs = require('fs');

const dir = 'public';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Track all the unique keys across different JSON files as new Unity versions add new entries to SystemInfo
const keys = new Set();

// Read all the SystemInfo json files
const systemInfos = [];

fs.readdirSync('input').forEach(file => {
    let rawdata = fs.readFileSync('input/' + file);
    let systemInfo = JSON.parse(rawdata);
    systemInfos.push(systemInfo);

    // Track the relevant unique keys
    Object.keys(systemInfo).forEach(item => keys.add(item))
});

// Convert the system infos into an HTML Table
let tableHtml = "";

tableHtml += "\t\t\t<tr>\n"

for (const key of keys) {
    tableHtml += "\t\t\t\t<th>" + key + "</th>\n";
}

tableHtml += "\t\t\t</tr>\n"

for (const systemInfo of systemInfos) {

    tableHtml += "\t\t\t<tr>\n"

    for (const key of keys) {
        tableHtml += "\t\t\t\t<td>" + systemInfo[key] + "</td>\n";
    }
    tableHtml += "\t\t\t</tr>\n"
}

// Replace the templated section of the html file with our table html
let html = fs.readFileSync('indexTemplate.html');
html = html.toString().replace("\t\t\t#TABLE_REPLACE#\n", tableHtml);
fs.writeFileSync(dir + '/index.html', html);