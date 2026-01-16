import * as migration_20260115_005923 from './20260115_005923';
import * as migration_20260115_205138 from './20260115_205138';

export const migrations = [
  {
    up: migration_20260115_005923.up,
    down: migration_20260115_005923.down,
    name: '20260115_005923',
  },
  {
    up: migration_20260115_205138.up,
    down: migration_20260115_205138.down,
    name: '20260115_205138'
  },
];
