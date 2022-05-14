import { Result } from '@App/entities/result.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
  constructor(@InjectRepository(Result) private resultsRepository: Repository<Result>) {}

  sign(userId: string) {
    const result = this.resultsRepository.create({
      userId: userId,
      task1: 0,
      task2: 0,
      task3: 0,
      task4: 0,
    });

    return this.resultsRepository.save(result);
  }

  getAllResults() {
    return this.resultsRepository.find();
  }

  getMyResults(userId: string) {
    return this.resultsRepository.findOne({ where: { userId: userId } });
  }

  async checkTask(taskId: string, flag: string, userId: string) {
    const id = (await this.resultsRepository.findOne({ where: { userId: userId } })).id;

    switch (taskId) {
      case '1':
        if (flag === '1lubieplacki1') {
          await this.resultsRepository.update(id, { task1: 1 });
        } else {
          throw new BadRequestException();
        }

        break;
      case '2':
        await this.resultsRepository.update(id, { task1: 1 });
        break;
      case '3':
        await this.resultsRepository.update(id, { task1: 1 });
        break;
      case '4':
        await this.resultsRepository.update(id, { task1: 1 });
        break;
    }

    return this.resultsRepository.findOne({ where: { userId: userId } });
  }
}
