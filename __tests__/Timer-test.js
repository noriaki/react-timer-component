import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import Timer from '../src/Timer';

describe('<Timer />', () => {
  describe('component spec', () => {
    let subject;
    beforeEach(() => {
      subject = <Timer remaining={1}><p>A</p></Timer>;
    });

    it('should render without throwing an error', () => {
      expect(shallow(subject).contains(<p>A</p>)).toBe(true);
    });

    it('should render to static HTML', () => {
      expect(render(subject).text()).toEqual('A');
    });

    it('should be required `remaining` props', () => {
      const consoleErrorFn = sinon.stub(console, 'error');
      const warningMessage =
              'The prop `remaining` is marked as required in `Timer`';
      shallow(<Timer />);
      expect(consoleErrorFn.calledOnce).toBe(true);
      expect(consoleErrorFn.firstCall.args[0]).toMatch(warningMessage);
      consoleErrorFn.restore();
    });
  });

  describe('countdown behavior', () => {
    let clock;
    let handleTickFn;
    let wrapper;
    const initialRemaining = 20000;
    beforeEach(() => {
      clock = sinon.useFakeTimers();
      handleTickFn = sinon.spy(Timer.prototype, 'handleTick');
      wrapper = undefined;
    });
    afterEach(() => {
      clock.restore();
      handleTickFn.restore();
      if (wrapper != null) { wrapper.unmount(); }
    });

    it('should tick', () => {
      wrapper = shallow(<Timer remaining={initialRemaining} />);
      expect(wrapper.state('remaining')).toBe(initialRemaining);
      clock.tick(999);
      expect(wrapper.state('remaining')).toBe(initialRemaining);
      clock.tick(1);
      expect(handleTickFn.calledOnce).toBe(true);
      expect(wrapper.state('remaining')).toBe(initialRemaining - 1000);
    });

    it('should tick specific interval props', () => {
      const initialInterval = 100;
      wrapper = shallow(
        <Timer remaining={initialRemaining} interval={initialInterval} />
      );
      expect(wrapper.state('remaining')).toBe(initialRemaining);
      clock.tick(99);
      expect(wrapper.state('remaining')).toBe(initialRemaining);
      clock.tick(1);
      expect(handleTickFn.calledOnce).toBe(true);
      expect(wrapper.state('remaining'))
        .toBe(initialRemaining - initialInterval);
    });

    it('should clear interval after complete ticks', () => {
      const clearIntervalFn = sinon.spy(global, 'clearInterval');
      wrapper = shallow(<Timer remaining={initialRemaining} />);
      expect(clearIntervalFn.callCount).toBe(0);
      clock.tick(initialRemaining);
      expect(clearIntervalFn.calledOnce).toBe(true);
      expect(wrapper.state('timerId')).toBeNull();
    });

    it('should clear interval if unmount', () => {
      const clearIntervalFn = sinon.spy(global, 'clearInterval');
      wrapper = shallow(<Timer remaining={initialRemaining} />);
      expect(clearIntervalFn.callCount).toBe(0);
      wrapper.unmount();
      expect(clearIntervalFn.calledOnce).toBe(true);
    });

    it('should call callback `afterTick` after each ticks', () => {
      const afterTickFn = jest.fn();
      wrapper = shallow(
        <Timer remaining={initialRemaining} afterTick={afterTickFn} />
      );
      expect(afterTickFn).not.toBeCalled();
      clock.tick(999);
      expect(afterTickFn).not.toBeCalled();
      clock.tick(1);
      expect(afterTickFn).toHaveBeenCalledTimes(1);
      clock.tick(1000);
      expect(afterTickFn).toHaveBeenCalledTimes(2);
    });

    it('should call callback `afterComplete` after complete ticks', () => {
      const afterCompleteFn = jest.fn();
      wrapper = shallow(
        <Timer remaining={initialRemaining} afterComplete={afterCompleteFn} />
      );
      expect(afterCompleteFn).not.toBeCalled();
      clock.tick(initialRemaining - 1);
      expect(afterCompleteFn).not.toBeCalled();
      clock.tick(1);
      expect(afterCompleteFn).toHaveBeenCalledTimes(1);
    });

    it('should passing context `remaining` to child components', () => {
      wrapper = mount(
        <Timer remaining={initialRemaining}><TestDisplay /></Timer>
      );
      expect(wrapper.find('span').text()).toBe(`${initialRemaining}`);
      clock.tick(999);
      expect(wrapper.find('span').text()).toBe(`${initialRemaining}`);
      clock.tick(1);
      expect(wrapper.find('span').text()).toBe(`${initialRemaining - 1000}`);
    });
  });
});

const TestDisplay = (props, context) => <span>{context.remaining}</span>;
TestDisplay.contextTypes = { remaining: PropTypes.number };
