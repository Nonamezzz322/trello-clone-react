import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useClickAway } from 'react-use';

function OustideClickHandler(props) {
  const ref = useRef(null);
  const { children } = props;
  const id = uuidv4();

  useClickAway(ref, () => props.onClickOutside(ref));

  return (
    <div
      ref={ref}
      id={id}
    >
      {children}
    </div>
  );
}

OustideClickHandler.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  onClickOutside: PropTypes.func,
};

export default OustideClickHandler;
