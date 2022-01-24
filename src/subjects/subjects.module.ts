import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';

@Module({
  providers: [SubjectsService]
})
export class SubjectsModule {}
