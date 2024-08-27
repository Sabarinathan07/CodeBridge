import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import formatDate from '../../utils/formatDate';
import React from 'react';

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			{/* {exp.title ? <td>null</td> : <td>not null</td>} */}
			<td className='hide-sm'>{exp.title}</td>
			<td className='hide-sm'>
				{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
			</td>

			<td>
				<button
					onClick={() => deleteExperience(exp._id)}
					className='btn btn-danger'
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className='my-2'>Experience Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
						<th></th>
					</tr>
				</thead>

				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
