import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  cards = [],
  width = "w-64",      
  height = "h-80",     
  onActiveCardChange,  
  randomRotation = false,
  sensitivity = 200,
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = true, 
  mobileClickOnly = false,
  mobileBreakpoint = 768
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [stack, setStack] = useState(() => {
    return cards.map((card, index) => ({ ...card, internalId: index + 1 }));
  });
  
  // ADD THIS REF to track the last sent card
  const lastReportedCard = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  useEffect(() => {
    if (cards.length) {
      setStack(cards.map((card, index) => ({ ...card, internalId: index + 1 })));
    }
  }, [cards]);

  // UPDATE THIS USEEFFECT to check against the ref before firing
  useEffect(() => {
    if (stack.length > 0 && onActiveCardChange) {
      const topCard = stack[stack.length - 1];
      
      // Only trigger the parent callback if the top card is actually a different card
      if (lastReportedCard.current !== topCard.id) {
        lastReportedCard.current = topCard.id;
        onActiveCardChange(topCard);
      }
    }
  }, [stack, onActiveCardChange]);

  const sendToBack = (id) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.internalId === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card); 
      return newStack;
    });
  };

  return (
    <div className={`relative ${width} ${height}`} style={{ perspective: 600 }}>
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        return (
          <CardRotate
            key={card.internalId}
            onSendToBack={() => sendToBack(card.internalId)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="rounded-2xl overflow-hidden w-full h-full shadow-lg"
              onClick={() => shouldEnableClick && sendToBack(card.internalId)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}