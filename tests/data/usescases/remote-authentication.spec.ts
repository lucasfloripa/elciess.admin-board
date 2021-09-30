import { RemoteAuthentication } from '@/data/usecases'
import { HttpPostClientSpy } from '@/tests/data/mocks'
import { mockAuthenticationCredencials } from '@/tests/domain/mocks'

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

describe('/data/usecases RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct values', async () => {
    const url = faker.internet.url()
    const credentials = mockAuthenticationCredencials()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(credentials)
    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toBe(credentials)
  })
})
