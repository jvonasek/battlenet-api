## Usage

```javascript
// You can skip this step if you have your own access token
const token = await BattleNet.getToken({
  region: 'us',
  clientId: '<YOUR CLIENT ID>',
  clientSecret: '<YOUR CLIENT SECRET>',
})

// initiate WoWAPI instance
const wow = new WoWAPI({
  region: 'us',
  accessToken: token.access_token,
})

const character = await wow.getCharacter('argent-dawn', 'razzin')
const achievement = await wow.getAchievementById(200)
```

## Development

Required `.env` or `.env.local` file variables

```bash
BNET_CLIENT_ID="id"
BNET_CLIENT_SECRET="secret
```

## Build library

```bash
yarn build
```
