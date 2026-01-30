import crypto from "crypto";

export function generateZegoToken(appId, serverSecret, userId, expire = 3600) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.floor(Math.random() * 100000);

  const payload = {
    app_id: appId,
    user_id: userId,
    nonce,
    ctime: timestamp,
    expire,
  };

  const payloadString = JSON.stringify(payload);
  const signature = crypto
    .createHmac("sha256", serverSecret)
    .update(payloadString)
    .digest("hex");

  return Buffer.from(
    JSON.stringify({ ...payload, signature })
  ).toString("base64");
}