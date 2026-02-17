import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // ── Step 1: Get UrgentCare Indy Tenant ─────────────────────────────────
  const urgentCareTenant = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: 'urgent-care' } },
  })

  if (urgentCareTenant.docs.length === 0) {
    console.log('⚠ UrgentCare Indy tenant not found. Skipping specialized services seed.')
    return
  }

  const tenantId = urgentCareTenant.docs[0].id

  console.log(`✓ Found UrgentCare Indy tenant (ID: ${tenantId})`)

  // ── Step 2: Create Dr. James D. Pike Provider ──────────────────────────
  const drPike = await payload.create({
    collection: 'providers',
    data: {
      tenant: tenantId,
      name: 'Dr. James D. Pike',
      title: 'MD',
      specialty: 'Pulmonary Medicine & Urgent Care',
      bio: 'Dr. James D. Pike founded UrgentCare Indy in 2007 with a mission to provide compassionate, high-quality care to the Indianapolis community. He specializes in pulmonary medicine and chronic respiratory conditions.',
    },
  })

  console.log(`✓ Created provider: ${drPike.name} (ID: ${drPike.id})`)

  // ── Step 3: Create Specialized Services ────────────────────────────────
  const specializedServices = [
    {
      title: 'LungCare - Asthma Management',
      slug: 'lungcare-asthma',
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
                  text: 'Specialized asthma care led by Dr. James D. Pike. Comprehensive evaluation, personalized treatment plans, and ongoing management to help you breathe easier.',
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
      category: 'Pulmonary',
      tenant: tenantId,
    },
    {
      title: 'LungCare - COPD Treatment',
      slug: 'lungcare-copd',
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
                  text: 'Expert COPD management including pulmonary function testing, medication optimization, and lifestyle modifications to improve your quality of life.',
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
      category: 'Pulmonary',
      tenant: tenantId,
    },
    {
      title: 'LungCare - Sleep Apnea Testing',
      slug: 'lungcare-sleep-apnea',
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
                  text: 'At-home sleep testing with the ApneaLink Plus device. Convenient, accurate diagnosis of sleep apnea without overnight hospital stays.',
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
      category: 'Pulmonary',
      tenant: tenantId,
    },
    {
      title: 'LungCare - Pulmonary Fibrosis',
      slug: 'lungcare-pulmonary-fibrosis',
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
                  text: 'Specialized care for pulmonary fibrosis with advanced diagnostic capabilities and comprehensive treatment planning.',
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
      category: 'Pulmonary',
      tenant: tenantId,
    },
    {
      title: 'LungCare - Chronic Respiratory Failure',
      slug: 'lungcare-respiratory-failure',
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
                  text: 'Comprehensive management of chronic respiratory failure with ongoing monitoring and coordinated care.',
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
      category: 'Pulmonary',
      tenant: tenantId,
    },
    {
      title: 'DOT Physicals',
      slug: 'occupational-dot-physicals',
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
                  text: 'Department of Transportation medical examinations for commercial drivers. Certified examiners provide thorough evaluations to keep Indianapolis employers compliant.',
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
      category: 'Orthopedics',
      tenant: tenantId,
    },
    {
      title: 'Drug Screening (Urine/Hair)',
      slug: 'occupational-drug-screening',
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
                  text: 'Professional drug screening services for employers including urine and hair follicle testing. Fast, accurate results you can trust.',
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
      icon: 'Microscope',
      category: 'Orthopedics',
      tenant: tenantId,
    },
    {
      title: 'Breath-Alcohol Testing',
      slug: 'occupational-breath-alcohol',
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
                  text: 'Professional breath-alcohol testing for workplace safety and compliance. Certified testing procedures for Indianapolis employers.',
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
      icon: 'Microscope',
      category: 'Orthopedics',
      tenant: tenantId,
    },
    {
      title: 'Fit-for-Duty Exams',
      slug: 'occupational-fit-for-duty',
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
                  text: 'Comprehensive fit-for-duty medical evaluations ensuring your workforce is healthy and ready to perform. Customized to your industry needs.',
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
      category: 'Orthopedics',
      tenant: tenantId,
    },
    {
      title: 'DXA Bone Density Scanning',
      slug: 'bone-density-scanning',
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
                  text: 'DXA bone density scanning for early detection of osteoporosis. Quick, painless screening to protect your bone health and prevent fractures.',
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
      category: 'Orthopedics',
      tenant: tenantId,
    },
  ]

  for (const service of specializedServices) {
    const created = await payload.create({
      collection: 'services',
      data: service as any,
    })
    console.log(`✓ Created specialized service: ${created.title} (ID: ${created.id})`)
  }

  console.log('✓ Specialized services seed complete!')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Find and delete specialized services
  const slugs = [
    'lungcare-asthma',
    'lungcare-copd',
    'lungcare-sleep-apnea',
    'lungcare-pulmonary-fibrosis',
    'lungcare-respiratory-failure',
    'occupational-dot-physicals',
    'occupational-drug-screening',
    'occupational-breath-alcohol',
    'occupational-fit-for-duty',
    'bone-density-scanning',
  ]

  for (const slug of slugs) {
    await payload.delete({
      collection: 'services',
      where: { slug: { equals: slug } },
    })
  }

  // Delete Dr. Pike provider
  await payload.delete({
    collection: 'providers',
    where: { name: { equals: 'Dr. James D. Pike' } },
  })

  console.log('✓ Rolled back specialized services seed')
}
