import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Timer from '../Timer';

const Countdown = (props, context) => {
  const d = new Date(context.remaining);
  const { seconds, milliseconds } = {
    seconds: d.getUTCSeconds(),
    milliseconds: d.getUTCMilliseconds(),
  };
  return (
    <p>{`${seconds}.${milliseconds}`}</p>
  );
};

Countdown.contextTypes = {
  remaining: PropTypes.number,
};

const markdownCountdown = `
## Usage

Timer's child components (e.g. <Countdown />) are passed \`context.remaining\`,
and required \`.contextTypes { remaining: PropTypes.number }\` for using context.

### Child component example

~~~jsx
const Countdown = (props, context) => {
  const d = new Date(context.remaining); // auto passed context.remaining
  const { seconds, milliseconds } = {
    seconds: d.getUTCSeconds(),
    milliseconds: d.getUTCMilliseconds(),
  };
  return (
    <p>{\`\${seconds}.\${milliseconds}\`}</p>
  );
};

Countdown.contextTypes = {
  remaining: PropTypes.number,
};
~~~
`;

storiesOf('Timer (Countdown)', module)
  .addWithInfo('basic', markdownCountdown, () => (
    <div>
      <h1>Countdown</h1>
      <Timer remaining={20 * 1000}>
        <Countdown />
      </Timer>
    </div>
  ))
  .addWithInfo('props: interval (msec)', markdownCountdown, () => (
    <div>
      <h1>Countdown</h1>
      <Timer remaining={20 * 1000} interval={20}>
        <Countdown />
      </Timer>
    </div>
  ))
  .addWithInfo('props: style (container <div>)', markdownCountdown, () => (
    <div>
      <h1>Countdown</h1>
      <Timer remaining={20 * 1000} style={{ backgroundColor: '#d0d0d0' }}>
        <Countdown />
      </Timer>
    </div>
  ))
  .addWithInfo('props: callbacks', markdownCountdown, () => (
    <div>
      <h1>Countdown</h1>
      <Timer
        remaining={20 * 1000}
        afterTick={action('afterTickCallback')}
        afterComplete={action('afterCompleteCallback')}>
        <Countdown />
      </Timer>
    </div>
  ));
