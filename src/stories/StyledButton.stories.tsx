// StyledButtonをStorybookで表示するためには「コンポーネント名.stories.tsx」というファイルを作る
import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { StyledButton } from "@/components/StyledButton/page";
import { StyledButtonProps } from "@/type";
import { action } from "@storybook/addon-actions";
import MDXDocument from "./StyledButton.mdx";
// @storybook/addon-linksのlinkToを使うと別のストーリーに遷移することができる
import { linkTo } from "@storybook/addon-links";

// メタデータオブジェクトというファイル内のStory設定
export default {
  // Storybookの左側のツリーに表示されるグループ名
  // このタイトルとコンポーネント名が一致していないとエラーになる
  title: "StyledButton",
  // 使用するコンポーネント
  component: StyledButton,

  argTypes: {
    // onClickがよばれたときの動作を簡単に確認したいときは、argTypesを使うと確認できる
    // 以下はonClickがよばれたときにclickedというアクションを出力する
    // StorybokkのActionsタブで確認できる
    onClick: { action: "clicked" },

    // StoryのControlタブでコンポーネントに渡すpropsの制御ができる
    // Templateコンポーネントで使用するControlタブで制御したいデータを定義する
    variant: {
      // ラジオボタンでprimary、success、transparentを切り替えられるようにする
      control: { type: "radio" },
      options: ["primary", "success", "transparent"],
    },
    children: {
      // ボタンの名称をテキストで変更できるようにする
      control: { type: "text" },
    },
  },
  parameters: {
    // @storybook/addon-essentialsがインストールされていれば、mdxファイルを読み込んでDocsを表示できる
    docs: {
      page: MDXDocument,
    },
  },
  // 教材ではComponentMetaとないっているが、非推奨になったため現在はMetaを使用している
  // REFE: https://zenn.dev/route06/articles/storybook-v7-deprecations
} as Meta<typeof StyledButton>;

// 教材ではComponentStoryとないっているが、非推奨になったため現在はStoryFnを使用している
// REFE: https://qiita.com/KokiSakano/items/a6e291b6292f025bd037
// オブジェクト用がStoryObj、関数用がStoryFnっぽい
// Storyから渡されたpropsをそのまま渡すコンポーネントを定義
const Template: StoryFn<typeof StyledButton> = (args: StyledButtonProps) => (
  <StyledButton {...args} />
);

// Storyとコンポーネントを紐づけるとControlタブでpropsを動的に制御できるStoryが完成
export const TemplateTest = Template.bind({});

// デフォルトのpropsを設定
TemplateTest.args = {
  variant: "primary",
  children: "Primary",
};

// incrementという名前でactionを出力できるようにする
const incrementAction = action("increment");

// StyledButtonというグルー名の中に表示するStoryの実装
// Primary、Success、TransparentというStoryを表示させる
export const Primary = (props: StyledButtonProps) => {
  const [count, setCount] = useState(0);
  const onClick = (e: React.MouseEvent) => {
    // イベントとカウントを渡すとActionタブにincrementという名前でイベントとカウントが表示される
    // increment: (2) [SyntheticBaseEvent, 0]
    //   0: SyntheticBaseEvent
    //   1: 0
    incrementAction(e, count);
    setCount((c) => c + 1);
  };

  return (
    <StyledButton {...props} variant="primary" onClick={onClick}>
      Count: {count}
    </StyledButton>
  );
};

export const Success = (props: StyledButtonProps) => {
  return (
    <StyledButton
      {...props}
      variant="success"
      // クリックするとTransparentに遷移する
      onClick={linkTo("StyledButton", "Transparent")}
    >
      Success
    </StyledButton>
  );
};

export const Transparent = (props: StyledButtonProps) => {
  return (
    <StyledButton {...props} variant="transparent">
      Transparent
    </StyledButton>
  );
};
