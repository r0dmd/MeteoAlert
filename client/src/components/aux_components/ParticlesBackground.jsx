import { useEffect } from 'react';

const ParticlesBackground = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 82,
            density: {
              enable: true,
              value_area: 4409.383167380188,
            },
          },
          color: {
            value: '#ffffff',
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000',
            },
            polygon: {
              nb_sides: 3,
            },
            image: {
              src: 'https://static.vecteezy.com/system/resources/previews/010/174/972/original/simple-sunny-day-cloud-image-realistic-cloud-on-a-transparent-background-cloud-on-the-sky-free-png.png',
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.585,
            random: true,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 100,
            random: true,
            anim: {
              enable: false,
              speed: 50,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'left',
            random: true,
            straight: true,
            out_mode: 'out',
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false,
            },
            onclick: {
              enable: false,
              mode: 'repulse',
            },
          },
          modes: {
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        retina_detect: true,
      });
    }
  }, []);

  return (
    <div
      id='particles-js'
      className='absolute top-0 left-0 w-full h-full -z-10'
    />
  );
};

export default ParticlesBackground;
