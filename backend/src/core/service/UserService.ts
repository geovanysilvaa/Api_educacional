import { UserRepository } from "../repository/UserRepository";
import { CreateUserDTO, UpdateUserDTO, LoginUserDTO, UserResponseDTO } from "../models/DTOs";
import { IUserService, IUserRepository } from "../interfaces/IUserService";
import { IMaterialRepository } from "../interfaces/IMaterialService";
import { MaterialRepository } from "../repository/MaterialRepository";
import bcrypt from "bcryptjs";

/**
 * Serviço responsável por gerenciar usuários.
 * Contém lógica de criação, atualização, login, listagem e exclusão.
 */
export class UserService implements IUserService {
  private repository: IUserRepository;
  private materialRepository: IMaterialRepository;

  /**
   * Injeção de dependências para repositórios.
   * Permite testes unitários com mocks.
   */
  constructor(repository?: IUserRepository, materialRepository?: IMaterialRepository) {
    this.repository = repository ?? new UserRepository();
    this.materialRepository = materialRepository ?? new MaterialRepository();
  }

  /**
   * Realiza login do usuário.
   * Valida se o email existe e se a senha corresponde.
   * @param data - objeto com email e senha
   * @returns UserResponseDTO sem expor a senha
   */
  async login(data: LoginUserDTO): Promise<UserResponseDTO> {
   
    const existe = await this.repository.findByEmail(data.email);
    if (!existe) {
      throw new Error("Usuário não encontrado"); 
    }

    
    const compareSenha = await bcrypt.compare(data.password, existe.password);
    if (!compareSenha) {
      throw new Error("Email ou senha inválidos"); // Senha incorreta
    }

   
    const userResponse: UserResponseDTO = {
      id: existe.id,
      name: existe.name,
      email: existe.email,
      role: existe.role,
      createdAt: existe.createdAt,
    };

    return userResponse;
  }

  /**
   * Cria um novo usuário.
   * Garante que o email não esteja cadastrado e criptografa a senha.
   * @param data - dados do usuário
   * @returns UserResponseDTO
   */
  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    
    const existing = await this.repository.findByEmail(data.email);
    if (existing) throw new Error("Email já cadastrado");

    
    const senhaSegura = await bcrypt.hash(data.password, 10);

    
    const user = await this.repository.create({
      ...data,
      password: senhaSegura,
      role: data.role ?? "PROFESSOR", 
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  /**
   * Retorna usuário pelo ID.
   * @param id - ID do usuário
   * @returns UserResponseDTO
   */
  async getUserById(id: number): Promise<UserResponseDTO> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error("Usuário não encontrado");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  /**
   * Retorna todos os usuários cadastrados.
   * @returns lista de UserResponseDTO
   */
  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.repository.findAll();

    
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }

  /**
   * Atualiza um usuário existente.
   * Valida se o email já não está cadastrado para outro usuário.
   * @param id - ID do usuário
   * @param data - dados para atualizar
   * @returns UserResponseDTO atualizado
   */
  async updateUser(id: number, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error("Usuário não encontrado");

    
    if (data.email) {
      const existing = await this.repository.findByEmail(data.email);
      if (existing && existing.id !== id) {
        throw new Error("Email já cadastrado por outro usuário");
      }
    }

    
    const updateData = await this.repository.update(id, data);
    return {
      id: updateData.id,
      name: updateData.name,
      email: updateData.email,
      role: updateData.role,
      createdAt: updateData.createdAt,
    };
  }

  /**
   * Remove usuário.
   * Verifica se usuário existe e se não possui materiais associados.
   * @param id - ID do usuário
   */
  async deleteUser(id: number): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error("Usuário não encontrado");

    
    const materiais = await this.materialRepository.findByUserId(id);
    if (materiais.length > 0) {
      throw new Error("Usuário possui materiais cadastrados");
    }

  
    await this.repository.delete(id);
  }
}
