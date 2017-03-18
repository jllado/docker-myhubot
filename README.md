This a pre-configured hubot image with slack adapter and jenkins plugin.

### Running

Build and run the image:
```language-bash
./install.sh SLACK_TOKEN JENKINS_URL JENKINS_AUTH(USER:TOKEN)
```

or you can stop and remove the image:
```language-bash
./uninstall.sh
```

### Slack token

Get the token from: slack -> Browse Apps -> Hubot -> Edit configuration                                                                                                                                                          
More info in https://slackapi.github.io/hubot-slack/

### Jenkins token

The API token is available in your personal configuration page. Click your name on the top right corner on every page, then click "Configure" to see your API token. (The URL $root/me/configure is a good shortcut.) You can also change your API token from here.

