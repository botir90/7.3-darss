import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './modules/auth/entities/auth.entity';
import { ArticleModule } from './modules/article/article.module';
import { Article } from './modules/article/entities/article.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: "localhost",
        port: 5000,
        username: "postgres",
        database: config.get<string>("DB_NAME"),
        password: config.get<string>("DB_PASSWORD"),
        entities: [Auth , Article],
        synchronize: true,
        logging: false,
      }),
    }),
    AuthModule,
    ArticleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}