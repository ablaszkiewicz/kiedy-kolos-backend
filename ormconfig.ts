import { Subject } from '@App/entities/subject.entity';
import { User } from '@App/entities/user.entity';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { Group } from '@App/entities/group.entity';

/*
  Be careful!
    "synchronize: true" should only be used for early development.
    It causes db schema to sync if it detects there's a mismatch between db schema and entities.
    This behaviour may lead to an automatic table drop.
 */
const entities = [Subject, User, YearCourse, Group];

export const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: entities,
  synchronize: true,
};

export const e2eConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: entities,
  synchronize: true,
};
