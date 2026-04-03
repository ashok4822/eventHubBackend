import { RegisterUser, LoginUser } from '../../application/use-cases/UserUseCases.js';
import { MongooseUserRepository } from '../../infrastructure/repositories/MongooseRepositories.js';

const userRepository = new MongooseUserRepository();

const register = async (req, res) => {
  try {
    const registerUseCase = new RegisterUser(userRepository);
    const user = await registerUseCase.execute(req.body);
    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const loginUseCase = new LoginUser(userRepository);
    const result = await loginUseCase.execute(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export { register, login };
