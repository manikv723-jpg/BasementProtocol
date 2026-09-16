import 'server-only';
import { priceForCountry } from './pricing';

// Vercel supplies the visitor country. Never trust a browser-supplied currency or
// forwarded country header on other hosts. Unknown production locations use USD.
// Local development defaults to India; this explicit override is ignored on Vercel.
export function requestPrice(headers: Pick<Headers, 'get'>, environment: Record<string, string | undefined> = process.env) {
  const country = environment.VERCEL === '1'
    ? headers.get('x-vercel-ip-country')
    : environment.FOURUPLE_PREVIEW_COUNTRY || 'IN';
  return priceForCountry(country);
}
