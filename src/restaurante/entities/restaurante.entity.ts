import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_restaurante' })
export class Restaurante {
  // id
  // nome
  // usuário(email)
  // foto
  // senha

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ length: 255, unique: true, nullable: false })
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @Column({ length: 5000 })
  foto: string;

  // @OneToMany(() => Categoria, (categoria) => categoria.restaurante)
  // categoria: Categoria [];
}
