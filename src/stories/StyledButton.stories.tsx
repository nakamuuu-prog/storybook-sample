// StyledButtonをStorybookで表示するためには「コンポーネント名.stories.tsx」というファイルを作る
import { Meta } from "@storybook/react";
import { StyledButton } from "@/components/StyledButton/page";
import { StyledButtonProps } from "@/type";

// メタデータオブジェクトというファイル内のStory設定
export default {
  // Storybookの左側のツリーに表示されるグループ名
  // このタイトルとコンポーネント名が一致していないとエラーになる
  title: "StyledButton",
  // 使用するコンポーネント
  component: StyledButton,
  // 教材ではComponentMetaとないっているが、非推奨になったため現在はMetaを使用している
  // REFE: https://zenn.dev/route06/articles/storybook-v7-deprecations
} as Meta<typeof StyledButton>;

// StyledButtonというグルー名の中に表示するStoryの実装
// Primary、Success、TransparentというStoryを表示させる
export const Primary = (props: StyledButtonProps) => {
  return (
    <StyledButton {...props} variant="primary">
      Primary
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
