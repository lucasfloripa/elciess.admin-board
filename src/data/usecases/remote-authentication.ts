import { Authentication } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (credentials: Authentication.Params): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: credentials
    })
  }
}
