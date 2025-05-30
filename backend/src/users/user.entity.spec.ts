import { User } from './user.entity';

describe('User entity', () => {
  it('should create a user with the correct properties', () => {
    const user = new User();
    user.email = 'test@example.com';
    user.name = 'Test';
    user.password = '1234';

    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test');
    expect(user.password).toBe('1234');
  });
});
