declare module '*.module.css' {
  const classes: {readonly [key: string]: string};
  export default classes;
}

declare module '*.module.less' {
  const classes: {readonly [key: string]: string};
  export default classes;
}

declare module '*.module.scss' {
  const classes: {readonly [key: string]: string};
  export default classes;
}

declare module '*.module.sass' {
  const classes: {readonly [key: string]: string};
  export default classes;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
