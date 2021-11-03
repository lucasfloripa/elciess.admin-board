import { AxiosHttpClient } from '@/infra/http'
import { mockAxios, mockPostRequest } from '@/tests/infra/mocks'

import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios }
}
describe('AxiosHttpClient', () => {
  test('Should call axios with correct url, body and verb(post)', async () => {
    const { sut, mockedAxios } = makeSut()
    const postRequest = mockPostRequest()
    await sut.post(postRequest)
    expect(mockedAxios.post).toHaveBeenCalledWith(postRequest.url, postRequest.body)
  })

  test('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut()
    const postRequest = mockPostRequest()
    const promise = sut.post(postRequest)
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
