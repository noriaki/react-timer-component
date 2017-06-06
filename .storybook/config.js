import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

const loadStories = () => {
  require('../src/stories/timer-story'); // eslint-disable-line global-require
};

setAddon(infoAddon);
configure(loadStories, module);
