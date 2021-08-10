import { Link, EntityWithLink, Faction, Gender, Realm } from '.'

export interface WoWAccountCharacter {
  id: number
  character: Link
  protexcted_character: Link
  name: string
  realm: Realm<string>
  playable_class: EntityWithLink<string>
  playable_race: EntityWithLink<string>
  gender: Gender<string>
  faction: Faction<string>
  level: number
}

export interface WoWAccount {
  id: number
  characters: Array<WoWAccountCharacter>
}
