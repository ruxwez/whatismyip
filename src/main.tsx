import { render } from 'preact';
import App from './app';

// Importaciones de estilos
import 'animate.css';
import 'normalize.css';
import 'fix.css';
import './styles/global.scss';

render(<App />, document.getElementById('app')!);
