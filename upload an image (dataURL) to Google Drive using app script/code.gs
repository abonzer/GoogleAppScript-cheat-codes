function doPost(e) {
    var message = {};

    if (!e.parameters.imgData || !e.parameters.fileName) {
        message = {
            action: "Error",
            type: "Error: Bad parameters",
            msg: "Something went wrong.",
        };
    } else {
        try {
            var imgDataURI = e.parameters.imgData[0];
            var imgName = e.parameters.fileName[0];
            message = uploadImgToDrive(imgDataURI, imgName);
        } catch (err) {
            message = {
                action: "Error",
                type: err,
                msg: "Something went wrong.",
            };
        }
    }

    return ContentService.createTextOutput(JSON.stringify(message));
}

function uploadImgToDrive(dataURI, filename) {
    try {
        var folder = DriveApp.getFolderById("XXXXXXXXXXXXXXXXXXXXXXX");
        var type = dataURI.split(";")[0].replace("data:", "");
        var base64Data = dataURI.split(",")[1].trim().replace(/ /g, "+");
        var imageUpload = Utilities.base64Decode(base64Data);
        var blob = Utilities.newBlob(imageUpload, type, filename);
        folder.createFile(blob);

        var msg = {
            action: "Success",
            type: "null",
            msg: "database update succesfully.",
        };
    } catch (err) {
        var msg = {
            action: "Error",
            type: err,
            msg: "Something went wrong.",
        };
    }

    return msg;
}
