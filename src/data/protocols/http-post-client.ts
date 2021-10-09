export interface HttpPostClient<P, R> {
  post: (params: HttpPostClient.Params<P>) => Promise<HttpPostClient.Result<R>>
}

export namespace HttpPostClient {
  export type Params<T> = {
    url: string
    body?: T
  }
  export type Result<T> = {
    statusCode: number
    body?: T
  }
}
