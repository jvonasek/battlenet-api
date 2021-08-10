import { SelfLink, Faction, Media, EntityWithLink } from '.'

export interface GenericAchievement<L = string> {
  _links: SelfLink
  category: EntityWithLink<L>
  criteria?: Criteria<L>
  description: L
  display_order: number
  id: number
  is_account_wide: boolean
  media: Media
  name: L
  next_achievement?: EntityWithLink<L>
  points: number
  prerequisite_achievement?: L
  requirements?: Requirements<L>
  reward_description?: string
}

export interface Criteria<L> {
  amount: number
  child_criteria?: Criterion<L>[]
  description: null | L
  id: number
  operator?: CriterionOperator
  show_progress_bar?: boolean
}

export interface Criterion<L> {
  achievement?: EntityWithLink<L>
  amount: number
  child_criteria?: Criterion<L>[]
  description: null | L
  faction?: Faction<L>
  id: number
  operator?: CriterionOperator
  show_progress_bar?: boolean
}

export interface CriterionOperator {
  name: CriterionOperatorName
  type: CriterionOperatorType
}

export enum CriterionOperatorName {
  CompleteAll = 'Complete All',
  CompleteAtLeast = 'Complete At Least',
}

export enum CriterionOperatorType {
  And = 'AND',
  CompleteAtLeast = 'COMPLETE_AT_LEAST',
}

export interface Requirements<L> {
  faction: Faction<L>
}
