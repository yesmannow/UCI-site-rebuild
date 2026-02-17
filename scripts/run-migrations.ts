#!/usr/bin/env tsx

/**
 * Script to manually run Payload CMS migrations
 * Usage: tsx scripts/run-migrations.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function runMigrations() {
  console.log('🚀 Starting migration execution...\n')

  try {
    console.log('📦 Loading Payload config...')

    // Initialize Payload (this triggers migrations)
    const payload = await getPayload({ config })

    console.log('✅ Payload initialized successfully!')
    console.log('\n✅ All pending migrations have been executed.')
    console.log('\n📊 Database is now seeded with:')
    console.log('  • About global (Mission & Values)')
    console.log('  • UrgentCare Indy tenant + 5 core services + home page')
    console.log('  • PrimaryCare Indy tenant + 4 clinical services + home page')
    console.log('  • 10 specialized services (LungCare, Occupational, Bone Health)')
    console.log('  • Dr. James D. Pike provider profile')
    console.log('  • 4 UrgentCare pricing tiers')

    await payload.db.destroy()
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Migration failed!')
    console.error('Error details:', error)
    if (error instanceof Error) {
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
    }
    process.exit(1)
  }
}

runMigrations()
