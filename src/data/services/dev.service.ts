import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Refeicao } from '../../refeição/entities/refeicao.entity';
import { Restaurante } from '../../restaurante/entities/restaurante.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_nutrihub',
      entities: [Refeicao, Categoria, Restaurante],
      synchronize: true,
    };
  }
}
