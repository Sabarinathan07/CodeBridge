import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData, history);
	};

	return (
		<Fragment>
			<div className="login-box">
			<h1 className='large text-primary heading head2'>Add Education</h1>
			{/* <p className='lead'>
				<i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
				that you have attended
			</p> */}
			{/* <small>*required</small> */}
			<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group textbox'>
					<i class="fas fa-school"></i>
					<input
						type='text'
						placeholder='School or University'
						name='school'
						value={school}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
					<div className='form-group textbox'>
					<i class="fas fa-graduation-cap"></i>
					<input
						type='text'
						placeholder='Degree or Qualification'
						name='degree'
						value={degree}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
					<div className='form-group textbox'>
					<i class="fas fa-user-graduate"></i>
					<input
						type='text'
						placeholder='Field Of Study'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group textbox'>
						<h4 className='secondary-color'>From Date</h4>
						<i class="fas fa-calendar-minus"></i>
					<input
						type='date'
						name='from'
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
						Current School
					</p>
				</div>
				<div className='form-group textbox'>
						<h4 className='secondary-color'>To Date</h4>
						<i class="far fa-calendar-minus"></i>
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
						placeholder='Program Description'
						value={description}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
				</form>
				</div>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
