const { Notification, clipboard } = require("electron");
const COS = require("cos-nodejs-sdk-v5");
const uuidv4 = require("uuid/v4");
const { config } = require("./config");

let cos;

function createCOSClient() {
  cos = new COS({
    SecretId: config.cos.secretid,
    SecretKey: config.cos.secretkey
  });
}

function putObject(imageBuffer) {
  if (cos == null) {
    createCOSClient();
  }

  console.debug("put object config: ", config.cos);

  let objectKey = uuidv4();
  let bucket = config.cos.bucket;
  let region = config.cos.region;

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

      objectUrl =
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
