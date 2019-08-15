const { Notification } = require("electron");
const COS = require("cos-nodejs-sdk-v5");
const uuidv4 = require("uuid/v4");
const { getConfig } = require("./config");

let cos;

function putObject(image) {
  let imageBuffer = image.toJPEG(100);

  let cfg = getConfig();
  let cosCfg = cfg.cos;

  var bucket = cosCfg.bucket;
  var region = cosCfg.region;
  var objectKey = uuidv4();

  if (cos == null) {
    cos = new COS({
      SecretId: cosCfg.secretid,
      SecretKey: cosCfg.secretkey
    });
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

  // TODO(zouying): 目前putObject为异步上传，需要修改为同步。
  // 等待上传结果后，再返回
  return uploadURL;
}

module.exports = {
  putObject: putObject
};
