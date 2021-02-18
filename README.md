# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Summary of how this works...
- /stories/index.js contains all of our test for Storybook. For each component you can create multiple stories where you pass down example props to see how it renders.
- List of components
  - the main Application
  - Button
  - DayListItem and DayList
  - InterviewerListItem and InterviewerList
  - Appointment views
