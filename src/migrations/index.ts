import * as migration_20260217_035509_initial_setup from './20260217_035509_initial_setup';
import * as migration_20260217_seed_about from './20260217_seed_about';
import * as migration_20260217_seed_urgentcare_indy from './20260217_seed_urgentcare_indy';
import * as migration_20260217_seed_primarycare_indy from './20260217_seed_primarycare_indy';
import * as migration_20260217_seed_specialized_services from './20260217_seed_specialized_services';
import * as migration_20260217_seed_pricing_tiers from './20260217_seed_pricing_tiers';

export const migrations = [
  {
    up: migration_20260217_035509_initial_setup.up,
    down: migration_20260217_035509_initial_setup.down,
    name: '20260217_035509_initial_setup'
  },
  {
    up: migration_20260217_seed_about.up,
    down: migration_20260217_seed_about.down,
    name: '20260217_seed_about'
  },
  {
    up: migration_20260217_seed_urgentcare_indy.up,
    down: migration_20260217_seed_urgentcare_indy.down,
    name: '20260217_seed_urgentcare_indy'
  },
  {
    up: migration_20260217_seed_primarycare_indy.up,
    down: migration_20260217_seed_primarycare_indy.down,
    name: '20260217_seed_primarycare_indy'
  },
  {
    up: migration_20260217_seed_specialized_services.up,
    down: migration_20260217_seed_specialized_services.down,
    name: '20260217_seed_specialized_services'
  },
  {
    up: migration_20260217_seed_pricing_tiers.up,
    down: migration_20260217_seed_pricing_tiers.down,
    name: '20260217_seed_pricing_tiers'
  },
];
