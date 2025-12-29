import React from "react";
import "./Profile.css";

export default function EditProfile() {
  return (
    <div className="app">
      {/* Header */}
      <div className="topbar">
        <span className="icon">←</span>
        <span className="title">Edit Profile</span>
        <span className="icon">⤴</span>
      </div>

      {/* Profile image */}
      <div className="avatar-section">
        <img
          src="https://i.pravatar.cc/150"
          alt="profile"
          className="avatar"
        />
        <p className="change">Change Picture</p>
      </div>

      {/* Form */}
      <div className="form">
        <div className="field">
          <label>Username</label>
          <input type="text" placeholder="Username" />
        </div>

        <div className="field">
          <label>Email Id</label>
          <input type="email" placeholder="Email" />
        </div>

        <div className="field">
          <label>Phone Number</label>
          <input type="text" placeholder="Phone number" />
        </div>

        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="Password" />
        </div>
      </div>
    </div>
  );
}
