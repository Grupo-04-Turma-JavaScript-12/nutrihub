import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Refeicao } from '../entities/refeicao.entity';

@Injectable()
export class RefeicaoService {
  constructor(
    @InjectRepository(Refeicao)
    private refeicaoRepository: Repository<Refeicao>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Refeicao[]> {
    return await this.refeicaoRepository.find({
      relations: {
        categoria: true,
        restaurante: true,
      },
    });
  }

  async findById(id: number): Promise<Refeicao> {
    const refeicao = await this.refeicaoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
        restaurante: true,
      },
    });
    if (!refeicao) {
      throw new HttpException('Refeição não encontrado!', HttpStatus.NOT_FOUND);
    }
    return refeicao;
  }

  async findAllByNome(nome: string): Promise<Refeicao[]> {
    return await this.refeicaoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
        restaurante: true,
      },
    });
  }

  async create(refeicao: Refeicao): Promise<Refeicao> {
    await this.categoriaService.findById(refeicao.categoria.id);

    return await this.refeicaoRepository.save(refeicao);
  }

  async update(refeicao: Refeicao): Promise<Refeicao> {
    await this.findById(refeicao.id);

    await this.categoriaService.findById(refeicao.categoria.id);

    return await this.refeicaoRepository.save(refeicao);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.refeicaoRepository.delete(id);
  }
}
