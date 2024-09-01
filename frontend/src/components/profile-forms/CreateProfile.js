import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import React from 'react';

const CreateProfile = ({
    createProfile,
    getCurrentProfile,
    profile: { profile, loading },
    history,
}) => {
    const navigate = useNavigate(); // useNavigate hook

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history);
        navigate('/dashboard');
    };

    useEffect(() => {
        getCurrentProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCurrentProfile]);

    return (
        <Fragment>
            <div className="">
                <h1 className="large text-primary heading head2">
                    Create Your Profile
                </h1>
                {/* <p className='lead'>
				<i className='fas fa-user'></i> Let's get some information to make your
				profile stand out
			</p> */}
                {/* <small>* required</small> */}
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group textbox">
                        <i class="fas fa-user"></i>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => onChange(e)}
                            className="margin-left"
                        >
                            <option value="0">
                                Select Professional Status
                            </option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">
                                Junior Developer
                            </option>
                            <option value="Senior Developer">
                                Senior Developer
                            </option>
                            <option value="Manager">Manager</option>
                            <option value="Student">Student</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        {/* <small className='form-text'>
						Give us an idea of where you are at in your career
					</small> */}
                    </div>
                    <div className="form-group textbox">
                        <i class="fas fa-building"></i>
                        <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={company}
                            onChange={(e) => onChange(e)}
                        />
                        {/* <small className='form-text'>
						Could be your own company or one you work for
					</small> */}
                    </div>
                    <div className="form-group textbox">
                        <i class="fab fa-chrome"></i>
                        <input
                            type="text"
                            placeholder="Website"
                            name="website"
                            value={website}
                            onChange={(e) => onChange(e)}
                        />
                        {/* <small className='form-text'>
						Could be your own or a company website
					</small> */}
                    </div>
                    <div className="form-group textbox">
                        <i class="fas fa-map-marker-alt"></i>
                        <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={location}
                            onChange={(e) => onChange(e)}
                        />
                        {/* <small className='form-text'>
						City & state suggested (eg. Boston, MA)
					</small> */}
                    </div>
                    <div className="form-group textbox">
                        <i class="fas fa-brain"></i>
                        <input
                            type="text"
                            placeholder="Skills"
                            name="skills"
                            value={skills}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <small className="form-text">
                        &nbsp; &nbsp; (Eg. HTML, CSS, JavaScript,PHP)
                    </small>
                    <div className="form-group textbox">
                        <i class="fab fa-github"></i>
                        <input
                            type="text"
                            placeholder="Github Username"
                            name="githubusername"
                            value={githubusername}
                            onChange={(e) => onChange(e)}
                        />
                        {/* <small className='form-text'>
						If you want your latest repos and a Github link, include your
						username
					</small> */}
                    </div>
                    <div className="form-group ">
                        <textarea
                            placeholder="A short bio of yourself"
                            rows={5}
                            cols={100}
                            name="bio"
                            value={bio}
                            onChange={(e) => onChange(e)}
                        ></textarea>
                        {/* <small className='form-text'>Tell us a little about yourself</small> */}
                    </div>

                    <div className="my-2">
                        <button
                            onClick={() =>
                                toggleSocialInputs(!displaySocialInputs)
                            }
                            type="button"
                            className="btn btn-light"
                        >
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>
                    {displaySocialInputs && (
                        <Fragment>
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Twitter URL"
                                    name="twitter"
                                    value={twitter}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Facebook URL"
                                    name="facebook"
                                    value={facebook}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="YouTube URL"
                                    name="youtube"
                                    value={youtube}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Linkedin URL"
                                    name="linkedin"
                                    value={linkedin}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Instagram URL"
                                    name="instagram"
                                    value={instagram}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                        </Fragment>
                    )}

                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="/dashboard">
                        Go Back
                    </Link>
                </form>
            </div>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    CreateProfile
);
