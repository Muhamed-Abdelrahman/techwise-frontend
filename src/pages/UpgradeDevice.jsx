import React from 'react';

export default function UpgradeDevice({ setCurrentPage }) {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 fw-bold mb-3">Upgrade Your Device</h1>
      <p className="lead mb-4">
        Explore upgrade options, compare components, and enhance your PC.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => setCurrentPage('home')}
      >
        ← Back to Home
      </button>
    </div>
  );
}
