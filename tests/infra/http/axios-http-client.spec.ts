import { AxiosHttpClient } from '@/infra/http'

import axios from 'axios'
import faker from 'faker'

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
  test('Should call axios with correct URL and verb(post) ', async () => {
    const { sut } = makeSut()
    const url = faker.internet.url()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})