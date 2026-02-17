import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // ── Step 1: Create PrimaryCare Indy Tenant ──────────────────────────────
  const tenant = await payload.create({
    collection: 'tenants',
    data: {
      name: 'PrimaryCare Indy',
      slug: 'primary-care',
      domains: [
        { domain: 'primarycareindy.com' },
        { domain: 'www.primarycareindy.com' },
      ],
      theme: 'navy-gold',
      currentWaitTime: 30,
      isOpen: true,
    },
  })

  console.log(`✓ Created tenant: ${tenant.name} (ID: ${tenant.id})`)

  // ── Step 2: Create Services ─────────────────────────────────────────────
  const serviceData: Array<{
    title: string
    slug: string
    description: any
    icon: string
    category: string
    tenant: number
  }> = [
    {
      title: 'Diabetes Management',
      slug: 'diabetes-management',
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
                  text: 'Comprehensive diabetes care including blood sugar monitoring, medication management, and lifestyle coaching to help you stay healthy.',
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
      category: 'Primary',
      tenant: tenant.id,
    },
    {
      title: 'Heart Health',
      slug: 'heart-health',
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
                  text: 'Cardiovascular care including blood pressure management, cholesterol monitoring, and heart disease prevention strategies.',
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
    {
      title: 'Mental Health',
      slug: 'mental-health',
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
                  text: 'Compassionate mental health support including depression and anxiety management, counseling referrals, and medication management.',
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
      icon: 'Brain',
      category: 'MentalHealth',
      tenant: tenant.id,
    },
    {
      title: 'Wellness Screenings',
      slug: 'wellness-screenings',
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
                  text: 'Preventative health screenings including annual physicals, cancer screenings, and immunizations to keep you healthy.',
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
      icon: 'ShieldCheck',
      category: 'Primary',
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
      title: 'Home - PrimaryCare Indy',
      slug: 'home',
      metaDescription:
        'Your partner in long-term wellness. Managing chronic conditions and preventative care in Indianapolis. Schedule your consultation today.',
      _status: 'published',
      blocks: [
        // Hero Block
        {
          blockType: 'hero',
          title: 'Your Partner in Long-Term Wellness.',
          subtitle:
            'Managing your health today for a healthier tomorrow. Our providers specialize in chronic condition management and preventative care.',
          ctaLabel: 'Schedule Consultation',
          showWaitTime: false,
        },
        // Service Grid
        {
          blockType: 'serviceGrid',
          heading: 'Clinical Focus Areas',
          services: services.map((s) => s.id),
        },
        // FAQ Block for Patient Tool info
        {
          blockType: 'faq',
          heading: 'Patient Resources',
          items: [
            {
              question: 'How do I access My Medical Locker?',
              answer:
                'My Medical Locker gives you secure 24/7 access to your medical records, test results, and visit summaries. Log in through our patient portal or download the mobile app.',
            },
            {
              question: 'What can I find in My Medical Locker?',
              answer:
                'Access your lab results, immunization records, visit notes, prescriptions, and upcoming appointments all in one secure place.',
            },
            {
              question: 'How do I schedule a consultation?',
              answer:
                'You can schedule a consultation by calling our office, using our online booking system, or through the My Medical Locker app.',
            },
          ],
        },
      ],
    },
  })

  console.log(`✓ Created home page: ${homePage.title} (ID: ${homePage.id})`)
  console.log('✓ PrimaryCare Indy seed complete!')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Clean up in reverse order
  const tenant = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: 'primary-care' } },
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

    console.log('✓ Rolled back PrimaryCare Indy seed')
  }
}
