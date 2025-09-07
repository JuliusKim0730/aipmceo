export type ImageContext =
  | { type: 'none' }
  | { type: 'url'; src: string; alt?: string; fit?: 'cover'|'contain' }
  | { type: 'figure'; src: string; alt?: string; caption?: string; fit?: 'cover'|'contain' }
  | { type: 'icon'; name: string; label?: string };

export type BaseSlideProps = {
  title: string;
  subTitle?: string;
  imageContext?: ImageContext;
  className?: string;
  children?: React.ReactNode;
};

export type BulletItem = { label: string; desc?: string };
export type KPI = { label: string; value: string; delta?: string; hint?: string };
export type ComparePoint = { title: string; bullets: string[] };
export type FrameworkStep = { title: string; desc?: string; icon?: string };

