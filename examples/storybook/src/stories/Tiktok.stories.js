import Tiktok from "../examples/tiktok";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export default {
  title: 'Demo/Examples',
  component: Tiktok,
  // tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
};

export const TiktokCarousel = {};
