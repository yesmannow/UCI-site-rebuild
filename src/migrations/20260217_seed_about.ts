import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.updateGlobal({
    slug: 'about',
    data: {
      headline: 'A Different Kind of Healthcare Experience.',
      mission:
        'To provide the best care, the best way, each day—with compassion, devotion, and respect. Established in 2007 by Dr. James D. Pike, we are a privately-owned practice dedicated to the Indianapolis community.',
      values: [
        {
          name: 'Compassion',
          description: 'Moved by the suffering of others to give of our time.',
        },
        {
          name: 'Devotion',
          description: 'Doing all things wholeheartedly with great care.',
        },
        {
          name: 'Respect',
          description: 'Treating every patient as a unique, valuable individual.',
        },
      ],
    },
  })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Optionally clear the global data
  await payload.updateGlobal({
    slug: 'about',
    data: {
      headline: '',
      mission: '',
      values: [],
    },
  })
}
