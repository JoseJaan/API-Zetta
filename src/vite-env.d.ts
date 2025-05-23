/// <reference types="vite/client" />

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }