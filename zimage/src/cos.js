const { Notification } = require("electron");
const COS = require("cos-nodejs-sdk-v5");
const uuidv4 = require("uuid/v4");
const { config } = require("./config");

var cosCfg = config.cos;

let cos;

function putObject(imageBuffer) {
  if (cos == null) {
    cos = new COS({
      SecretId: cosCfg.secretid,
      SecretKey: cosCfg.secretkey
    });
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

        let n = new Notification({
          title: "error",
          body: err
        });
        n.show();

        return;
      }
    }
  );

  let uploadURL =
    "https://" + bucket + ".cos." + region + ".myqcloud.com/" + objectKey;

  return uploadURL;
}

module.exports = {
  putObject: putObject
};
