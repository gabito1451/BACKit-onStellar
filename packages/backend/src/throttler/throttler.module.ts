import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppThrottlerGuard } from './guards/app-throttler.guard';
import {
  THROTTLER_GLOBAL_NAME,
  THROTTLER_GLOBAL_TTL,
  THROTTLER_GLOBAL_LIMIT,
  THROTTLER_MUTATION_NAME,
  THROTTLER_MUTATION_TTL,
  THROTTLER_MUTATION_LIMIT,
} from './throttler.constants';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: THROTTLER_GLOBAL_NAME,
        ttl: THROTTLER_GLOBAL_TTL,
        limit: THROTTLER_GLOBAL_LIMIT,
      },
      {
        name: THROTTLER_MUTATION_NAME,
        ttl: THROTTLER_MUTATION_TTL,
        limit: THROTTLER_MUTATION_LIMIT,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppThrottlerGuard,
    },
  ],
  exports: [ThrottlerModule],
})
export class AppThrottlerModule {}
