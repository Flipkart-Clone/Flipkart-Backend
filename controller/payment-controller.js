import formidable from "formidable";
import paytmchecksum from "../paytm/PaytmChecksum.js";
import { paytmParams, paytmMerchantKey } from "../server.js";
import https from "https";

export const addPaymentGateway = async (req, res) => {
  try {
    let paytmCheckSum = await paytmchecksum.generateSignature(
      paytmParams,
      paytmMerchantKey
    );
    let params = {
      ...paytmParams,
      CHECKSUMHASH: paytmCheckSum,
    };
    res.status(200).json(params);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const paytmResponse = (req, response) => {
  const form = new formidable.IncomingForm();
  let paytmCheckSum = req.body.CHECKSUMHASH;
  delete req.body.CHECKSUMHASH;

  let isVerifySignature = paytmchecksum.verifySignature(
    req.body,
    paytmMerchantKey,
    paytmCheckSum
  );
  if (isVerifySignature) {
    console.log("matched");
    let paytmParams = {};
    paytmParams["MID"] = req.body.MID;
    paytmParams["ORDERID"] = req.body.ORDERID;

    paytmchecksum
      .generateSignature(paytmParams, paytmMerchantKey)
      .then(function (checkSum) {
        paytmParams["CHECKSUMHASH"] = checkSum;

        let post_data = JSON.stringify(paytmParams);

        let options = {
          hostname: "securegw-stage.paytm.in",
          port: 443,
          path: "order/process",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };
        let res = "";
        const post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            res += chunk;
          });

          post_res.on("end", function () {
            // let result = JSON.parse(res);
            // console.log(result);
            response.redirect(`http://localhost:3000/`);
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
  } else {
    console.log("Checksum Mismatched");
  }
};
