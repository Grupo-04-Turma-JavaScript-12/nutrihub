import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Refeicao } from '../../refeição/entities/refeicao.entity';

@Entity({ name: 'tb_restaurante' })
export class Restaurante {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ length: 255, unique: true, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @ApiProperty()
  @OneToMany(() => Refeicao, (refeicao) => refeicao.restaurante)
  refeicao: Refeicao[];
}
