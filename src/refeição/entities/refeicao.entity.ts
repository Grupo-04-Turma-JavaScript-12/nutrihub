import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tb_refeicoes' })
export class Refeicao {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string;

    @Column({ length: 5000 })
    foto: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    descricao: string;

    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    preco: number;

    // @ManyToOne(() => Categoria, (categoria) => categoria.refeicoes, {
    //     onDelete: 'CASCADE',
    // })
    // categoria: Categoria;

    // @ManyToOne(() => Restaurante, (restaurante) => restaurante.refeicoes, {
    //     onDelete: 'CASCADE',
    // })
    // restaurante: Restaurante;
}