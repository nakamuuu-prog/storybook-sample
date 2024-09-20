// テストファイルは「.scpec.tsx」または「.text.tsx」で終了するファイル名にする必要がある
import {
  render,
  screen,
  RenderResult,
  fireEvent,
} from "@testing-library/react";
import { Input } from "./index";

// jestに用意されているdescribe関数を使うことでテストをまとめることができる
// Inputコンポーネントのテストをするので"Input"というグループを作成する
describe("Input", () => {
  const labelText = "Username";

  let renderResult: RenderResult;

  // beforeEachはテスト実行前の処理を記述
  beforeEach(() => {
    renderResult = render(<Input id="username" label={labelText} />);
  });

  // afterEachはテスト実行後の処理を記述
  afterEach(() => {
    // unmountで描画していたコンポーネントを開放
    renderResult.unmount();
  });

  // itの中にテストを書いていく
  // 初期表示時にinput属性が空であること
  it("should empty in input on initial render", () => {
    // labelが「Username」であるコンポーネントに対応するinput要素を取得する
    const inputNode = screen.getByLabelText(labelText) as HTMLInputElement;

    // 以下のエラーが発生
    // プロパティ 'toHaveValue' は型 'JestMatchers<HTMLInputElement>' に存在しません。ts(2339)
    // 次のコマンドで解決
    // npm install -D @types/testing-library__jest-dom
    // REFE: https://qiita.com/P-man_Brown/items/a868c5079b71206bf227#comment-1efaa072ab99c8f97d10
    // input要素の表示が空か確認する
    expect(inputNode).toHaveValue("");
  });

  // 入力があった場合、入力した通りの入力値が表示されていること
  it("should show input text", () => {
    const inputText = "Test Inout Text";
    const inputNode = screen.getByLabelText(labelText) as HTMLInputElement;

    // fireEventを使ってinput要素の onChange イベントを発火する
    fireEvent.change(inputNode, { target: { value: inputText } });

    expect(inputNode).toHaveValue(inputText);
  });

  // クリアボタンが押下されたときinput属性の入力値がクリアされていること
  it("should reset when user clicks button", () => {
    const inputText = "Test Inout Text";
    const inputNode = screen.getByLabelText(labelText) as HTMLInputElement;

    fireEvent.change(inputNode, { target: { value: inputText } });

    // 「Reset」のbutton属性を取得
    const buttonNode = screen.getByRole("button", {
      name: "Reset",
    }) as HTMLButtonElement;

    // fireEventのclick関数でクリックイベントを発生させることができる
    fireEvent.click(buttonNode);

    expect(inputNode).toHaveValue("");
  });
});
