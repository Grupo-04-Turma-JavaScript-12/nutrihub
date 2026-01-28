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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Restaurante } from '../entities/restaurante.entity';
import { RestauranteService } from '../services/restaurante.service';

@ApiTags('Restaurante')
@Controller('/restaurantes')
@ApiBearerAuth()
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Restaurante[]> {
    return this.restauranteService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Restaurante[]> {
    return this.restauranteService.findByNome(nome);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Restaurante> {
    return this.restauranteService.findById(id);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() restaurante: Restaurante): Promise<Restaurante> {
    return this.restauranteService.create(restaurante);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update(@Body() restaurante: Restaurante): Promise<Restaurante> {
    return this.restauranteService.update(restaurante);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.restauranteService.delete(id);
  }
}
