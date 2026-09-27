import { ImageResponse } from 'next/og';
import { getGuide } from '@/lib/guides';
export const alt = 'AI build guides by Manikk.ai on Basement Protocol';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: 70, background: '#0B0D10', color: '#F3F5F7', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', fontSize: 28, color: '#9eb7ff' }}>Guides by Manikk.ai</div><div style={{ display: 'flex', fontSize: 72, lineHeight: 1.05, maxWidth: 1000 }}>{guide?.title ?? 'Practical AI build guides'}</div><div style={{ display: 'flex', fontSize: 24, borderTop: '1px solid #42464c', paddingTop: 28 }}>BASEMENT PROTOCOL · Read the build. Keep the guide.</div></div>, size);
}
