import type { Preview } from "@storybook/react";

const preview: Preview = {
  // Storybook8より前のバージョンはCanvasタブとDocsタブが表示されていたが、Storybook8以降は表示されなくなったらしい
  // 表示される場所は異なるが、tagsでautodocsを指定すると、左側のツリー部分に表示される
  // REFE: https://zenn.dev/rehabforjapan/articles/045a3d4c0d3bc6
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
