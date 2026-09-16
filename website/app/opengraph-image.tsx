import { ImageResponse } from 'next/og';

export const alt =
  'Basement Protocol: AI consulting and custom AI agents, built in India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0b0d10',
          color: '#f3f5f7',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <path d="M4 44V4H44V14H14V44H4Z" fill="#f3f5f7" />
            <path d="M20 44V20H44V30H30V44H20Z" fill="#f3f5f7" />
            <path d="M36 36H44V44H36V36Z" fill="#4D7CFF" />
          </svg>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 24,
              letterSpacing: 1,
              lineHeight: 1.15,
              borderLeft: '1px solid rgba(243,245,247,0.25)',
              paddingLeft: 22,
            }}
          >
            <span>BASEMENT</span>
            <span>PROTOCOL</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: -3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>AI consulting and custom</span>
            <span style={{ color: '#4D7CFF' }}>AI agents, built in India.</span>
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 28,
              color: 'rgba(243,245,247,0.62)',
            }}
          >
            Agents, workflow automation and dashboards for enterprises and SMEs.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: 'rgba(243,245,247,0.52)',
          }}
        >
          <span>basementprotocol.com</span>
          <span>WORK, REPROGRAMMED.</span>
        </div>
      </div>
    ),
    size,
  );
}
