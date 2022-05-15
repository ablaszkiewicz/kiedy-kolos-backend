import { Result } from '@App/entities/result.entity';
import { User } from '@App/entities/user.entity';
import { YearCoursesService } from '@App/year-courses/year-courses.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result) private resultsRepository: Repository<Result>,
    private yearCoursesService: YearCoursesService
  ) {}

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

  async getMyResults(userId: string) {
    const result = await this.resultsRepository.findOne({ where: { userId: userId } });

    // result.task1 = 0;
    // result.task2 = 0;
    // result.task3 = 0;
    // result.task4 = 0;

    // await this.resultsRepository.save(result);
    return result;
  }

  async checkTask1(user: User) {
    const startDate = 1000;
    const id = (await this.resultsRepository.findOne({ where: { user: user } })).id;

    const yearCourses = await this.yearCoursesService.findByAdmin(user);
    if (yearCourses.some((yearCourse) => yearCourse.startYear === startDate)) {
      await this.resultsRepository.update(id, { task1: 1 });
    }

    return this.resultsRepository.findOne({ where: { user: user } });
  }

  async checkTask2(flag: string, userId: string) {
    const id = (await this.resultsRepository.findOne({ where: { userId: userId } })).id;

    if (flag === '1lubieplacki1') {
      await this.resultsRepository.update(id, { task2: 1 });
    }

    return this.resultsRepository.findOne({ where: { userId: userId } });
  }

  async checkTask3(user: User) {
    const id = (await this.resultsRepository.findOne({ where: { user: user } })).id;
    const uuid = '9511951e-9cdd-4797-a313-8daf45b1aa44';

    const yearCourses = await this.yearCoursesService.findByAdmin(user);
    console.log(yearCourses);
    if (yearCourses.some((yearCourse) => yearCourse.id === uuid)) {
      await this.resultsRepository.update(id, { task3: 1 });
    }

    return this.resultsRepository.findOne({ where: { user: user } });
  }

  async checkTask4(flag: string, userId: string) {
    const id = (await this.resultsRepository.findOne({ where: { userId: userId } })).id;

    if (flag === 'flagowy_uzytkownik@2137.com') {
      await this.resultsRepository.update(id, { task4: 1 });
    }

    return this.resultsRepository.findOne({ where: { userId: userId } });
  }
}
