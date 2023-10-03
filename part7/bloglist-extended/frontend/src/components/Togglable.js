import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './Togglable.css'; // Import the CSS

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="container">
      <div className={visible ? 'hideWhenVisible' : ''}>
        <Button onClick={toggleVisibility} type="input" size="sm">
          {props.buttonLabel}
        </Button>
      </div>
      <div className={visible ? 'showWhenVisible' : 'hideWhenVisible'}>
        {props.children}
        <Button onClick={toggleVisibility} type="reset" size="sm">
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
