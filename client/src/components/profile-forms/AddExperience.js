import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addExperience(formData, history);
	};

	return (
		<Fragment>
			<div className='login-box'>
				<h1 className='large text-primary heading head2'>Add Experience</h1>
				{/* <p className='lead'>
				<i className='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p> */}
				{/* <small>*required</small> */}
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group textbox'>
						<i class='fas fa-briefcase'></i>
						<input
							type='text'
							placeholder='Job Title'
							name='title'
							value={title}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className='form-group textbox'>
						<i class='fas fa-building'></i>
						<input
							type='text'
							placeholder='Company'
							name='company'
							value={company}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className='form-group textbox'>
						<i class='fas fa-map-marker-alt'></i>
						<input
							type='text'
							placeholder='Location'
							name='location'
							value={location}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='form-group textbox'>
						<h4 className='secondary-color'>From Date</h4>
						<i class='fas fa-calendar-minus'></i>
						<input
							type='date'
							name='from'
							placeholder='dd/mm//yyyy'
							value={from}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className='form-group'>
						<p>
							<input
								type='checkbox'
								name='current'
								value={current}
								checked={current}
								onChange={(e) => {
									setFormData({ ...formData, current: !current });
									toggleDisabled(!toDateDisabled);
								}}
							/>{' '}
							Current Job
						</p>
					</div>
					<div className='form-group textbox'>
						<h4 className='secondary-color'>To Date</h4>
						<i class='far fa-calendar-minus'></i>
						<input
							type='date'
							name='to'
							value={to}
							onChange={(e) => onChange(e)}
							disabled={toDateDisabled ? 'disabled' : ''}
						/>
					</div>
					<div className='form-group textbox'>
						<i class='fab fa-discourse'></i>
						<input
							type='text'
							name='description'
							cols='30'
							rows='5'
							placeholder='Job Description'
							value={description}
							onChange={(e) => onChange(e)}
						></input>
					</div>
					<input type='submit' className='btn btn-primary my-1 form-btn-2' />
					<Link className='btn btn-light my-1 form-btn-3' to='/dashboard'>
						Go Back
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
