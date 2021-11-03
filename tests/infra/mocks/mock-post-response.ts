import { HttpPostClient } from '@/data/protocols'

import faker from 'faker'

export const mockPostResponse = (): HttpPostClient.Result<any> => ({
  statusCode: 200,
  body: faker.random.objectElement()
})
