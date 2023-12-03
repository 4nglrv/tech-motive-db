# tech-motive-db

Модуль для разработки/накатки миграций

## Node.js

v18.17.1

## Установка

```bash
npm install
```

## Команды

### Накатить все миграции

```bash
npm run db:migrate
```

### Откатить последнюю миграцию

```bash
npm run db:migrate:undo
```

### Создать файл миграции

```bash
npm run db:migrate:create migration-name
```

### Проверить статус миграций

```bash
npm run db:migrate:status
```

## Переменные окружения

```dotenv
DB_USER=your_user
DB_PASSWORD=secret_P4sSw0r4
DB_SCHEMA=your_schema
DB_PORT=5433
```
