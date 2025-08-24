import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seeder = appContext.get(SeederService);
  await seeder.seed();
  await appContext.close();
}

bootstrap()
  .then(() => {
    console.log('✅ Seeding complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seeding failed', err);
    process.exit(1);
  });
