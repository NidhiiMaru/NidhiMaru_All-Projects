import React from 'react';

const About = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <div><h2>About You</h2><p>Please login to view your profile information.</p></div>;
  }

  return (
    <div className='container my-3'>
      <h2>About You</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
        <li className="list-group-item"><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</li>
      </ul>
    </div>
  );
};

export default About;
