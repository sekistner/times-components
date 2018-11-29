import { Text, View } from 'react-native';
import { configure, addDecorator } from "@storybook/react";
import { withInfo, setDefaults } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs/react';

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories|stories.web)\.js$/
);

withInfo({
  propTablesExclude: [Text, View]
})

withOptions({
  name: 'Times Components',
  hierarchySeparator: /\//
});


addDecorator((story, context) => withInfo('')(story)(context));
addDecorator(withKnobs);

const loadStories = () => req.keys().filter(k => k.indexOf("brightcove-video") === -1).forEach(filename => req(filename));

configure(loadStories, module);
