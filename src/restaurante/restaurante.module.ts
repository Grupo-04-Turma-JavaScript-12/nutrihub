import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteController } from './controllers/restaurante.controller';
import { Restaurante } from './entities/restaurante.entity';
import { RestauranteService } from './services/restaurante.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurante])],
  //, forwardRef(() => AuthModule)
  providers: [RestauranteService],
  controllers: [RestauranteController],
  exports: [RestauranteService],
})
export class RestauranteModule {}
