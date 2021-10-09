import { HttpPostClient } from '@/data/protocols'

export class HttpPostClientSpy<P, R> implements HttpPostClient<P, R> {
  url?: string
  body?: P
  response: HttpPostClient.Result<R> = {
    statusCode: 200
  }

  async post (params: HttpPostClient.Params<P>): Promise<HttpPostClient.Result<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
