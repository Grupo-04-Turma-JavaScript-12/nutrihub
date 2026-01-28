import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Restaurante } from '../entities/restaurante.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
    private bcrypt: Bcrypt,
  ) {}

  async findByUsuario(usuario: string): Promise<Restaurante | null> {
    return await this.restauranteRepository.findOne({
      where: {
        usuario: usuario,
      },
    });
  }

  async findAll(): Promise<Restaurante[]> {
    return await this.restauranteRepository.find();
  }

  async findById(id: number): Promise<Restaurante> {
    const restaurante = await this.restauranteRepository.findOne({
      where: {
        id,
      },
    });

    if (!restaurante)
      throw new HttpException(
        'Restaurante não encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return restaurante;
  }

  async findByNome(nome: string): Promise<Restaurante[]> {
    return await this.restauranteRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(restaurante: Restaurante): Promise<Restaurante> {
    const buscaRestaurante = await this.findByUsuario(restaurante.usuario);

    if (buscaRestaurante)
      throw new HttpException(
        'O Usuário (e-mail) já está cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    // criptografar a senha antes de salvar
    restaurante.senha = await this.bcrypt.criptografarSenha(restaurante.senha);

    return await this.restauranteRepository.save(restaurante);
  }

  async update(restaurante: Restaurante): Promise<Restaurante> {
    await this.findById(restaurante.id);

    const buscaRestaurante = await this.findByUsuario(restaurante.usuario);

    if (buscaRestaurante && buscaRestaurante.id !== restaurante.id)
      throw new HttpException(
        'Usuário (e-mail) já cadastrado para outro restaurante!',
        HttpStatus.BAD_REQUEST,
      );

    // se a senha vier no update, recriptografar:
    if (restaurante.senha) {
      restaurante.senha = await this.bcrypt.criptografarSenha(
        restaurante.senha,
      );
    }

    return await this.restauranteRepository.save(restaurante);
  }

  // 👇 NOVO: deletar por id
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id); // garante que existe ou lança 404
    return await this.restauranteRepository.delete(id);
  }
}
