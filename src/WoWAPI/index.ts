import BattleNet from '../BattleNet'
import {
  AchievementType,
  CharacterType,
  CharacterMediaType,
  CharacterAchievementType,
  UserProfile,
  GenericObject,
  BattleNetPublicFetchParams,
  BattleNetOptions,
} from '../types'

import { NamespacePrefix } from '../config'
import { composeParams } from '../utils'

class WoWAPI extends BattleNet {
  constructor({ accessToken, region, debug }: BattleNetOptions) {
    super({ accessToken, region, debug })
  }

  async getAchievementCategoryIndex(params?: BattleNetPublicFetchParams) {
    const p = composeParams(NamespacePrefix.STATIC, this.region, params)
    return await this.fetch<GenericObject>(
      '/data/wow/achievement-category/index',
      p
    )
  }

  async getAchievementCategoryById(
    id: number,
    params?: BattleNetPublicFetchParams
  ) {
    const p = composeParams(NamespacePrefix.STATIC, this.region, params)
    return await this.fetch<GenericObject>(
      `/data/wow/achievement-category/${id}`,
      p
    )
  }

  // Achievements

  async getAchievementsIndex(params?: BattleNetPublicFetchParams) {
    const p = composeParams(NamespacePrefix.STATIC, this.region, params)
    return await this.fetch<GenericObject>('/data/wow/achievement/index', p)
  }

  async getAchievementById<P extends BattleNetPublicFetchParams>(
    id: number,
    params?: P
  ) {
    const p = composeParams(NamespacePrefix.STATIC, this.region, params)
    return await this.fetch<AchievementType<P>>(
      `/data/wow/achievement/${id}`,
      p
    )
  }

  async getAchievementMediaById(
    id: number,
    params?: BattleNetPublicFetchParams
  ) {
    const p = composeParams(NamespacePrefix.STATIC, this.region, params)
    return await this.fetch<GenericObject>(
      `/data/wow/media/achievement/${id}`,
      p
    )
  }

  // Private profile

  async getUserProfile(params?: BattleNetPublicFetchParams) {
    const p = composeParams(NamespacePrefix.PROFILE, this.region, params)
    return await this.fetch<UserProfile>('/profile/user/wow', p)
  }

  async getUserPets(params?: BattleNetPublicFetchParams) {
    const p = composeParams(NamespacePrefix.PROFILE, this.region, params)
    return await this.fetch<GenericObject>(
      '/profile/user/wow/collections/pets',
      p
    )
  }

  async getUserMounts(params?: BattleNetPublicFetchParams) {
    const p = composeParams(NamespacePrefix.PROFILE, this.region, params)
    return await this.fetch<GenericObject>(
      '/profile/user/wow/collections/mounts',
      p
    )
  }

  // Character

  async getCharacter<P extends BattleNetPublicFetchParams>(
    realm: string,
    name: string,
    params?: P
  ) {
    const p = composeParams(NamespacePrefix.PROFILE, this.region, params)
    return await this.fetch<CharacterType<P>>(
      `/profile/wow/character/${realm?.toLowerCase()}/${name?.toLowerCase()}`,
      p
    )
  }

  async getProtectedCharacter(
    identifier: string,
    params?: BattleNetPublicFetchParams
  ) {
    const p = composeParams(NamespacePrefix.PROFILE, this.region, params)
    return await this.fetch<GenericObject>(
      `/profile/user/wow/protected-character/${identifier}`,
      p
    )
  }

  async getCharacterAchievements<P extends BattleNetPublicFetchParams>(
    realm: string,
    name: string,
    params?: P
  ) {
    const p = composeParams(NamespacePrefix.PROFILE, this.region, params)
    return await this.fetch<CharacterAchievementType<P>>(
      `/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/achievements`,
      p
    )
  }

  async getCharacterMedia<P extends BattleNetPublicFetchParams>(
    realm: string,
    name: string,
    params?: P
  ) {
    const p = composeParams(NamespacePrefix.PROFILE, this.region, params)
    return await this.fetch<CharacterMediaType<P>>(
      `/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/character-media`,
      p
    )
  }

  // Realms and regions

  async getRealmIndex(params?: BattleNetPublicFetchParams) {
    const p = composeParams(NamespacePrefix.DYNAMIC, this.region, params)
    return await this.fetch<GenericObject>('/data/wow/realm/index', p)
  }

  async getRealm(realmSlug: string, params?: BattleNetPublicFetchParams) {
    const p = composeParams(NamespacePrefix.DYNAMIC, this.region, params)
    return await this.fetch<GenericObject>(`/data/wow/realm/${realmSlug}`, p)
  }

  async getRegion(regionId: number, params?: BattleNetPublicFetchParams) {
    const p = composeParams(NamespacePrefix.DYNAMIC, this.region, params)
    return await this.fetch<GenericObject>(`/data/wow/region/${regionId}`, p)
  }
}

export default WoWAPI
