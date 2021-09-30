import { Authentication } from '@/domain/usecases'

import faker from 'faker'

export const mockAuthenticationCredencials = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.random.word()
})
