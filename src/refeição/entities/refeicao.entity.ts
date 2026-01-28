import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Restaurante } from '../../restaurante/entities/restaurante.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_refeicoes' })
export class Refeicao {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @ApiProperty()
  @Column({ length: 5000 })
  foto: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  @ApiProperty()
  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.refeicao, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.refeicao, {
    onDelete: 'CASCADE',
  })
  restaurante: Restaurante;
}
