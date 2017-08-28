import React from 'react';
import { storiesOf, action } from '@storybook/react';
import RTThemeProvider from './helpers/RTThemeProvider'
import BaseItemsList from '../components/BaseItemsList';
import RepositoryItem from '../components/repositories/RepositoryItem';
import range from 'lodash/range';

const Repositories = BaseItemsList(RepositoryItem, 'repositories');

const repositories = range(10).map(i => {
  return {
    "id": `index-${i}`,
    "url": `test url ${i}`,
    "name":`test repo ${i}`,
    "stargazers":10 * i,
    "forks": 20 + i,
    "watchers":30 + i,
    "issues": 100 + i
  }
})

storiesOf('Repositories', module)
  .addDecorator(RTThemeProvider)
  .add('default', () => {
    return (
      <div style={{padding: '1rem', background: 'white'}}>
        <Repositories repositories={repositories} onSelect={action('onSelect')} onAction={action('onAction')}/>
      </div>
    )
  });
