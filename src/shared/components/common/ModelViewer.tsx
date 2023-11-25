'use client';
import '@google/model-viewer';
import { ARMode } from '@google/model-viewer/lib/features/ar';
import dynamic from 'next/dynamic';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': {
        src: string;
        poster: string;
        alt: string;
        ar: boolean;
        scale: string;
        children?: Element;
      };
    }
  }
}

type Props = {
  poster: string;
  glb: string;
  usdz: string;
  alt: string;
  autoRotate?: boolean;
  ar?: boolean;
  arMode?: ARMode;
  cameraControl?: boolean;
  scale?: `${number} ${number} ${number}`;
  height?: string;
  children?: JSX.Element;
  arButtonPosition?: {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
};
export const ModelViewerCore = (props: Props) => {
  return (
    <model-viewer
      camera-controls={props.cameraControl}
      src={props.glb}
      ios-src={props.usdz}
      poster={props.poster}
      alt={props.alt}
      shadow-intensity="1"
      ar={props.ar!!}
      ar-mode={props.arMode}
      auto-rotate={props.autoRotate}
      ar-modes="webxr scene-viewer quick-look"
      scale={
        props.scale ? `${props.scale} ${props.scale} ${props.scale}` : '1 1 1'
      }
    >
      {props.children}
    </model-viewer>
  );
};

export const ModelViewer = dynamic(
  async () => {
    const p = await import('./ModelViewer');
    return p.ModelViewerCore;
  },
  { ssr: false },
);
