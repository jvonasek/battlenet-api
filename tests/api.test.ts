import BattleNet from '../src/BattleNet'
import WoWAPI from '../src/WoWAPI'

const getToken = async () => {
  return await BattleNet.getToken({
    region: 'eu',
    clientId: `${process.env.BNET_CLIENT_ID}`,
    clientSecret: `${process.env.BNET_CLIENT_SECRET}`,
  })
}

test('Returns Access Token', async () => {
  const token = await getToken()
  expect(token).toEqual(
    expect.objectContaining({
      access_token: expect.any(String),
      token_type: 'bearer',
      expires_in: expect.any(Number),
    })
  )
})

test('Returns a response from BattleNet API', async () => {
  const { access_token: accessToken } = await getToken()

  const wow = new WoWAPI({
    region: 'eu',
    accessToken,
  })

  const expectedResponse = {
    code: 200,
    error: false,
    message: 'OK',
    data: expect.any(Object),
  }

  expect(await wow.getCharacter('argent-dawn', 'razzina')).toEqual(
    expect.objectContaining(expectedResponse)
  )

  expect(await wow.getRealmIndex()).toEqual(
    expect.objectContaining(expectedResponse)
  )

  expect(await wow.getAchievementCategoryIndex()).toEqual(
    expect.objectContaining(expectedResponse)
  )

  expect(await wow.getAchievementCategoryById(81)).toEqual(
    expect.objectContaining(expectedResponse)
  )

  expect(await wow.getAchievementsIndex()).toEqual(
    expect.objectContaining(expectedResponse)
  )

  expect(await wow.getAchievementById(200)).toEqual(
    expect.objectContaining(expectedResponse)
  )

  expect(await wow.getAchievementMediaById(200)).toEqual(
    expect.objectContaining(expectedResponse)
  )
})

test('Returns localized and non-localized character response', async () => {
  const { access_token: accessToken } = await getToken()

  const wow = new WoWAPI({
    region: 'eu',
    accessToken,
  })

  const RACE_NAME_ALL_LOCALES = {
    en_US: 'Human',
    es_MX: 'Humano',
    pt_BR: 'Humano',
    de_DE: 'Mensch',
    en_GB: 'Human',
    es_ES: 'Humano',
    fr_FR: 'Humain',
    it_IT: 'Umano',
    ru_RU: 'Человек',
    ko_KR: '인간',
    zh_TW: '人類',
    zh_CN: '人类',
  }

  const locale = 'es_ES'

  // Test character race name with no locale param - defaults to en_US for eu region
  const characterNoLocaleParam = await wow.getCharacter(
    'argent-dawn',
    'razzina'
  )
  expect(characterNoLocaleParam.data?.race.name).toEqual(
    RACE_NAME_ALL_LOCALES['en_US']
  )

  // Test character race name with locale provided
  const characterWithLocaleParam = await wow.getCharacter(
    'argent-dawn',
    'razzina',
    {
      locale,
    }
  )
  expect(characterWithLocaleParam.data?.race.name).toEqual(
    RACE_NAME_ALL_LOCALES[locale]
  )

  // Test character race name with all locales
  const characterAllLocalesParam = await wow.getCharacter(
    'argent-dawn',
    'razzina',
    {
      locale: 'all',
    }
  )
  expect(characterAllLocalesParam.data?.race.name).toEqual(
    RACE_NAME_ALL_LOCALES
  )
  expect(characterAllLocalesParam.data?.race.name[locale]).toEqual(
    RACE_NAME_ALL_LOCALES[locale]
  )
})

test('Returns public properties', async () => {
  const { access_token: accessToken } = await getToken()
  const bnet = new BattleNet({
    region: 'us',
    accessToken,
  })

  expect(bnet.hostname).toEqual('https://us.api.blizzard.com')
  expect(bnet.defaultLocale).toEqual('en_US')
})
