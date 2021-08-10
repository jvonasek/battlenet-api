import {
  SelfLink,
  Link,
  EntityWithLink,
  Faction,
  Gender,
  Guild,
  Realm,
  KeyValuePair,
} from '.'

export interface CovenantProgress<L = string> {
  chosen_covenant: { key: Link; name: L; id: number }
  renown_level: number
  soulbinds: Link
}

export interface GenericCharacter<L = string> {
  _links: SelfLink
  achievement_points: number
  achievements: Link
  achievements_statistics: Link
  active_spec: EntityWithLink<L>
  active_title?: ActiveTitle
  appearance: Link
  average_item_level: number
  character_class: EntityWithLink<L>
  collections: Link
  encounters: Link
  equipment: Link
  equipped_item_level: number
  experience: number
  faction: Faction<L>
  gender: Gender<L>
  guild?: Guild<L>
  id: number
  last_login_timestamp: number
  level: number
  media: Link
  mythic_keystone_profile: Link
  name: string
  professions: Link
  pvp_summary: Link
  quests: Link
  race: EntityWithLink<L>
  realm: Realm<L>
  reputations: Link
  specializations: Link
  statistics: Link
  titles: Link
  covenant_progress?: CovenantProgress
}

export interface ActiveTitle {
  display_string: string
  id: number
  key: Link
  name: string
}

export interface GenericCharacterAchievement<L = string> {
  achievement: EntityWithLink<L>
  completed_timestamp?: number
  criteria?: GenericCharacterAchievementCriteria
  id: number
}

export interface GenericCharacterAchievementCriteria {
  amount?: number
  child_criteria?: GenericCharacterAchievementCriteria[]
  id: number
  is_completed: boolean
}

export type CharacterMediaTypes = 'avatar' | 'inset' | 'main' | 'main-raw'

export interface GenericCharacterMedia<L = string> {
  _links: SelfLink
  character: {
    key: Link
    name: string
    id: number
    realm: Realm<L>
  }
  assets: KeyValuePair<CharacterMediaTypes>[]
}
