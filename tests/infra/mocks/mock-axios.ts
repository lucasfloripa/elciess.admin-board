import { mockPostResponse } from '@/tests/infra/mocks'

import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockPostResponse())
  return mockedAxios
}
