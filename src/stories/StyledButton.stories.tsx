// StyledButtonをStorybookで表示するためには「コンポーネント名.stories.tsx」というファイルを作る
import { useState } from "react";
import { Meta } from "@storybook/react";
import { StyledButton } from "@/components/StyledButton/page";
import { StyledButtonProps } from "@/type";
import { action } from "@storybook/addon-actions";

// メタデータオブジェクトというファイル内のStory設定
export default {
  // Storybookの左側のツリーに表示されるグループ名
  // このタイトルとコンポーネント名が一致していないとエラーになる
  title: "StyledButton",
  // 使用するコンポーネント
  component: StyledButton,
  // onClickがよばれたときの動作を簡単に確認したいときは、argTypesを使うと確認できる
  // 以下はonClickがよばれたときにclickedというアクションを出力する
  // StorybokkのActionsタブで確認できる
  argTypes: { onClick: { action: "clicked" } },
  // 教材ではComponentMetaとないっているが、非推奨になったため現在はMetaを使用している
  // REFE: https://zenn.dev/route06/articles/storybook-v7-deprecations
} as Meta<typeof StyledButton>;

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
    <StyledButton {...props} variant="success">
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
