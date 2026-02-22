import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        AnalyticsModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
