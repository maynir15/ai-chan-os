import React, { useState, useRef, useCallback } from 'react';

const GardenContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPanning, setIsPanning] = useState(false);
  const [viewState, setViewState] = useState({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const startPoint = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const { deltaY } = e;
    const scaleAmount = -deltaY / 500;
    const newScale = Math.min(Math.max(0.3, viewState.scale + scaleAmount), 2);
    setViewState(prev => ({ ...prev, scale: newScale }));
  }, [viewState.scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsPanning(true);
    startPoint.current = { x: e.clientX - viewState.offsetX, y: e.clientY - viewState.offsetY };
  }, [viewState.offsetX, viewState.offsetY]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    e.preventDefault();
    const newOffsetX = e.clientX - startPoint.current.x;
    const newOffsetY = e.clientY - startPoint.current.y;
    setViewState(prev => ({ ...prev, offsetX: newOffsetX, offsetY: newOffsetY }));
  }, [isPanning]);

  const handleMouseUpOrLeave = useCallback(() => {
    setIsPanning(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex-grow overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${viewState.offsetX}px, ${viewState.offsetY}px) scale(${viewState.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GardenContainer;
