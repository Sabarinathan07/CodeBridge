import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import React from 'react';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Password do not much', 'danger');
		} else {
			register({ name, email, password });
		}
	};

	//Navigates if authenticated
	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<Fragment>
			<div className='login-box'>
			<h1 className='large text-primary heading'>Register</h1>
			{/* <p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p> */}
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group textbox'>
					<i className='fas fa-user'></i>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
					<div className='form-group textbox'>
					<i class="fas fa-envelope"></i>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
					
				</div>
					<div className='form-group textbox'>
						<i className='fas fa-lock'></i>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(e) => onChange(e)}
						required
						minLength='6'
					/>
				</div>
				<div className='form-group textbox'>
					{/* <i className='fas fa-lock'></i> */}
					<i class="fas fa-check-square"></i>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={(e) => onChange(e)}
						required
						minLength='6'
					/>
				</div>
				<input type='submit' className='btn btn-primary form-btn' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
				</p>
				</div>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

// type, payload
export default connect(mapStateToProps, { setAlert, register })(Register);
