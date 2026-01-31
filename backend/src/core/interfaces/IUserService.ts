import { CreateUserDTO, LoginUserDTO, UpdateUserDTO, UserResponseDTO, UserWithPassword } from "../models/DTOs";

/**
 * Interface do serviço de usuários
 * Define métodos de negócio que a camada de serviço deve implementar
 */
export interface IUserService {
  /** Faz login do usuário e retorna os dados sem a senha */
  login(data: LoginUserDTO): Promise<UserResponseDTO>;

  /** Cria um novo usuário e retorna os dados sem a senha */
  createUser(data: CreateUserDTO): Promise<UserResponseDTO>;

  /** Atualiza um usuário existente pelo ID e retorna os dados atualizados sem a senha */
  updateUser(id: number, data: UpdateUserDTO): Promise<UserResponseDTO>;

  /** Busca um usuário pelo ID e retorna os dados sem a senha */
  getUserById(id: number): Promise<UserResponseDTO>;

  /** Retorna todos os usuários cadastrados sem as senhas */
  getAllUsers(): Promise<UserResponseDTO[]>;

  /** Deleta um usuário pelo ID */
  deleteUser(id: number): Promise<void>;
}

/**
 * Interface do repositório de usuários
 * Define métodos de acesso ao banco de dados
 */
export interface IUserRepository {
  /** Cria um novo usuário e retorna o registro completo (incluindo senha) */
  create(data: CreateUserDTO): Promise<UserWithPassword>;

  /** Busca um usuário pelo ID, retorna null se não encontrado */
  findById(id: number): Promise<UserWithPassword | null>;

  /** Busca um usuário pelo email, retorna null se não encontrado */
  findByEmail(email: string): Promise<UserWithPassword | null>;

  /** Retorna todos os usuários cadastrados, incluindo senhas */
  findAll(): Promise<UserWithPassword[]>;

  /** Atualiza um usuário existente pelo ID e retorna o registro atualizado, incluindo senha */
  update(id: number, data: UpdateUserDTO): Promise<UserWithPassword>;

  /** Deleta um usuário pelo ID */
  delete(id: number): Promise<void>;
}
