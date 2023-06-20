import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/GlobalStyle';
import Grid from './components/Grid/Grid';
import { ErrorIcon } from './components/Icons';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        {window.innerWidth >= 1024 ? (
            <Grid>
                <GlobalStyle>
                    <App />
                </GlobalStyle>
            </Grid>
        ) : (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ErrorIcon width="20rem" height="20rem" />
                <span
                    style={{
                        fontSize: '2rem',
                        padding: '15px 30px',
                        textAlign: 'center',
                        fontWeight: '700',
                        lineHeight: '2.8rem',
                    }}
                >
                    Trang web hiện không hỗ trợ phiên bản trên mobile. Xin lỗi vì sự bấc tiện này
                </span>
            </div>
        )}
    </React.StrictMode>,
);

reportWebVitals();
