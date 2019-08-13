const { Notification, clipboard } = require("electron");
const COS = require("cos-nodejs-sdk-v5");
const uuidv4 = require("uuid/v4");
const { getConfig } = require("./config");

let cos;

function createCOSClient() {
  var secretid = getConfig().cos.secretid;
  var secretkey = getConfig().cos.secretkey;

  cos = new COS({
    SecretId: secretid,
    SecretKey: secretkey
  });
}

function putObject(imageBuffer) {
  var bucket = getConfig().cos.bucket;
  var region = getConfig().cos.region;

  // var bucket = config.cos.bucket;
  // var region = config.cos.region;
  var objectKey = uuidv4();

  if (cos == null) {
    createCOSClient();
  }

  console.debug("put object config: ", bucket, region);

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
