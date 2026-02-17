import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // ── Step 1: Create UrgentCare Indy Tenant ──────────────────────────────
  const tenant = await payload.create({
    collection: 'tenants',
    data: {
      name: 'UrgentCare Indy',
      slug: 'urgent-care',
      domains: [
        { domain: 'localhost' },
        { domain: 'urgentcareindy.com' },
        { domain: 'www.urgentcareindy.com' },
      ],
      theme: 'teal-orange',
      currentWaitTime: 15,
      isOpen: true,
    },
  })

  console.log(`✓ Created tenant: ${tenant.name} (ID: ${tenant.id})`)

  // ── Step 2: Create Services ─────────────────────────────────────────────
  const serviceData = [
    {
      title: 'Minor Injury Treatment',
      slug: 'minor-injury-treatment',
      description: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Expert care for cuts, sprains, fractures, and other minor injuries. Walk-ins welcome.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      icon: 'Bone',
      category: 'Urgent',
      tenant: tenant.id,
    },
    {
      title: 'Flu & Allergy Shots',
      slug: 'flu-allergy-shots',
      description: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Stay protected with seasonal flu vaccines and allergy immunizations administered by our trained staff.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      icon: 'Syringe',
      category: 'Urgent',
      tenant: tenant.id,
    },
    {
      title: 'Sports Physicals',
      slug: 'sports-physicals',
      description: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Quick and comprehensive sports physicals for athletes of all ages. Get cleared to play today.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      icon: 'Activity',
      category: 'Urgent',
      tenant: tenant.id,
    },
    {
      title: 'DOT Physicals',
      slug: 'dot-physicals',
      description: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Department of Transportation medical examinations for commercial drivers. Certified examiners on staff.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      icon: 'ClipboardList',
      category: 'Urgent',
      tenant: tenant.id,
    },
    {
      title: 'EKGs',
      slug: 'ekgs',
      description: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Electrocardiogram testing to monitor your heart health. Results available quickly for your peace of mind.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      icon: 'HeartPulse',
      category: 'Cardiology',
      tenant: tenant.id,
    },
  ]

  const services = []
  for (const service of serviceData) {
    const created = await payload.create({
      collection: 'services',
      data: service as any,
    })
    services.push(created)
    console.log(`✓ Created service: ${created.title} (ID: ${created.id})`)
  }

  // ── Step 3: Create Home Page with Blocks ───────────────────────────────
  const homePage = await payload.create({
    collection: 'pages',
    data: {
      tenant: tenant.id,
      title: 'Home - UrgentCare Indy',
      slug: 'home',
      metaDescription:
        'High-quality urgent care in Indianapolis. Walk in today or save your spot online for minor injuries, flu shots, physicals, and more.',
      _status: 'published',
      blocks: [
        // Hero Block
        {
          blockType: 'hero',
          title: 'High-Quality Care. Rapid Recovery.',
          subtitle:
            'Convenient and affordable urgent care for minor injuries and illnesses. Walk in today or save your spot online.',
          ctaLabel: 'Save My Spot',
          showWaitTime: true,
        },
        // Service Grid
        {
          blockType: 'serviceGrid',
          heading: 'Our Key Services',
          services: services.map((s) => s.id),
        },
      ],
    },
  })

  console.log(`✓ Created home page: ${homePage.title} (ID: ${homePage.id})`)
  console.log('✓ UrgentCare Indy seed complete!')
  console.log(`\n📝 Note: Triage Agent UI will be rendered client-side in the booking flow.`)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Clean up in reverse order
  const tenant = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: 'urgent-care' } },
  })

  if (tenant.docs.length > 0) {
    const tenantId = tenant.docs[0].id

    // Delete pages
    await payload.delete({
      collection: 'pages',
      where: { tenant: { equals: tenantId } },
    })

    // Delete services
    await payload.delete({
      collection: 'services',
      where: { tenant: { equals: tenantId } },
    })

    // Delete tenant
    await payload.delete({
      collection: 'tenants',
      id: tenantId,
    })

    console.log('✓ Rolled back UrgentCare Indy seed')
  }
}
