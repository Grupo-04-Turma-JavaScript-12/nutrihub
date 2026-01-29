import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './categoria/categoria.module';
import { DevService } from './data/services/dev.service';
import { RefeicaoModule } from './refeição/refeicao.module';
import { RestauranteModule } from './restaurante/restaurante.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DevService,
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
