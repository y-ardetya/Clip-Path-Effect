import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import React, { Suspense, useRef } from "react";
import { Text } from "@react-three/drei";

window.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const x = Math.round((clientX / window.innerWidth) * 100);
  const y = Math.round((clientY / window.innerHeight) * 100);

  gsap.to(".overlay", {
    "--x": `${x}%`,
    "--y": `${y}%`,
    duration: 0.5,
    ease: "sine.out",
  });
});

window.addEventListener("touchmove", (e) => {
  const { clientX, clientY } = e;
  const x = Math.round((clientX / window.innerWidth) * 100);
  const y = Math.round((clientY / window.innerHeight) * 100);

  gsap.to(".overlay", {
    "--x": `${x}%`,
    "--y": `${y}%`,
    duration: 0.5,
    ease: "sine.out",
  });
});

const CanvasOne = () => {
  return (
    <div className="section">
      <Canvas>
        <color attach="background" args={["white"]} />
        <ambientLight intensity={5} />
        <CanvasOneProp />
      </Canvas>
    </div>
  );
};

const CanvasOneProp = () => {
  const firstRef = useRef();
  useFrame((state, delta) => {
    firstRef.current.rotation.x += delta * 0.03;
    firstRef.current.rotation.y += delta * 0.03;
  });

  return (
    <>
      <mesh scale={3} ref={firstRef}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="black" wireframe />
      </mesh>
      <Text
        position={[0, 0, 3]}
        scale={1}
        font="/SedgwickAveDisplay-Regular.ttf"
      >
        DUALITY
      </Text>
    </>
  );
};

const CanvasTwo = () => {
  return (
    <div className="section overlay">
      <Canvas>
        <color attach="background" args={["#000000"]} />
        <CanvasTwoProp />
      </Canvas>
    </div>
  );
};

const CanvasTwoProp = () => {
  const secondRef = useRef();
  useFrame((state, delta) => {
    secondRef.current.rotation.x += delta * 0.03;
    secondRef.current.rotation.y += delta * 0.03;
  });
  return (
    <>
      <mesh scale={3} ref={secondRef}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
      <Text
        position={[0, 0, 3]}
        color="hotpink"
        scale={1}
        font="/SedgwickAveDisplay-Regular.ttf"
      >
        DUALITY
      </Text>
    </>
  );
};

const App = () => {
  return (
    <>
      <Suspense fallback={null}>
        <CanvasOne />
        <CanvasTwo />
      </Suspense>
    </>
  );
};

export default App;
