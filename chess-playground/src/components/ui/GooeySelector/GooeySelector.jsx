import { useRef, useEffect, useState } from 'react';

const GooeySelector = ({
  items,
  onSelect,
  animationTime = 800,
  particleCount = 30,
  particleDistances = [90, 15],
  particleR = 100,
  timeVariance = 1000,
  initialActiveIndex = 3 // Default to Random
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  
  // Accepts a custom list of colors for the particles
  const createParticle = (i, t, d, r, particleColors) => {
    let rotate = noise(r / 10);
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: color,
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element, particleColors) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r, particleColors);
      element.classList.remove('active');
      
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        // Apply the exact hex/rgb string
        particle.style.setProperty('--color', p.color);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // do nothing
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = element => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    
    // Copy HTML to the floating text layer
    textRef.current.innerHTML = element.innerHTML;
  };

  const setItemColors = (item) => {
    if (filterRef.current) {
      filterRef.current.style.setProperty('--pill-color', item.pillColor || 'white');
    }
    if (textRef.current) {
      textRef.current.style.setProperty('--active-text-color', item.activeTextColor || 'black');
    }
    if (containerRef.current) {
      containerRef.current.style.setProperty('--active-text-color', item.activeTextColor || 'black');
    }
  };

  const handleClick = (e, index, item) => {
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    
    setActiveIndex(index);
    setItemColors(item);

    if (onSelect) onSelect(item);
    
    updateEffectPosition(liEl);
    
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    if (filterRef.current) {
      // Pass the item's specific particle colors or fall back to the pill color
      makeParticles(filterRef.current, item.particleColors || [item.pillColor || 'white']);
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    
    const activeItem = items[activeIndex];
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    
    if (activeLi && activeItem) {
      setItemColors(activeItem);
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }
    
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex, items]);

  return (
    <>
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: flex;
            place-items: center;
            z-index: 1;
          }
          .effect.text {
            color: white;
            transition: color 0.3s ease;
          }
          /* Apply dynamic text color when active */
          .effect.text.active {
            color: var(--active-text-color, black);
          }
          .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: black; 
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            /* Apply dynamic pill color */
            background: var(--pill-color, white);
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 24px;
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            /* Particles now use the dynamically assigned color */
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% { transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y))); opacity: 1; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
            70% { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; animation-timing-function: ease; }
            85% { transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y))); opacity: 1; }
            100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 1; }
          }
          @keyframes point {
            0% { transform: scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
            25% { transform: scale(calc(var(--scale) * 0.25)); }
            38% { opacity: 1; }
            65% { transform: scale(var(--scale)); opacity: 1; animation-timing-function: ease; }
            85% { transform: scale(var(--scale)); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
          }
          /* Apply dynamic text color to the real li element when active to hide it under the gooey layer nicely */
          li.active {
            color: var(--active-text-color, black);
            text-shadow: none;
          }
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 24px;
            background: transparent;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
        `}
      </style>
      <div className="relative w-full" ref={containerRef}>
        <nav className="flex relative w-full" style={{ transform: 'translate3d(0,0,0.01px)' }}>
          <ul
            ref={navRef}
            className="grid grid-cols-2 gap-4 list-none p-0 m-0 relative z-3 w-full"
            style={{
              color: 'white',
              textShadow: '0 1px 1px hsl(205deg 30% 10% / 0.2)'
            }}>
            {items.map((item, index) => (
              <li
                key={index}
                onClick={e => handleClick(e, index, item)}
                className={`
                  ${item.className || ''} 
                  rounded-3xl relative cursor-pointer 
                  transition-all duration-300 ease text-white border border-neutral-700 hover:border-neutral-500
                  ${activeIndex === index ? 'active border-transparent hover:border-transparent' : ''}
                `}>
                <div className="py-2 px-2 w-full h-full flex flex-col items-center justify-center pointer-events-none text-center">
                  {item.content}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeySelector;