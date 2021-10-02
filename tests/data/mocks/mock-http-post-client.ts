import { HttpPostClient } from '@/data/protocols'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: any
  response: HttpPostClient.Result = {
    statusCode: 200
  }

  async post (params: HttpPostClient.Params): Promise<HttpPostClient.Result> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
