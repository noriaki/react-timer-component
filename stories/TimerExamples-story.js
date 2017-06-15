import React from 'react';
import { storiesOf } from '@storybook/react';
import Timer from '../src/Timer';

import Countdown from '../examples/Countdown';
import Countup from '../examples/Countup';
import Progressbar from '../examples/Progressbar';

const initialRemaining = 5 * 1000;
const interval = 33;

storiesOf('<Timer /> Examples', module)
  .add('count down', () => (
    <Timer remaining={initialRemaining} interval={interval}>
      <Countdown />
    </Timer>
  ))
  .add('count up', () => (
    <Timer remaining={initialRemaining} interval={interval}>
      <Countup total={initialRemaining} />
    </Timer>
  ))
  .add('progress bar', () => (
    <Timer remaining={initialRemaining} interval={interval}>
      <Progressbar total={initialRemaining} />
    </Timer>
  ))
  .add('all in one', () => (
    <Timer remaining={initialRemaining} interval={interval} style={styles.aio}>
      <div><p>count-down</p><Countdown /></div>
      <div><p>count-up</p><Countup total={initialRemaining} /></div>
      <div><p>progress-bar</p><Progressbar total={initialRemaining} /></div>
    </Timer>
  ));

const styles = {
  aio: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 500,
  },
};
