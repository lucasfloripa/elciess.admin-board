import { RemoteAuthentication } from '@/data/usecases'
import { HttpPostClientSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (): SutTypes => {
  const url = 'any_url'
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('Data Usecase RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct url ', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    await sut.auth()
    expect(httpPostClientSpy._url).toBe('any_url')
  })
})
