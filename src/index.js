import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/GlobalStyle';
import Grid from './components/Grid/Grid';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Grid>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </Grid>
    </React.StrictMode>,
);

reportWebVitals();
