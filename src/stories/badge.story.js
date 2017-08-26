import React from 'react';
import { storiesOf, action } from '@storybook/react';
import RTThemeProvider from './helpers/RTThemeProvider'

import Badge from '../components/Badge';

storiesOf('Badge', module)
  .addDecorator(RTThemeProvider)
  .add('default', () => {
    return (
      <div style={{padding: '1rem'}}>
        <Badge color="primary">primary</Badge>
        <Badge color="accent">accent</Badge>
      </div>
    )
  })
