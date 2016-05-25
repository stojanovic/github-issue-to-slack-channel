# Send Github issues to Slack channel

When someone open an issue on [JS Belgrade's CFP repository](https://github.com/jsbelgrade/cfp) this bot will post it to JS Belgrade Slack.  
It is hosted on AWS Lambda using Claudia.js.

## Instalation and deployment

Before you begin you need to have `node.js`, `aws` cli tool and `claudia` installed.

First time you want to deploy it, run `claudia create` command like this:

```
AWS_PROFILE=PROFILE_NAME claudia create --name github2slack --region us-east-1 --api-module api
```

Where `PROFILE_NAME` is your AWS profile name you set in ~/.aws/credentials, if you don't set it, it'll use the default profile.

Then you need to set env variables by running:

```
AWS_PROFILE=PROFILE_NAME aws apigateway create-deployment --rest-api-id API_ID --stage-name latest --variables SLACK_CHANNEL=CHANNEL --variables SLACK_USERNAME=BOT_USERNAME --variables SLACK_URL=SLACK_WEBHOOK_URL --region us-east-1
```

Where `API_ID` is from claudia.json created after the first step, `CHANNEL` is Slack channel (ie. `#general`), `BOT_USERNAME` is an username of the Slack bot and finally `SLACK_WEBHOOK_URL` is an url for the Slack bot from settings.

For updating the code just run:

```
AWS_PROFILE=PROFILE_NAME claudia update
```
