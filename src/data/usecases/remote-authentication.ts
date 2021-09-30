import { HttpPostClient } from '@/data/protocols'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (credentials: credentials): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: credentials
    })
  }
}

type credentials = {
  login: string
  password: string
}
