import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Refeicao } from "./entities/refeicao.entity";
import { RefeicaoService } from "./services/refeicao.service";
import { RefeicaoController } from "./controllers/refeicao.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Refeicao])],
    providers: [RefeicaoService],
    controllers: [RefeicaoController],
    exports: [RefeicaoService],
})
export class RefeicaoModule {}