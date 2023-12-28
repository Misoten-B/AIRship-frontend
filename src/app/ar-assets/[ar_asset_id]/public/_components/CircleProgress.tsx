import { theme } from '@/shared/lib/mantine/ThemeProvider';

type Props = {
  progress: number[];
  duration: number;
  style?: React.CSSProperties;
};

export const CircularProgressBar = ({
  progress,
  duration,
  style,
  ...props
}: Props) => {
  const currProgress = progress[progress.length - 1];
  const radius = 26; // 円の半径
  const strokeWidth = 4; // 線の太さ
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const durationTime = duration * (progress[0] / 100);
  // 進捗に基づいて stroke-dashoffset を計算
  const strokeDashoffset = circumference - (currProgress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      {...props}
      style={{ transform: 'rotate(-90deg)', ...style }}
    >
      <circle
        stroke={
          currProgress == null
            ? theme.colors?.blue?.[2] ?? 'blue.2'
            : theme.colors?.orange?.[2] ?? 'orange.2'
        }
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: `stroke-dashoffset ${durationTime}s linear`,
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};
