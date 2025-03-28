import { useEffect, useRef, useState } from 'react';

/**
 * 웨이브 애니메이션을 관리하는 커스텀 훅
 * 숫자(longIdx)를 일정 간격으로 증가/감소시키며 애니메이션 효과를 만듦
 * @param {boolean} isPlay 애니메이션을 실행할지 여부
 * @returns {number} 현재 애니메이션의 인덱스 (0~19 사이를 반복)
 */
function useWavePlay(isPlay: boolean): number {
  const [longIdx, setLongIdx] = useState<number>(-1);
  const [direction, setDirection] = useState<number>(1); // 1이면 오른쪽, -1이면 왼쪽
  const aniRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now()); // 마지막으로 <div>가 바뀐 시간

  useEffect(() => {
    if (!isPlay) {
      setLongIdx(-1);
      setDirection(1);
      return;
    }

    /**
     * 애니메이션 실행 함수
     * @param {number} time 브라우저의 현재 시간 (ms 단위)
     */
    const animate = (time: number) => {
      // 100ms마다 숫자를 업데이트하여 애니메이션 속도를 일정하게 유지
      if (time - lastTimeRef.current >= 100) {
        setLongIdx((prev) => {
          if (prev === 20) {
            setDirection(-1);
            return 18;
          } else if (prev === 0) {
            setDirection(1);
            return 1;
          }
          return prev + direction;
        });

        lastTimeRef.current = time; // 마지막 업데이트 시간 갱신
      }

      // 다음 프레임에서 animate 함수를 다시 실행하여 애니메이션을 지속
      aniRef.current = requestAnimationFrame(animate);
    };

    // 애니메이션 시작
    aniRef.current = requestAnimationFrame(animate);

    return () => {
      if (aniRef.current) {
        cancelAnimationFrame(aniRef.current);
      }
    };
  }, [isPlay, direction]);

  return longIdx;
}

export default useWavePlay;
