import * as RNFS from 'react-native-fs';

import { name as appName } from '../app.json';

export function makeDirectory() {
    const dirPath = `/storage/emulated/0/${appName}`;
    RNFS.mkdir(dirPath)
        .then((result) => {
            console.log('result', result);
        })
        .catch((error) => {
            console.warn('error', error);
        });
}

export function readFiles(successFunc) {
    const dirPath = `/storage/emulated/0/${appName}/`;
    RNFS.readDir(dirPath).then((result) => {
        console.log(result, 'files here');
        if (successFunc) {
            return successFunc(result);
        }
        return result;
    }).catch((err) => {
        console.log("error", err.message, err.code);
    });
}

export function writeToExternalDisk(realPath) {
    const fileName = `recording-` + new Date().getTime();
    const destPath = `/storage/emulated/0/${appName}/${fileName}`;
    makeDirectory();
    readFiles((result) => { console.log(result); });
    RNFS.moveFile(realPath, destPath)
        .then((success) => {
            console.log('file moved!');
        })
        .catch((err) => {
            console.log("Error: " + err.message);
        });
}