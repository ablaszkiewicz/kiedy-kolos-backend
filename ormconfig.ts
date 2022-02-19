import { Subject } from '@App/entities/subject.entity';
import { User } from '@App/entities/user.entity';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Subject, User, YearCourse],
  synchronize: true,
};

export const e2eConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [Subject, User, YearCourse],
  synchronize: true,
};
