const Footer = () => {
	return (
		<div>
			<footer>
				{/* <div>
					<div>
						Made with ❤️ By Sabari Nathan
						<a href='https://www.linkedin.com/in/sabari-nathan-b15514172/'>
							<i className='fab fa-linkedin fa-2x'></i>
						</a>
					</div>
				</div> */}
				<div className='footer-content'>
					{/* <h3>Sabari Blog</h3> */}
					<p>
						Made with ❤️ &nbsp;by Sabari Nathan
						<br />
						This project is open source, visit the{' '}
						<a href='https://github.com/Sabarinathan07/BLOG-MERN'>repo</a>.
                    </p>
                    <small>Follow me on</small>

					<ul className='socials'>
						<li>
							<a href='https://www.instagram.com/sabari_nathan07/'>
								<i className='fab fa-instagram fa-2x'></i>
							</a>
						</li>
						<li>
							<a href='https://github.com/Sabarinathan07/'>
								<i className='fab fa-github fa-2x'></i>
							</a>
						</li>
						<li>
							<a href='https://www.linkedin.com/in/sabari-nathan-b15514172/'>
								<i className='fab fa-linkedin fa-2x'></i>
							</a>
						</li>
						<li>
							<a href='https://twitter.com/im__Sabari'>
								<i className='fab fa-twitter fa-2x'></i>
							</a>
						</li>
						<li>
							<a href='https://stackoverflow.com/users/14132840/sabari'>
								<i className='fab fa-stack-overflow fa-2x'></i>
							</a>
						</li>
					</ul>
				</div>
				{/* <div className='footer-bottom'>
					<p>
						copyright &copy;2021 Sabari Blog 
					</p>
				</div> */}
			</footer>
		</div>
	);
};

export default Footer;
