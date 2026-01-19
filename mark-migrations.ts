import { getPayload } from 'payload';
import config from './src/payload.config';

async function markMigrationsAsRun() {
  const payload = await getPayload({ config });

  // Access the db adapter directly
  const db = (payload as any).db;

  const migrations = ['20260115_005923', '20260115_205138'];

  for (const name of migrations) {
    try {
      // Check if already exists
      const result = await db.drizzle.execute(
        "SELECT name FROM payload_migrations WHERE name = '" + name + "'"
      );

      if (result.rows.length === 0) {
        await db.drizzle.execute(
          "INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ('" + name + "', 1, NOW(), NOW())"
        );
        console.log('Marked migration ' + name + ' as run');
      } else {
        console.log('Migration ' + name + ' already marked');
      }
    } catch (err) {
      console.error('Error with migration ' + name + ':', err);
    }
  }

  process.exit(0);
}

markMigrationsAsRun();
