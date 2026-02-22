import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsService } from 'src/analytics/analytics.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,

    private readonly analyticsService: AnalyticsService,
  ) {}

  async getUserProfile(userId: string) {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
    });

    const reliability =
      await this.analyticsService.calculatePredictorReliability(userId);

    return {
      ...user,
      predictorReliability: reliability,
    };
  }
}
