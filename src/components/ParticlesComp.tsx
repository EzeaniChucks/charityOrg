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
    // return {}
    return {
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
          value: "#FF0000",
          // value: "#eeeeee",
        },
        velocity: -4,
        collisions: {
          enable: true,
        },
        move: {
          enable: true,
          direction: 360,
          out_modes: "out",
          random: false,
          speed: 6,
          straight: false,
        },
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
      options={options}
      loaded={particlesLoaded}
    />
  );
};

export default ParticlesComp;
