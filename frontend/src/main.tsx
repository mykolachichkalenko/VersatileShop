import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if ('serviceWorker' in navigator) {
    //setting cookies
    navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.type === "SET_COOKIE") {
            const { name, value, maxAgeSec, path, sameSite } = event.data;

            document.cookie =
                `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ` +
                `Max-Age=${maxAgeSec}; Path=${path}; SameSite=${sameSite}`;
        }
    });

    navigator.serviceWorker.register('/service-worker.js')
        .catch(err => console.error('SW error', err));
}

createRoot(document.getElementById('root')!).render(
    <App/>
)
