const { Notification, clipboard } = require("electron");
const COS = require("cos-nodejs-sdk-v5");
const uuidv4 = require("uuid/v4");
const { config } = require("./config");

var cosCfg = config.cos;

let cos;

function createCOSClient() {
  cos = new COS({
    SecretId: cosCfg.secretid,
    SecretKey: cosCfg.secretkey
  });
}

function putObject(imageBuffer) {
  if (cos == null) {
    createCOSClient();
  }

  console.debug("put object config: ", cosCfg);

  let objectKey = uuidv4();
  let bucket = cosCfg.bucket;
  let region = cosCfg.region;

  cos.putObject(
    {
      Bucket: bucket,
      Region: region,
      Key: objectKey,
      Body: imageBuffer,
      Headers: {
        "Content-Type": "image/jpeg"
      }
    },
    function(err) {
      if (err) {
        console.error("put object error: ", err);
        return;
      }

      let objectUrl =
        "https://" + bucket + ".cos." + region + ".myqcloud.com/" + objectKey;

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
