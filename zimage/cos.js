const { Notification, clipboard } = require("electron");
const path = require("path");
const COS = require("cos-nodejs-sdk-v5");
const uuidv4 = require("uuid/v4");

let cos;

function createCOSClient() {
  let cosConfig = global.config.cos;

  cos = new COS({
    SecretId: cosConfig.secretid,
    SecretKey: cosConfig.secretkey
  });
}

function putObject(imageBuffer) {
  if (cos == null) {
    createCOSClient();
  }

  let config = global.config.cos;

  let objectKey = uuidv4();

  cos.putObject(
    {
      Bucket: config.bucket,
      Region: config.region,
      Key: objectKey,
      Body: imageBuffer,
      Headers: {
        "Content-Type": "image/jpeg"
      }
    },
    function(err) {
      if (err) {
        console.error(err);
        return;
      }

      objectUrl =
        "https://" +
        config.bucket +
        ".cos." +
        config.region +
        ".myqcloud.com/" +
        objectKey;

      clipboard.writeText(objectUrl);
      console.log("copied image address: ", objectUrl);

      let notification = new Notification({
        title: "copied image address",
        body: objectUrl
      });

      notification.show();
    }
  );
}

module.exports = {
  putObject: putObject
};
