import { LandingPage } from '@/components/basement/landing';
import { aiLeadGeneration as c } from '@/lib/landing-content';
import { landingMetadata, LandingSchema } from '@/lib/landing-schema';
export const metadata = landingMetadata(c);
export default function Page() {
  return (
    <>
      <LandingSchema content={c} />
      <LandingPage content={c} />
    </>
  );
}
