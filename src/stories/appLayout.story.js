import React from 'react';
import { storiesOf } from '@storybook/react';
import RTThemeProvider from './helpers/RTThemeProvider'

import AppLayout from '../components/AppLayout';

const user = {
  name: 'Tester',
  login: 'tester',
  repositories: 10,
  followers:17,
  pullRequests:7,
  watching:11,
  location:'someplace',
  avatar_url: ''
}

storiesOf('AppLayout', module)
  .addDecorator(RTThemeProvider)
  .add('default', () => {
    return (
      <AppLayout brand="MyApp" user={user} menus={<div>MENUS</div>}>
        MAIN
      </AppLayout>
    )
  })
