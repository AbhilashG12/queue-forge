import { RegisterUser } from "../src/application/use-cases/RegisterUser.js";

describe('RegisterUser', () => {
  it('should save a user when data is valid', async () => {
    // 1. Create Mocks
    const mockRepo = { findByEmail: jest.fn().mockResolvedValue(null), save: jest.fn() };
    const mockHasher = { hash: jest.fn().mockResolvedValue('hashed_pw') };

    // 2. Instantiate Use Case
    const useCase = new RegisterUser(mockRepo as any, mockHasher as any);

    // 3. Act
    await useCase.execute({ email: 'test@test.com', passwordRaw: '12345678' });

    // 4. Assert
    expect(mockRepo.save).toHaveBeenCalled();
  });
});