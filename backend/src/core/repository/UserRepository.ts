import { prisma } from "../lib/prisma";
import { IUserRepository } from "../interfaces/IUserService";
import { CreateUserDTO, UpdateUserDTO, UserWithPassword } from "../models/DTOs";

/**
 * Repositório responsável por gerenciar as operações de persistência
 * da entidade Usuário no banco de dados (Prisma ORM).
 */
export class UserRepository implements IUserRepository {
  
  /**
   * Mapeia um registro do banco (Prisma) para o tipo UserWithPassword
   * @param u - registro do usuário retornado pelo Prisma
   * @returns Usuário mapeado com senha
   */
  private mapUser(u: any): UserWithPassword {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      role: u.role,
      createdAt: u.createdAt,
    };
  }

  /**
   * Cria um novo usuário no banco
   * @param data - dados do usuário a ser criado
   * @returns Usuário criado com senha
   */
  async create(data: CreateUserDTO): Promise<UserWithPassword> {
    const user = await prisma.user.create({
      data: {
        ...data,
        role: data.role ?? "PROFESSOR", // Define o papel padrão
      },
    });
    return this.mapUser(user);
  }

  /**
   * Busca um usuário pelo ID
   * @param id - ID do usuário
   * @returns Usuário encontrado ou null
   */
  async findById(id: number): Promise<UserWithPassword | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.mapUser(user) : null;
  }

  /**
   * Busca um usuário pelo email
   * @param email - email do usuário
   * @returns Usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<UserWithPassword | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.mapUser(user) : null;
  }

  /**
   * Retorna todos os usuários cadastrados
   * @returns Lista de usuários com senha
   */
  async findAll(): Promise<UserWithPassword[]> {
    const users = await prisma.user.findMany();
    return users.map(user => this.mapUser(user));
  }

  /**
   * Atualiza um usuário existente
   * @param id - ID do usuário
   * @param data - dados a atualizar
   * @returns Usuário atualizado
   */
  async update(id: number, data: UpdateUserDTO): Promise<UserWithPassword> {
    const user = await prisma.user.update({ where: { id }, data });
    return this.mapUser(user);
  }

  /**
   * Remove um usuário do banco
   * @param id - ID do usuário
   */
  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
