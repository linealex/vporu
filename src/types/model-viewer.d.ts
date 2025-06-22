declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      'camera-controls'?: boolean;
      'auto-rotate'?: boolean;
      style?: React.CSSProperties;
    };
  }
} 