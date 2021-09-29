import { HttpPostClient } from '@/data/protocols'

export class HttpPostClientSpy implements HttpPostClient {
  _url?: string
  async post (url: string): Promise<void> {
    this._url = url
    return Promise.resolve()
  }
}
