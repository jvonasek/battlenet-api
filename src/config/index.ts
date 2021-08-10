import { BattleNetEndpoints } from '../types'

export const Region = {
  US: 'us',
  EU: 'eu',
  KR: 'kr',
  TW: 'tw',
} as const

export const NamespacePrefix = {
  DYNAMIC: 'dynamic',
  STATIC: 'static',
  PROFILE: 'profile',
} as const

export const Endpoints: BattleNetEndpoints = {
  [Region.US]: {
    hostname: 'https://us.api.blizzard.com',
    defaultLocale: 'en_US',
    locales: ['en_US', 'es_MX', 'pt_BR', 'all'],
  },
  [Region.EU]: {
    hostname: 'https://eu.api.blizzard.com',
    defaultLocale: 'en_GB',
    locales: ['en_GB', 'es_ES', 'fr_FR', 'ru_RU', 'de_DE', 'it_IT', 'all'],
  },
  [Region.KR]: {
    hostname: 'https://kr.api.blizzard.com',
    defaultLocale: 'ko_KR',
    locales: ['ko_KR', 'en_GB', 'en_US', 'all'],
  },
  [Region.TW]: {
    hostname: 'https://tw.api.blizzard.com',
    defaultLocale: 'zh_TW',
    locales: ['zh_TW', 'en_GB', 'en_US', 'all'],
  },
}
