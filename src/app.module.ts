import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './categoria/categoria.module';
import { RefeicaoModule } from './refeição/refeicao.module';
import { RestauranteModule } from './restaurante/restaurante.module';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    RefeicaoModule,
    CategoriaModule,
    RestauranteModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
