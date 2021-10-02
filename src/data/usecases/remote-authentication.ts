import { Authentication } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (credentials: Authentication.Params): Promise<void> {
    const httpReponse = await this.httpPostClient.post({
      url: this.url,
      body: credentials
    })
    switch (httpReponse.statusCode) {
      case 400:
        throw new UnexpectedError()
      case 401:
        throw new InvalidCredentialsError()
    }
  }
}
