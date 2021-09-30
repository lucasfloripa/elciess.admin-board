import { RemoteAuthentication } from '@/data/usecases'
import { HttpPostClientSpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('Data Usecase RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct values', async () => {
    const url = faker.internet.url()
    const credentials = {
      login: faker.name.firstName(),
      password: faker.random.word()
    }
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(credentials)
    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toBe(credentials)
  })
})
