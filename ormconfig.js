module.exports = {
  type: 'postgres',
  host: 'ec2-184-73-243-101.compute-1.amazonaws.com',
  port: 5432,
  username: 'wvlmrhdhriequf',
  password: '16a853bccfc158cb5a8270372fc55eea751188f1e1f62ad1b6b052fd8af71a69',
  database: 'd5i3fpmr6hhmvq',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};
