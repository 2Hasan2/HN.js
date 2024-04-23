import { withNode } from '~/components/node/connector';
import { Tabs } from '../ui/tabs';
import { SettingsControl } from '../settings-control';

const draggable = true;

export const NodeTabs = withNode(Tabs, {
  draggable,
});

Tabs.craft = {
  ...Tabs.craft,
  related: {
    toolbar: SettingsControl,
  },
};
