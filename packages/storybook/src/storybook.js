import { storiesOf } from "@storybook/react-native";
import * as actions from "@storybook/addon-actions";
import * as knobs from "@storybook/addon-knobs";
import * as decorators from "./decorators";
import showcaseToStoryBook from "./showcase-to-storybook";
import sections from "./sections";

const {
  CenteredDecorator,
  BarSpacingDecorator,
  LateralSpacingDecorator,
  WhiteBgColorDecorator
} = decorators;

const showcaseConverter = showcaseToStoryBook(storiesOf, knobs, actions);

export {
  BarSpacingDecorator,
  CenteredDecorator,
  LateralSpacingDecorator,
  sections,
  showcaseConverter,
  WhiteBgColorDecorator
};
