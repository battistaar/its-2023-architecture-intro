export class UserExistsError extends Error {
  constructor() {
    super();
    this.name = 'UserExistsError';
    this.message = 'username already in use';
  }
}