import React from 'react';
import PropTypes from 'prop-types';

const EmailTemplate = ({ user }) => {
  return (
    <div>
      <h1>{user['name']}</h1>
    </div>
  );
};

EmailTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default EmailTemplate;