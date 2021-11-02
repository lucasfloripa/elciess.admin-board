import { HttpPostClient } from '@/data/protocols'

import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostClient.Params<any>): Promise<HttpPostClient.Result<any>> {
    return await axios.post(params.url, params.body)
  }
}
