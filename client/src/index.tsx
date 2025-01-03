import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { UploadProvider } from './context/UploadContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<PersistGate persistor={persistor}>
					<UploadProvider>
						<App />
					</UploadProvider>
				</PersistGate>
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
