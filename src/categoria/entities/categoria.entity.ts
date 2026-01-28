import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Refeicao } from '../../refeição/entities/refeicao.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column()
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Column()
  @ApiProperty()
  descricao: string;

  @OneToMany(() => Refeicao, (refeicao) => refeicao.categoria)
  refeicao: Refeicao[];
}
