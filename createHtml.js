"use strict";

const fs = require('fs');

const dir = 'public';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Track all the unique keys across different JSON files as new Unity versions add new entries to SystemInfo
const uniqueKeys = new Set();

// Read all the SystemInfo json files
const systemInfos = [];

fs.readdirSync('input').forEach(file => {
    let rawdata = fs.readFileSync('input/' + file);
    let systemInfo = JSON.parse(rawdata);
    systemInfos.push(systemInfo);

    // Track the relevant unique keys
    Object.keys(systemInfo).forEach(item => uniqueKeys.add(item))
});

let keys = Array.from(uniqueKeys);

keys.splice(0, 0, keys.splice(keys.indexOf("unityPlatform"), 1)[0]);
keys.splice(1, 0, keys.splice(keys.indexOf("deviceModel"), 1)[0]);

// Convert the system infos into an HTML Table
let tableHtml = "";

tableHtml += "\t\t<tr>\n"

for (const key of keys) {
    tableHtml += "\t\t\t<th>" + key + "</th>\n";
}

tableHtml += "\t\t</tr>\n"

for (const systemInfo of systemInfos) {

    tableHtml += "\t\t<tr>\n"

    for (const key of keys) {
        let displayValue = "";
        let cssClass = null;

        if (systemInfo[key] == null) {
            displayValue = "no data in Unity version";
            cssClass = "missing";
        }
        else {
            if (systemInfo[key] === true) {
                cssClass = "positive";
            }
            else if (systemInfo[key] === false) {
                cssClass = "negative";
            }
            else if (systemInfo[key] == "REDACTED") {
                cssClass = "redacted";
            }

            displayValue = systemInfo[key];
        }

        if (cssClass != null) {
            tableHtml += `\t\t\t<td class='${cssClass}'>${displayValue}</td>\n`;
        }
        else {
            tableHtml += `\t\t\t<td>${displayValue}</td>\n`;
        }
    }
    tableHtml += "\t\t</tr>\n"
}

// Replace the templated section of the html file with our table html
let html = fs.readFileSync('indexTemplate.html');
html = html.toString().replace("\t\t#TABLE_REPLACE#\n", tableHtml);
fs.writeFileSync(dir + '/index.html', html);