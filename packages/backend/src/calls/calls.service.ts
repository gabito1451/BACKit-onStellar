import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallsRepository } from './calls.repository';
import { CallReport } from './entities/call-report.entity';
import { ReportCallDto } from './dto/report-call.dto';
import { QueryCallsDto } from './dto/query-calls.dto';
import { REPORT_THRESHOLD } from './constants/moderation.constants';

@Injectable()
export class CallsService {
  constructor(
    private readonly callsRepository: CallsRepository,
    @InjectRepository(CallReport)
    private readonly callReportRepository: Repository<CallReport>,
  ) {}

  async getFeed(query: QueryCallsDto) {
    const { page = 1, limit = 20 } = query;
    const [data, total] = await this.callsRepository.findFeed(page, limit);
    return { data, total, page, limit };
  }

  async search(query: QueryCallsDto) {
    const { search = '', page = 1, limit = 20 } = query;
    const [data, total] = await this.callsRepository.searchVisible(search, page, limit);
    return { data, total, page, limit };
  }

  async reportCall(id: string, reporterAddress: string, dto: ReportCallDto) {
    const call = await this.callsRepository.findOne({ where: { id } });
    if (!call) throw new NotFoundException('Call not found');

    const alreadyReported = await this.callReportRepository.findOne({
      where: { callId: id, reporterAddress },
    });
    if (alreadyReported) throw new ConflictException('You have already reported this call');

    await this.callReportRepository.save(
      this.callReportRepository.create({ callId: id, reporterAddress, reason: dto.reason }),
    );

    call.reportCount += 1;
    if (call.reportCount >= REPORT_THRESHOLD) {
      call.isHidden = true;
    }

    await this.callsRepository.save(call);

    return {
      message: 'Report submitted successfully',
      reportCount: call.reportCount,
      isHidden: call.isHidden,
    };
  }
}
