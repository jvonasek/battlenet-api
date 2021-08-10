import fetch, { Response, HeadersInit } from 'node-fetch'
import { Endpoints } from '../config'
import {
  BattleNetPublicFetchParams,
  BattleNetFetchParams,
  BattleNetRegion,
  BattleNetEndpoint,
  BattleNetOptions,
  BattleNetResponse,
  BattleNetTokenProps,
} from '../types'

class BattleNet {
  readonly region: BattleNetRegion
  readonly accessToken: string
  readonly debug: boolean = false

  constructor({ accessToken, region, debug }: BattleNetOptions) {
    this.accessToken = accessToken
    this.region = region
    if (debug) {
      this.debug = debug
    }
  }

  private get headers(): HeadersInit {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    }
  }

  public get endpoint(): BattleNetEndpoint {
    return Endpoints[this.region]
  }

  public get defaultLocale(): string {
    return this.endpoint.defaultLocale
  }

  public get hostname(): string {
    return this.endpoint.hostname
  }

  async fetch<R>(
    path: string,
    params: BattleNetFetchParams
  ): Promise<BattleNetResponse<R>> {
    try {
      const res = await fetch(this.createFetchPath(path, params), {
        headers: this.headers,
      })

      this.logFetch(res)
      const data = await res.json()
      const { status, statusText } = res

      return {
        code: status,
        error: status !== 200,
        message: statusText,
        data,
      }
    } catch (error) {
      return {
        code: 500,
        error: true,
        message: error.message,
        data: undefined,
      }
    }
  }

  private createFetchPath(path: string, params: BattleNetFetchParams): string {
    const hostname = this.hostname
    const locale = params.locale || this.defaultLocale
    return `${hostname}${path}?namespace=${params.namespace}&locale=${locale}`
  }

  private logFetch({ url, status, statusText }: Response): void {
    this.debugger(`FETCH`, url, status, statusText)
  }

  private debugger(...args: Array<string | boolean | number>): void {
    if (this.debug) {
      console.log(args.map((item) => `[${item?.toString()}]`).join(' '))
    }
  }

  static async getToken({
    region,
    clientId,
    clientSecret,
  }: {
    region: BattleNetRegion
    clientId: string
    clientSecret: string
  }): Promise<BattleNetTokenProps> {
    const res = await fetch(`https://${region}.battle.net/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    })

    const response = await res.json()

    if (response.error) {
      throw new Error(response.error_description)
    }

    return response
  }

  static async checkToken({
    region,
    accessToken,
  }: {
    region: BattleNetRegion
    accessToken: string
  }) {
    const response = await fetch(
      `https://${region}.battle.net/oauth/check_token?token=${accessToken}`
    )
    const body = await response.json()
    return body
  }
}

export default BattleNet
