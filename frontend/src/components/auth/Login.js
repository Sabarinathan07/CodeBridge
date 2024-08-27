import { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login({ email, password });
    };

    //Navigate if logged in
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <Fragment>
            <div className="login-box">
                <h1 className="large text-primary heading">Login</h1>
                {/* <p className='lead'>
				<i className='fas fa-user'></i> Sign Into Your Account
			</p> */}
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="textbox">
                        <i className="fas fa-user"></i>
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            autocomplete="none"
                            required
                        />
                    </div>
                    <div className="form-group textbox">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            autocomplete="none"
                            minLength="6"
                        />
                    </div>

                    <input
                        type="submit"
                        className="btn btn-primary form-btn"
                        value="Login"
                    />
                </form>
                <p className="my-1">
                    Doesn't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </Fragment>
    );
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
