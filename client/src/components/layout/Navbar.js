import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './Button.css';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li className='nav-link'>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li className='nav-link'>
				<Link to='/posts'>Posts</Link>
			</li>
			<li className='nav-link'>
				<Link to='/dashboard'>
					<i className='fas fa-user'></i>{' '}
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link className='button-box' onClick={logout} to='#!'>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>Logout</span>
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li className='nav-link'>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li className='nav-link'>
				<Link to='/register'>Register</Link>
			</li>
			<li >
				<Link className='button-box'to='/login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/' className="navbar-logo">
					<i className='fas fa-code'></i>&nbsp;HackNode
				</Link>
			</h1>

			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
