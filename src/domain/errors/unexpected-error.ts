export class UnexpectedError extends Error {
  constructor () {
    super('Something happens')
    this.name = 'UnexpectedError'
  }
}
