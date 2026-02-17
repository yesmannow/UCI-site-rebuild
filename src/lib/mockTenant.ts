import { getTenant } from './getTenant';

export async function mockTenant() {
  const urlParams = new URLSearchParams(window.location.search);
  const mockTenantSlug = urlParams.get('tenant');

  if (mockTenantSlug) {
    return { slug: mockTenantSlug, theme: mockTenantSlug === 'primary-care' ? 'navy-gold' : 'teal-orange' };
  }

  return getTenant();
}