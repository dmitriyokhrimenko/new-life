import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  /**
   * Generate accesToken and refreshToken.
   * Returns the accessToken and refreshToken.
   *
   *
   * @param payload - payload object with user's data
   * @returns
   * accessToken - access token
   * refreshToken - refresh token
   */
  async generateTokens(payload): Promise<any> {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Login by a username and password.
   * Returns the accessToken and refreshToken.
   *
   *
   * @param user - user object retrieved from DB storage
   * @returns
   * accessToken - access token
   * refreshToken - refresh token
   */
  async login(user: any) {
    const payload = { username: user.username, userId: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
