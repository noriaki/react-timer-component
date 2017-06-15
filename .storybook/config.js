import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

const loadStories = () => {
  require('../stories/TimerUsage-story'); // eslint-disable-line global-require
  require('../stories/TimerExamples-story'); // eslint-disable-line global-require
};

setAddon(infoAddon);
configure(loadStories, module);
