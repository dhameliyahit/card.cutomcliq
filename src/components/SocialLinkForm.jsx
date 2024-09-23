import React, { useState } from 'react';
import axios from 'axios';

const SocialLinksForm = () => {
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const socialPlatforms = [
    { name: 'whatsapp', icon: 'bi-whatsapp' },
    { name: 'facebook', icon: 'bi-facebook' },
    { name: 'instagram', icon: 'bi-instagram' },
    { name: 'mail', icon: 'bi-envelope' },
    { name: 'linkedin', icon: 'bi-linkedin' },
    { name: 'website', icon: 'bi-globe' }
  ];

  const handleSelectionChange = (platform) => {
    if (selectedLinks.includes(platform)) {
      // Unselect the platform
      setSelectedLinks(selectedLinks.filter(link => link !== platform));
      // Remove from formData
      const updatedFormData = { ...formData };
      delete updatedFormData[platform];
      setFormData(updatedFormData);
    } else {
      // Select the platform
      setSelectedLinks([...selectedLinks, platform]);
    }
  };

  const handleInputChange = (platform, value) => {
    setFormData({
      ...formData,
      [platform]: value
    });
  };

  const handleSubmit = async () => {
    try {
      let ownerId = '';
      if (!localStorage.getItem('ownerId')) {
        ownerId = prompt('Enter Your code : ').trim();
        localStorage.setItem('ownerId', ownerId);
      } else {
        ownerId = localStorage.getItem('ownerId');
      }

      setLoading(true);

      // Make the API request to save the links
      const response = await axios.patch(
        `https://digital-business-card-backend-production.up.railway.app/api/links?ownerId=${ownerId}`,
        { links: formData }
      );

      if (response.data.success) {
        setSuccessMessage('Links updated successfully!');
      } else {
        setSuccessMessage('Error updating links.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error saving links:', error);
      setSuccessMessage('Error while updating links.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <h2 className="text-center mb-4">Select Social Links</h2>

      <div className="row mb-4">
        {socialPlatforms.map(({ name, icon }) => (
          <div key={name} className="col-6 col-md-4 col-lg-2 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                checked={selectedLinks.includes(name)}
                onChange={() => handleSelectionChange(name)}
                className="form-check-input"
                id={name}
              />
              <label className="form-check-label" htmlFor={name}>
                <i className={`bi ${icon} me-2`}></i> {/* Add Icon */}
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
            </div>
          </div>
        ))}
      </div>

      {selectedLinks.length > 0 && (
        <div className="mb-4">
          {selectedLinks.map(platform => (
            <div key={platform} className="mb-3">
              <label className="form-label" htmlFor={`${platform}Input`}>
                <i className={`bi ${socialPlatforms.find(p => p.name === platform)?.icon} me-2`}></i>
                {platform.charAt(0).toUpperCase() + platform.slice(1)} Link
              </label>
              <input
                type="text"
                className="form-control"
                id={`${platform}Input`}
                placeholder={`Enter your ${platform} link`}
                value={formData[platform] || ''}
                onChange={(e) => handleInputChange(platform, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="btn btn-primary w-100"
        disabled={loading} // Disable button while submitting
      >
        {loading ? 'Submitting ...' : 'Submit'}
      </button>

      {successMessage && (
        <div className="alert alert-success mt-4 text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default SocialLinksForm;
