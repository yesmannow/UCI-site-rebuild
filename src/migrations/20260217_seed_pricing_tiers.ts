import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // ── Get UrgentCare Indy Tenant ─────────────────────────────────────────
  const urgentCareTenant = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: 'urgent-care' } },
  })

  if (urgentCareTenant.docs.length === 0) {
    console.log('⚠ UrgentCare Indy tenant not found. Skipping pricing seed.')
    return
  }

  const tenantId = urgentCareTenant.docs[0].id
  console.log(`✓ Found UrgentCare Indy tenant (ID: ${tenantId})`)

  // ── Create Pricing Tiers ───────────────────────────────────────────────
  const pricingTiers = [
    {
      tenant: tenantId,
      levelName: 'Level 1 - Basic',
      price: 150,
      description: 'Simple office visit for minor cough, cold, or basic consultation.',
      siteType: 'Urgent' as const,
      includes: [
        { item: 'Basic consultation' },
        { item: 'Minor cough/cold treatment' },
        { item: 'Vital signs check' },
      ],
    },
    {
      tenant: tenantId,
      levelName: 'Level 2 - Standard',
      price: 200,
      description: 'Includes basic lab work or simple suturing procedures.',
      siteType: 'Urgent' as const,
      includes: [
        { item: 'Office visit' },
        { item: 'Basic lab work' },
        { item: 'Simple suturing' },
        { item: 'X-ray interpretation' },
      ],
    },
    {
      tenant: tenantId,
      levelName: 'Level 3 - Advanced',
      price: 250,
      description: 'Includes EKGs, complex suturing, or multiple diagnostic tests.',
      siteType: 'Urgent' as const,
      includes: [
        { item: 'Comprehensive consultation' },
        { item: 'EKG with interpretation' },
        { item: 'Complex suturing' },
        { item: 'Multiple diagnostic tests' },
        { item: 'IV therapy' },
      ],
    },
    {
      tenant: tenantId,
      levelName: 'Level 4 - Premium',
      price: 300,
      description: 'Comprehensive diagnostic suite and extended care for complex conditions.',
      siteType: 'Urgent' as const,
      includes: [
        { item: 'Extended consultation' },
        { item: 'Comprehensive diagnostic suite' },
        { item: 'Advanced imaging' },
        { item: 'Complex procedures' },
        { item: 'Extended monitoring' },
        { item: 'Specialist coordination' },
      ],
    },
  ]

  for (const tier of pricingTiers) {
    const created = await payload.create({
      collection: 'pricing',
      data: tier,
    })
    console.log(`✓ Created pricing tier: ${created.levelName} - $${created.price}`)
  }

  console.log('✓ UrgentCare pricing tiers seed complete!')
  console.log(
    '\n⚠️  DISCLAIMER: Prices are subject to change. We accept most major insurance including Anthem, Aetna, Cigna, and Medicare.'
  )
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Find and delete pricing tiers
  const urgentCareTenant = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: 'urgent-care' } },
  })

  if (urgentCareTenant.docs.length > 0) {
    const tenantId = urgentCareTenant.docs[0].id

    await payload.delete({
      collection: 'pricing',
      where: {
        tenant: { equals: tenantId },
        siteType: { equals: 'Urgent' },
      },
    })

    console.log('✓ Rolled back UrgentCare pricing tiers')
  }
}
