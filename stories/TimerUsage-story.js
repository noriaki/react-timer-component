import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Timer from '../src/Timer';

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

const markdownCountdown = `
----

## Usage

Child presentational component (e.g. \`<Countdown />\`) are passed \`context.remaining\`. For that purpose, requiring \`contextTypes\` setting to component static property.

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

const infoOptions = { inline: true, propTables: [Timer] };

storiesOf('<Timer /> Usage', module)
  .addWithInfo('basic usage', markdownCountdown, () => (
    <Timer remaining={20 * 1000}>
      <Countdown />
    </Timer>
  ), infoOptions)
  .addWithInfo('props: interval (msec)', markdownCountdown, () => (
    <Timer remaining={20 * 1000} interval={20}>
      <Countdown />
    </Timer>
  ), infoOptions)
  .addWithInfo('props: style (container <div>)', markdownCountdown, () => (
    <Timer
      remaining={20 * 1000}
      style={{ color: 'white', backgroundColor: '#606060', padding: 16 }}>
      <Countdown />
    </Timer>
  ), infoOptions)
  .addWithInfo('props: callbacks', markdownCountdown, () => (
    <Timer
      remaining={20 * 1000}
      afterTick={action('afterTickCallback')}
      afterComplete={action('afterCompleteCallback')}>
      <Countdown />
    </Timer>
  ), infoOptions);
