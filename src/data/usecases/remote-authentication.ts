import { Authentication } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols'
import { InvalidCredentialsError, UnexpectedError, ServerError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<Authentication.Params, Authentication.Result>
  ) { }

  async auth (credentials: Authentication.Params): Promise<Authentication.Result> {
    const httpPostResponse = await this.httpPostClient.post({
      url: this.url,
      body: credentials
    })
    switch (httpPostResponse.statusCode) {
      case 200:
        return httpPostResponse.body
      case 400:
        throw new UnexpectedError()
      case 401:
        throw new InvalidCredentialsError()
      case 500:
        throw new ServerError()
      default:
        throw new UnexpectedError()
    }
  }
}
