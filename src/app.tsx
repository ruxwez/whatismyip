import { JSX } from 'preact/jsx-runtime';
import Copy from './utils/copy';
import { useEffect, useId, useState } from 'preact/hooks';
import c from 'classnames';
import LoadingScreen from './loading';

function App() {
  const PopperID = useId();

  const [ip, setIp] = useState('192.168.1.1');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => {
        setIp(data.ip);
        setIsLoading(true);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const HandlerClick = (
    e: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    Copy(ip);

    setIsCopy(true);

    // Animation fade-out with TimeOut and Animate.css
    setTimeout(() => {
      document.getElementById(PopperID)?.classList.add('animate__fadeOut');
      setTimeout(() => {
        setIsCopy(false);
      }, 1000);
    }, 3000);
  };

  if (!isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div class={'Page'}>
      <div class={'Container'}>
        <h1 class={'animate__animated animate__fadeInDown'}>What is my ip</h1>
        <button
          onClick={HandlerClick}
          class={'Content animate__animated animate__fadeIn'}
        >
          <h2
            class={c('animate__animated', {
              animate__rubberBand: isCopy,
            })}
          >
            {ip}
          </h2>
          {isCopy && (
            <p id={PopperID} class={'popper animate__animated animate__fadeIn'}>
              Copied
            </p>
          )}
        </button>
        <p class={'animate__animated animate__fadeInUp'}>
          Create by{' '}
          <a
            href="https://ruxwez.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ruxwez
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
