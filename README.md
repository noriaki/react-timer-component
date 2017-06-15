# react-timer-component

> A timer component for React that passing `remaining` milliseconds by `context` using<br />
> `コンテキスト`によって残り時間`remaining`（ミリ秒）を渡すタイプのカウントダウン・タイマーReactコンポーネント

[![NPM version](https://img.shields.io/npm/v/react-timer-component.svg?style=flat-square)](https://badge.fury.io/js/react-timer-component)
[![Build Status](https://img.shields.io/travis/noriaki/react-timer-component.svg?style=flat-square)](https://travis-ci.org/noriaki/react-timer-component)
[![Dependency Status](https://img.shields.io/david/noriaki/react-timer-component.svg?style=flat-square)](https://david-dm.org/noriaki/react-timer-component)
[![PeerDependency Status](https://img.shields.io/david/peer/noriaki/react-timer-component.svg?style=flat-square)](https://david-dm.org/noriaki/react-timer-component)

## Description

Functional React component, pass `context.remaining` to any child presentational component.

## Demo

![react-timer-component example (all-in-one)](https://raw.githubusercontent.com/noriaki/react-timer-component/gh-pages/images/examples-screencast.gif)<br />
https://noriaki.github.io/react-timer-component/<br />
(with [storybooks/storybook](https://github.com/storybooks/storybook/))

## Features

- Any presentational components can be used by child component<br />
  子コンポーネントとして任意の表示用コンポーネントが使用可能
- Timer settings, `remaining` and `interval` can be specified by props<br />
  残り時間と表示間隔をpropsで指定可能
- Callbacks, `afterTick` and `afterComplete` can be specified by props<br />
  表示更新毎とタイマー終了時にコールバックを指定可能

## Requirements

- node `6.x || >= 7.x`
- react `>= 15.x`
- prop-types `>= 15.x`

## Install

```sh
npm install --save react prop-types
npm install --save react-timer-component
```

or

```sh
yarn add react prop-types
yarn add react-timer-component
```

## Usage

### Child presentational component

Child presentational component are passed `context.remaining`.
For that purpose, requiring `contextTypes` setting to component static property.

```js
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
```

### Timer component

```js
<Timer remaining={20000}>
  <Countdown/>
</Timer>
```

### Props of `<Timer>` component

| property | propType | required | default | description |
| -------- |:--------:|:--------:|:-------:| ----------- |
| afterComplete | func | no | null | `afterComplete()` |
| afterTick | func | no | null | `afterTick(remaining: number)` |
| children | node | no | null | presentational components |
| interval | number | no | 1000 | milliseconds |
| remaining | number | yes | - | milliseconds |
| style | css object | no | {} | stype for container &lt;div&gt; |

## Contribution

1. Fork it ( http://github.com/noriaki/react-timer-component/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## Licence

[MIT](https://github.com/noriaki/react-timer-component/blob/master/LICENSE)

## Author

[noriaki](https://github.com/noriaki)
