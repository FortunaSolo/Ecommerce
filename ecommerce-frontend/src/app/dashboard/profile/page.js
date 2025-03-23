// In your Profile Page (e.g., /dashboard/profile)
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profileImage: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch current user data
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUserData(response.data);
            } catch (err) {
                setError('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                '/api/auth/me',
                { name: userData.name, email: userData.email },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Error updating profile.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Profile</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;
