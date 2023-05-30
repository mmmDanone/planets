import {FC, SVGProps} from 'react';

interface LevelProgressIndicatorProps extends SVGProps<SVGSVGElement> {
  withoutPoint?: boolean;
  percent: number;
  size: number;
}

export const LevelProgressIndicator: FC<LevelProgressIndicatorProps> = ({percent, withoutPoint, size, ...props}) => {
  const xCenter = size / 2;
  const yCenter = size / 2;
  const radius = size / 2 - 5;

  const xPointM = xCenter + radius * Math.cos(360 * (percent / 100) * (Math.PI / 180) + Math.PI / 2);
  const yPointM = yCenter - radius * Math.sin(360 * (percent / 100) * (Math.PI / 180) + Math.PI / 2);

  const polarToCartesian = (cx: number, cy: number, radius: number, deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad)
    };
  };

  const indicator = (x: number, y: number, radius: number, angleStart: number, angleEnd: number) => {
    const start = polarToCartesian(x, y, radius, -angleEnd),
      end = polarToCartesian(x, y, radius, angleStart),
      largeArc = angleEnd - angleStart <= 180 ? 0 : 1;
    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArc, 1, end.x, end.y].join(' ');
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{
        transform: 'rotateY(180deg)'
      }}
      {...props}
    >
      <circle cx={xCenter} cy={yCenter} r={radius} stroke="#3e3e40" strokeWidth="1" fill="transparent" />
      {percent == 100 ? (
        <circle cx={xCenter} cy={yCenter} r={radius} stroke="#ffffff" strokeWidth="2" fill="transparent" />
      ) : (
        <path
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="2"
          d={indicator(xCenter, yCenter, radius, 0, 360 * (percent / 100))}
        />
      )}

      {percent != 100 && !withoutPoint && <circle cx={xPointM} cy={yPointM} r="4" fill="#ffffff" />}
    </svg>
  );
};
