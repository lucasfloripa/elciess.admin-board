import { AxiosHttpClient } from '@/infra/http'
import { mockPostRequest, mockPostResponse } from '@/tests/infra/mocks'

import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const postResponse = mockPostResponse()
const postRequest = mockPostRequest()
mockedAxios.post.mockResolvedValue(postResponse)

type SutTypes = {
  sut: AxiosHttpClient
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  return { sut }
}
describe('AxiosHttpClient', () => {
  test('Should call axios with correct url, body and verb(post)', async () => {
    const { sut } = makeSut()
    await sut.post(postRequest)
    expect(mockedAxios.post).toHaveBeenCalledWith(postRequest.url, postRequest.body)
  })

  test('Should return the correct statusCode and body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.post(postRequest)
    expect(httpResponse).toEqual(postResponse)
  })
})
