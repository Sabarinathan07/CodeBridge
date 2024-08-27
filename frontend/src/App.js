import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import SwitchRoutes from './components/routing/Routes';
import { LOGOUT } from './actions/types';
import React from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
    useEffect(() => {
        // Check for token in LS
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        store.dispatch(loadUser());

        // Log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
        });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <div className="content-container">
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            {/* Assuming SwitchRoutes is a component that returns Routes, it should not be used as a Route directly. If it's meant to render specific routes, consider integrating it differently. */}
                        </Routes>
                        <SwitchRoutes />
                    </div>
                    <Footer />
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
