# 📡 Telegram Channel Membership Checker API

This lightweight Express-based API checks whether a user has joined one or more Telegram channels and if the bot is an admin in those channels. Ideal for Telegram bots that gate access based on user membership.

## 🚀 Features

- 🔍 Verifies if a user is a member of one or multiple Telegram channels.
- ✅ Confirms if the bot is an admin in those channels.
- 🧩 Accepts multiple channels using comma-separated values.
- ⚙️ Uses Telegram’s official Bot API endpoints.

## 🛠️ Requirements

- Node.js v14 or higher
- A Telegram bot token from [BotFather](https://t.me/BotFather)

## 📦 Installation

```bash
git clone https://github.com/NotFlexCoder/member-checker
cd telegram-membership-checker
npm install
```

## 🧪 Usage

1.**Start the server:**
```bash
node index.js
```

2.**Send a request to the root route with query parameters:**
```http
GET /?token=YOUR_BOT_TOKEN&channel=@channel1,@channel2&userid=USER_ID
```

✅ Parameters
| Parameter | Description                          | Required |
| --------- | ------------------------------------ | -------- |
| `token`   | Your Telegram bot token              | Yes      |
| `channel` | Comma-separated channel usernames    | Yes      |
| `userid`  | Telegram user ID to check membership | Yes      |

## 📄 Example Response

If the user has joined all channels:
```json
{
  "success": true,
  "message": "User has joined all channels"
}
```

If the user hasn't joined some channels or the bot isn’t an admin:
```json
{
  "success": false,
  "not_joined_or_bot_not_admin": [
    {
      "channel": "@channel1",
      "joined": false
    },
    {
      "channel": "@channel2",
      "error": "Bot is not admin"
    }
  ]
}
```

## 🧰 Example Request

```bash
curl "http://localhost:3000/?token=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11&channel=@mychannel1,@mychannel2&userid=987654321"
```

## ⚠️ Notes

- The bot must be added to each channel as an admin.
- Channel usernames should start with `@` or be in the format `-100...` (channel ID).

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](https://github.com/NotFlexCoder/member-checker/blob/main/LICENSE) file for details.

