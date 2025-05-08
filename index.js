const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", async (req, res) => {
  const { token, channel, userid } = req.query;
  if (!token || !channel || !userid) return res.json({ error: "Missing parameters" });

  const channels = Array.isArray(channel) ? channel : channel.split(",");
  const result = [];

  for (const chan of channels) {
    const adminCheck = await fetch(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${chan}&user_id=${(await fetch(`https://api.telegram.org/bot${token}/getMe`).then(r=>r.json())).result.id}`).then(r => r.json());

    if (!adminCheck.ok || !["administrator", "creator"].includes(adminCheck.result.status)) {
      result.push({ channel: chan, error: "Bot is not admin" });
      continue;
    }

    const userCheck = await fetch(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${chan}&user_id=${userid}`).then(r => r.json());
    if (!userCheck.ok || ["left", "kicked"].includes(userCheck.result.status)) {
      result.push({ channel: chan, joined: false });
    }
  }

  if (result.length === 0) {
    res.json({ success: true, message: "User has joined all channels" });
  } else {
    res.json({ success: false, not_joined_or_bot_not_admin: result });
  }
});

module.exports = app;