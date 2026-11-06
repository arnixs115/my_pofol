import type { Metadata } from 'next';
import './globals.css';
import './portfolio.css';
import { publicAsset } from '../lib/paths';
export const metadata: Metadata = {
  title: '허승환 | BR-A — 기록에서 다음 질문으로',
  description: '생명정보학에서 AI와 서비스 개발로. 허승환의 학습 기록, 연구와 프로젝트 포트폴리오.',
  robots: { index: true, follow: true },
  icons: { icon: publicAsset('/icon.svg') },
};
export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ko"><body>{children}</body></html>;
}
