// src/RenderCounter.tsx
import React, { useRef, useState, useEffect } from "react";

const RenderCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const renderCount = useRef<number>(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <p>Componenta s-a randat de {renderCount.current} ori</p>
      <button onClick={() => setCount(count + 1)}>Creste</button>
    </div>
  );
};

export default RenderCounter;
