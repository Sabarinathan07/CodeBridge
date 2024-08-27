import { Route, Routes } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../postForm/Posts';
import Post from '../commentForm/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import React from 'react';

const SwitchRoutes = (props) => {
    return (
        <section className="container">
            <Alert />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-profile"
                    element={
                        <PrivateRoute>
                            <CreateProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edit-profile"
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-experience"
                    element={
                        <PrivateRoute>
                            <AddExperience />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-education"
                    element={
                        <PrivateRoute>
                            <AddEducation />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/posts"
                    element={
                        <PrivateRoute>
                            <Posts />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/posts/:id"
                    element={
                        <PrivateRoute>
                            <Post />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </section>
    );
};

export default SwitchRoutes;
