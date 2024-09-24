import React, { useState } from 'react';
import axios from 'axios';

const SocialLinksForm = () => {
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const socialPlatforms = [
    { name: 'whatsapp', icon: 'bi-whatsapp', type: 'number' },
    { name: 'facebook', icon: 'bi-facebook', type: 'url' },
    { name: 'instagram', icon: 'bi-instagram', type: 'url' },
    { name: 'mail', icon: 'bi-envelope', type: 'email' },
    { name: 'linkedin', icon: 'bi-linkedin', type: 'url' },
    { name: 'website', icon: 'bi-globe', type: 'url' }
  ];

  const handleSelectionChange = (platform) => {
    if (selectedLinks.includes(platform)) {
      // Unselect the platform
      setSelectedLinks(selectedLinks.filter(link => link !== platform));
      // Remove from formData and errorMessages
      const updatedFormData = { ...formData };
      const updatedErrorMessages = { ...errorMessages };
      delete updatedFormData[platform];
      delete updatedErrorMessages[platform];
      setFormData(updatedFormData);
      setErrorMessages(updatedErrorMessages);
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
    // Remove any error messages when typing
    setErrorMessages({
      ...errorMessages,
      [platform]: ''
    });
  };

  const validateInput = () => {
    let valid = true;
    const errors = {};

    selectedLinks.forEach((platform) => {
      const inputType = socialPlatforms.find(p => p.name === platform)?.type;
      const value = formData[platform];

      if (!value) {
        errors[platform] = `Please enter a value for ${platform}.`;
        valid = false;
      } else if (inputType === 'number' && (!/^\d{10}$/.test(value))) {
        errors[platform] = `Please enter a valid 10-digit WhatsApp number.`;
        valid = false;
      } else if (inputType === 'url' && !isValidURL(value)) {
        errors[platform] = `Please enter a valid URL for ${platform}.`;
        valid = false;
      } else if (inputType === 'email' && !isValidEmail(value)) {
        errors[platform] = `Please enter a valid email address.`;
        valid = false;
      }
    });

    setErrorMessages(errors);
    return valid;
  };

  const isValidURL = (url) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    return urlPattern.test(url);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async () => {
    if (!validateInput()) {
      return; // If validation fails, stop submission
    }

    try {
      let ownerId = '';
      if (!localStorage.getItem('ownerId')) {
        ownerId = prompt('Enter Your code : ').trim();
        localStorage.setItem('ownerId', ownerId);
      } else {
        ownerId = localStorage.getItem('ownerId');
      }

      setLoading(true);

      // Prepare formData with the correct format for WhatsApp link
      const formattedData = { ...formData };
      if (formData.whatsapp) {
        formattedData.whatsapp = `https://wa.me/+91${formData.whatsapp}`;
      }

      // Make the API request to save the links
      const response = await axios.patch(
        `https://digital-business-card-backend-production.up.railway.app/api/links?ownerId=${ownerId}`,
        { links: formattedData }
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
                {platform === 'whatsapp'
                  ? 'Enter your WhatsApp number'
                  : `${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`}
              </label>
              <input
                type={socialPlatforms.find(p => p.name === platform)?.type === 'number' ? 'text' : 'url'}
                className="form-control"
                id={`${platform}Input`}
                placeholder={platform === 'whatsapp' ? 'Enter your 10-digit WhatsApp number' : `Enter your ${platform} link`}
                value={formData[platform] || ''}
                onChange={(e) => handleInputChange(platform, e.target.value)}
              />
              {errorMessages[platform] && (
                <div className="text-danger mt-1">
                  {errorMessages[platform]}
                </div>
              )}
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
