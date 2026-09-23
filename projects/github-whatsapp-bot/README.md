# Create-Github-Whatsapp-Notifier

Scaffold a GitHub webhook bot that sends WhatsApp notifications through Twilio.

## Quick Start

```bash
npx create-github-whatsapp-notifier my-bot
cd my-bot
npm install
cp .env.example .env
npm start
```

## Configure the Generated Bot

1. Update Twilio credentials in `.env`:

```env
PORT=3000
TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

2. Map GitHub usernames to WhatsApp numbers in `config/user-phones.js`:

```js
export const userPhones = {
  alice: '+15551234567',
};
```

## Local Test with curl

Run this while server is running:

```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -H "x-github-event: pull_request" \
  -d '{
    "action":"review_requested",
    "requested_reviewer":{"login":"imRahul05"},
    "repository":{"name":"example-repo"},
    "pull_request":{
      "title":"Fix login bug",
      "html_url":"https://github.com/example/repo/pull/1",
      "user":{"login":"alice"},
      "head":{"ref":"feature/auth-fix"}
    }
  }'


```

Expected response: `{"success":true}` (if reviewer exists in `user-phones.js` and Twilio creds are valid).

## Deploy on Vercel (Production)

After generating your bot (`my-bot`), push it to a GitHub repo and deploy:

1. Go to Vercel and click `Add New...` -> `Project`
2. Import your `my-bot` repository
3. Keep framework as `express`
4. Add Environment Variables in Vercel project settings:

- `TWILIO_SID`
- `TWILIO_TOKEN`
- `TWILIO_WHATSAPP_FROM`

5. Deploy

Your webhook URL will be:
`https://<your-vercel-domain>/api/webhook`

Then update GitHub webhook `Payload URL` with this production URL.

## Add GitHub Webhook

In your GitHub repo:

1. Go to `Settings` -> `Webhooks` -> `Add webhook`
2. Payload URL: your public endpoint (`.../api/webhook`)
3. Content type: `application/json`
4. Select events:

- Pull requests
- Pull request reviews
- Workflow runs

5. Save webhook

## Events Supported

- `pull_request`: `assigned`, `review_requested`, merged `closed`
- `pull_request_review`: `approved`
- `workflow_run`: failed runs

# Author

Rahul Kumar (github.com/imRahul05)
