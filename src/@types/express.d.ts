import 'express-session'
import IUsuario from '../interfaces/usuarioInterface';

declare module 'express-session' {
  interface Session {
    cookie: Cookie;
    createAt: Date;
    user: IUsuario;
  }
}
