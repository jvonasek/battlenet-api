import {
  GenericCharacter,
  GenericCharacterAchievement,
  GenericCharacterMedia,
} from './character'
import { GenericAchievement } from './achievement'
import { WoWAccount } from './account'
import { Region, NamespacePrefix } from '../config'

export type GenericObject = {
  [key: string]: any
}

export type UserProfile = {
  _links: {
    self: Link
    user: Link
    profile: Link
  }
  id: number
  wow_accounts: Array<WoWAccount>
  collections: Link
}

export type Character = GenericCharacter<LocalizedField>
export type LocalizedCharacter = GenericCharacter<string>
export type CharacterType<P> = P extends { locale: 'all' }
  ? Character
  : LocalizedCharacter

export type CharacterMedia = GenericCharacterMedia<LocalizedField>
export type LocalizedCharacterMedia = GenericCharacterMedia<string>
export type CharacterMediaType<P> = P extends { locale: 'all' }
  ? CharacterMedia
  : LocalizedCharacterMedia

export type CharacterAchievement = GenericCharacterAchievement<LocalizedField>
export type LocalizedCharacterAchievement = GenericCharacterAchievement<string>
export type CharacterAchievementType<P> = P extends { locale: 'all' }
  ? CharacterAchievement
  : LocalizedCharacterAchievement

export type Achievement = GenericAchievement<LocalizedField>
export type LocalizedAchievement = GenericAchievement<string>
export type AchievementType<P> = P extends { locale: 'all' }
  ? Achievement
  : LocalizedAchievement

export type BattleNetNamespacePrefix =
  typeof NamespacePrefix[keyof typeof NamespacePrefix]
export type BattleNetRegion = typeof Region[keyof typeof Region]

export interface BattleNetEndpoint {
  hostname: string
  defaultLocale: Locale
  locales: Array<Locale>
}
export type BattleNetEndpoints = {
  [key in BattleNetRegion]: BattleNetEndpoint
}

export interface BattleNetOptions {
  accessToken: string
  region: BattleNetRegion
  debug?: boolean
}

export interface BattleNetTokenProps {
  access_token: string
  token_type: string
  expires_in: number
}

export interface BattleNetResponse<R = any> {
  code: number
  message: string
  error: boolean
  data?: R
}

export interface BattleNetFetchParams {
  namespace: string
  locale?: Locale
}

export type BattleNetPublicFetchParams = Omit<BattleNetFetchParams, 'namespace'>

// Response Types

export interface SelfLink {
  self: Link
}

export interface Link {
  href: string
}

export interface EntityWithLink<L> {
  id: number
  key: Link
  name: L
}

export interface Faction<L> {
  name: L
  type: FactionType
}

export enum FactionType {
  Alliance = 'ALLIANCE',
  Horde = 'HORDE',
}

export interface Gender<L> {
  name: L
  type: GenderType
}

export enum GenderType {
  Female = 'FEMALE',
  Male = 'MALE',
}

export interface Guild<L> {
  faction: Faction<L>
  id: number
  key: Link
  name: string
  realm: string
}

export interface Realm<L> {
  id: number
  key: Link
  name: L
  slug: string
}

export interface Media {
  id: number
  key: Link
}

export type Locale =
  | 'en_US'
  | 'es_MX'
  | 'pt_BR'
  | 'de_DE'
  | 'en_GB'
  | 'es_ES'
  | 'fr_FR'
  | 'it_IT'
  | 'ru_RU'
  | 'ko_KR'
  | 'zh_TW'
  | 'zh_CN'
  | 'all'

export type Locales = {
  [key in Locale]: string
}

export type KeyValuePair<K = string> = {
  key: K
  value: string
}

export type LocalizedField = Locales
