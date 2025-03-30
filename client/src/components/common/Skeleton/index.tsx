import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden ${className} animate-loading-skeleton opacity-70`}
    >
      <style>{`
        @keyframes loading-skeleton {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        .animate-loading-skeleton {
          background: linear-gradient(90deg, #b73abb, #d0579a, #e46e80, #d0579a, #b73abb);
          background-size: 200% auto;
          animation: loading-skeleton 2.5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Skeleton;
