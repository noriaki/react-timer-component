import React from 'react';
import PropTypes from 'prop-types';

const Countup = (props, context) => {
  const { total } = props;
  const { remaining } = context;
  const d = new Date(total - remaining);
  const { seconds, milliseconds } = {
    seconds: d.getUTCSeconds(),
    milliseconds: d.getUTCMilliseconds(),
  };
  return (
    <span>{`${seconds}.${milliseconds}`}</span>
  );
};

Countup.propTypes = {
  total: PropTypes.number.isRequired,
};
Countup.contextTypes = {
  remaining: PropTypes.number,
};

export default Countup;
