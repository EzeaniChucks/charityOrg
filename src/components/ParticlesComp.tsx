import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
// import { loadSlim } from "tsparticles-slim";

const ParticlesComp = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // loadSlim(engine);
    await loadFull(engine);
  }, []);

  const options = useMemo(() => {
    return {
      background: {
        // color: { value: "#000000" },
      },
      backgroundMask: {
        // enable: true,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        velocity: -4,
        collisions: {
          enable: true,
        },
        move: {
          direction: "right",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        // attract: {
        //   enable: false,
        //   rotateX: 600,
        //   rotateY: 1200,
        // },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };
  }, []);
  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  return (
    <Particles
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
  );
};

export default ParticlesComp;
