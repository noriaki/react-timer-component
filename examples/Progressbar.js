import React from 'react';
import PropTypes from 'prop-types';

const Progressbar = (props, context) => {
  const { total } = props;
  const { remaining } = context;
  const w = ((total - remaining) / total) * 100;
  const barStyle = Object.assign({}, styles.bar, { width: `${w}%` });
  return (
    <span>
      0
      <span style={styles.container}>
        <span style={barStyle} />
      </span>
      100
    </span>
  );
};

const styles = {
  container: {
    display: 'inline-block',
    width: 100,
    height: 20,
    borderLeft: '1px solid',
    borderRight: '1px solid',
    margin: '0 8px',
  },
  bar: {
    display: 'inline-block',
    width: 0,
    height: 16,
    backgroundColor: '#666',
  },
};

Progressbar.propTypes = {
  total: PropTypes.number.isRequired,
};
Progressbar.contextTypes = {
  remaining: PropTypes.number,
};

export default Progressbar;
