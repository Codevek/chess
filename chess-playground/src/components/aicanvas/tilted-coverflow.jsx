import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SCALE_BY_OFFSET = [1.0, 0.86, 0.72, 0.58];
const ROTATION_PER_STEP = 12;
const ARC_Y = 6;
const GAP_PX = 24;

const SPRING_FAST = { type: 'spring', stiffness: 400, damping: 28 };
const SPRING_SMOOTH = { type: 'spring', stiffness: 200, damping: 24 };

function visibleOffset(cardIndex, focus, total) {
  const half = Math.floor(total / 2);
  let off = cardIndex - focus;
  if (off > half) off -= total;
  if (off < -half) off += total;
  return off;
}

function buildXPositions(scales, baseWidth, gap) {
  const positions = new Map();
  positions.set(0, 0);
  let cursor = 0;
  for (let i = 1; i <= 3; i++) {
    const step = ((scales[i - 1] + scales[i]) / 2) * baseWidth + gap;
    cursor += step;
    positions.set(i, cursor);
    positions.set(-i, -cursor);
  }
  return positions;
}

export default function ProfileCoverflow({
  profiles = [],
  isSpinning = false,
  targetIndex = 0,
  onManualSelect,
  width = '100%',
  height = '340px',
  cardWidth = 190,
  cardHeight = 260,
  className = '',
}) {
  const [focus, setFocus] = useState(targetIndex);
  const totalProfiles = profiles.length;
  const maxSide = 3;

  // Sync external target index when not spinning
  useEffect(() => {
    if (!isSpinning) {
      setFocus(targetIndex);
    }
  }, [targetIndex, isSpinning]);

  // Infinite spin effect when isSpinning is true
  useEffect(() => {
    let timeoutId;
    if (isSpinning) {
      const spin = () => {
        setFocus((prev) => (prev + 1) % totalProfiles);
        timeoutId = setTimeout(spin, 120); // Adjust ms for spin speed
      };
      spin();
    }
    return () => clearTimeout(timeoutId);
  }, [isSpinning, totalProfiles]);

  const handleCardClick = (index, hidden, isFocus) => {
    if (isSpinning || hidden || isFocus) return;
    setFocus(index);
    if (onManualSelect) onManualSelect(index);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <div
        className="relative flex w-full items-center justify-center"
        style={{ perspective: '1200px', height: `${cardHeight}px` }}
      >
        {(() => {
          const positions = buildXPositions(SCALE_BY_OFFSET, cardWidth, GAP_PX);

          return profiles.map((profile, index) => {
            const offset = visibleOffset(index, focus, totalProfiles);
            const absOffset = Math.abs(offset);
            const hidden = absOffset > maxSide;
            const isFocus = offset === 0;

            const scale = SCALE_BY_OFFSET[absOffset] ?? 0.5;
            const rotateY = -offset * ROTATION_PER_STEP;
            const translateX = positions.get(offset) ?? 0;
            const translateY = absOffset * ARC_Y;

            return (
              <motion.div
                key={profile.id ?? index}
                onClick={() => handleCardClick(index, hidden, isFocus)}
                className="absolute select-none"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transformStyle: 'preserve-3d',
                  pointerEvents: hidden ? 'none' : 'auto',
                  zIndex: totalProfiles - absOffset,
                  cursor: isSpinning ? 'default' : isFocus ? 'default' : 'pointer',
                }}
                animate={{
                  x: translateX,
                  y: translateY,
                  rotateY,
                  scale,
                  opacity: hidden ? 0 : 1,
                }}
                transition={isSpinning ? SPRING_FAST : SPRING_SMOOTH}
              >
                {/* Check if it's the empty placeholder profile */}
                {profile.isEmpty ? (
                  <div
                    className={`relative flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors duration-300 ${
                      isFocus
                        ? 'border-slate-500 bg-slate-800/80 shadow-lg'
                        : 'border-slate-700/50 bg-slate-800/30'
                    }`}
                  >
                    <span className="mb-3 text-3xl opacity-50">📩</span>
                    <span className="text-center text-sm font-medium text-slate-400 px-4">
                      {profile.fullName}
                    </span>
                  </div>
                ) : (
                  /* Standard Profile Card */
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      isFocus && !isSpinning
                        ? 'border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.2)]'
                        : 'border-slate-700/60 opacity-80'
                    } bg-slate-800`}
                  >
                    <img
                      src={profile.avatar}
                      alt={profile.fullName}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                    
                    {profile.username && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-slate-950/80 px-2 py-1 backdrop-blur-md border border-slate-700/50">
                        <span className="text-xs font-black text-amber-400">{profile.username}</span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 pt-12 flex flex-col justify-end">
                      <h4 className="text-base font-bold text-white truncate">{profile.fullName}</h4>
                      {profile.rating && (
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-slate-400 font-medium">Rating</span>
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            ⚡ {profile.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          });
        })()}
      </div>
    </div>
  );
}