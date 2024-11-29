import { Particles } from '@tsparticles/react'; // Uso correcto de `@tsparticles/react`
import { loadFull } from 'tsparticles'; // Motor principal

const ParticleBackground = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine); // Inicializa el motor completo
  };

  const options = {
    background: {
      color: { value: '#87CEEB' },
    },
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      size: { value: 20, random: true },
      move: { enable: true, speed: 1, direction: 'none', random: true },
    },
  };

  return <Particles id='tsparticles' init={particlesInit} options={options} />;
};

export default ParticleBackground;
