import { Fragment } from 'react';
import spinner from './spinner.gif';
import React from 'react';

const Spinner = () => (
	<Fragment>
		<img
			src={spinner}
			style={{ width: '200px', margin: 'auto', display: 'block' }}
			alt='Loading...'
		/>
	</Fragment>
);

export default Spinner;
