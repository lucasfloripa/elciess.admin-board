import { AxiosHttpClient } from '@/infra/http'
import { mockPostRequest } from '@/tests/infra/mocks'

import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

type SutTypes = {
  sut: AxiosHttpClient
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  return { sut }
}
describe('AxiosHttpClient', () => {
  test('Should call axios with correct url, body and verb(post) ', async () => {
    const { sut } = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
