// import { Module } from '@nestjs/common';
//
// @Module({
//   imports: [],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import configuration from '../config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonController } from './common/common.controller';
import { LocalizationModule } from './localization/localization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { getMailConfig } from './configs/mail.configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    LocalizationModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
  ],
  controllers: [CommonController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
