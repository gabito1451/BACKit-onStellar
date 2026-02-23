import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CallsService } from './calls.service';
import { ReportCallDto } from './dto/report-call.dto';
import { QueryCallsDto } from './dto/query-calls.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Get('feed')
  getFeed(@Query() query: QueryCallsDto) {
    return this.callsService.getFeed(query);
  }

  @Get('search')
  search(@Query() query: QueryCallsDto) {
    return this.callsService.search(query);
  }

  @Post(':id/report')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  reportCall(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReportCallDto,
    @Request() req: any,
  ) {
    return this.callsService.reportCall(id, req.user.address, dto);
  }
}
