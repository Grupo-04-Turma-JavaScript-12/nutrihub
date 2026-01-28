import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../categoria/categoria.module';
import { RefeicaoController } from './controllers/refeicao.controller';
import { Refeicao } from './entities/refeicao.entity';
import { RefeicaoService } from './services/refeicao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Refeicao]), CategoriaModule],
  providers: [RefeicaoService],
  controllers: [RefeicaoController],
  exports: [],
})
export class RefeicaoModule {}
