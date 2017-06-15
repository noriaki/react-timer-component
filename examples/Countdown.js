import React from 'react';
import PropTypes from 'prop-types';

const Countdown = (props, context) => {
  const d = new Date(context.remaining);
  const { seconds, milliseconds } = {
    seconds: d.getUTCSeconds(),
    milliseconds: d.getUTCMilliseconds(),
  };
  return (
    <span>{`${seconds}.${milliseconds}`}</span>
  );
};

Countdown.contextTypes = {
  remaining: PropTypes.number,
};

export default Countdown;
