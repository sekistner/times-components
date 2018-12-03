import { Text, View } from 'react-native';
import { configure, addDecorator } from "@storybook/react";
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories|stories.web)\.js$/
);

// setDefaults({
//   propTablesExclude: [Text, View]
// })

withOptions({
  name: 'Times Components',
  hierarchySeparator: /\//
});

addDecorator(withInfo);
addDecorator(withKnobs);

const loadStories = () => req.keys().filter(k => k.indexOf("brightcove-video") === -1).forEach(filename => req(filename));

configure(loadStories, module);
