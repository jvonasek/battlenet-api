import { Endpoints } from '../config'

import {
  BattleNetFetchParams,
  BattleNetPublicFetchParams,
  BattleNetNamespacePrefix,
  BattleNetRegion,
} from '../types'

export const composeParams = (
  namespacePrefix: BattleNetNamespacePrefix,
  region: BattleNetRegion,
  params: BattleNetPublicFetchParams = {}
): Required<BattleNetFetchParams> => {
  const locale = params.locale || Endpoints[region].defaultLocale
  return {
    namespace: `${namespacePrefix}-${region}`,
    locale,
  }
}
