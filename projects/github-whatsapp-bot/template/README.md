# GitHub WhatsApp Notifier

Receive WhatsApp alerts for GitHub pull request and CI events.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env`:

   ```bash
   cp .env.example .env
   ```

3. Edit [`config/user-phones.js`](./config/user-phones.js) and set your GitHub username to phone mapping.

4. Start the server:

   ```bash
   npm start
   ```

## Webhook URL

- Local endpoint: `http://localhost:3000/api/webhook`
- Expose it publicly with ngrok or deploy to your hosting platform.

## Supported Events

- `pull_request`:
  - `assigned`
  - `review_requested`
  - `closed` (merged only)
- `pull_request_review`: `approved`
- `workflow_run`: failures

## Project Structure

- `config/user-phones.js`: GitHub username to WhatsApp phone mapping.
- `services/github-event-message.js`: Event parsing and message formatting logic.
- `api/webhook.js`: Webhook handler that routes payloads to Twilio.
