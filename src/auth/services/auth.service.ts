import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RestauranteService } from '../../restaurante/services/restaurante.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';

@Injectable()
export class AuthService {
  constructor(
    private restauranteService: RestauranteService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const buscaUsuario = await this.restauranteService.findByUsuario(username);

    if (!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenhas(
      password,
      buscaUsuario.senha,
    );

    if (buscaUsuario && matchPassword) {
      const { senha, ...resposta } = buscaUsuario;
      return resposta;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { sub: usuarioLogin.usuario };

    const buscaUsuario = await this.restauranteService.findByUsuario(
      usuarioLogin.usuario,
    );

    return {
      id: buscaUsuario?.id,
      nome: buscaUsuario?.nome,
      usuario: usuarioLogin.usuario,
      senha: '',
      foto: buscaUsuario?.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
