import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
				<h1 className='x-large'>HackNode</h1>
					{/* <p className='lead'>
						Create your own Profile/Portfolio, share your own posts and likes or
						comment other posts. And connect with everyone.
					</p> */}
					<p className="lead-1">
						We Unite,&nbsp;We conquer!
					</p>
					<p className="lead">
						A unique community to join hands with fellow developers who have similiar interests as You <br/> 
						Create your own Account and start Vibing!
					</p>

					<div className='buttons'>
						<Link to='/register' className='btn btn-primary'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-light'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
