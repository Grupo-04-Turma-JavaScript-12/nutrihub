import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Refeicao } from '../entities/refeicao.entity';
import { RefeicaoService } from '../services/refeicao.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller('/refeicoes')
@ApiBearerAuth()
export class RefeicaoController {
  constructor(private readonly refeicaoService: RefeicaoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Refeicao[]> {
    return this.refeicaoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Refeicao> {
    return this.refeicaoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('nome') nome: string): Promise<Refeicao[]> {
    return this.refeicaoService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() refeicao: Refeicao): Promise<Refeicao> {
    return this.refeicaoService.create(refeicao);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() refeicao: Refeicao): Promise<Refeicao> {
    return this.refeicaoService.update(refeicao);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.refeicaoService.delete(id);
  }
}
