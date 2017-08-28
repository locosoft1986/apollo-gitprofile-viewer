import React from 'react';
import { storiesOf, action } from '@storybook/react';
import RTThemeProvider from './helpers/RTThemeProvider'

import AppMenu from '../components/AppMenu';

storiesOf('AppMenu', module)
  .addDecorator(RTThemeProvider)
  .add('default', () => {
    return (
      <div style={{padding: '2rem', background: '#595f6f'}}>
        <AppMenu onMenuClick={action('onMenuClick')}/>
      </div>
    )
  })
  .add('active status', () => {
    return (
      <div style={{padding: '2rem', background: '#595f6f'}}>
        <AppMenu location='/repositories' onMenuClick={action('onMenuClick')}/>
      </div>
    )
  })
