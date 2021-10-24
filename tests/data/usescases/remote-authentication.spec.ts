import { RemoteAuthentication } from '@/data/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'
import { HttpPostClientSpy } from '@/tests/data/mocks'
import { mockAuthenticationCredencials } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<Authentication.Params, Authentication.Result>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<Authentication.Params, Authentication.Result>()
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
  test('Should throw UnexpectError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: 400
    }
    const promise = sut.auth(mockAuthenticationCredencials())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: 401
    }
    const promise = sut.auth(mockAuthenticationCredencials())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should throw UnexpectError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: 500
    }
    const promise = sut.auth(mockAuthenticationCredencials())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
