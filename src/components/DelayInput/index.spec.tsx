import {
  render,
  screen,
  RenderResult,
  fireEvent,
  act,
} from "@testing-library/react";
import { DelayInput } from "./index";

describe("DelayInput", () => {
  let renderResult: RenderResult;
  let handleChange: jest.Mock;

  beforeEach(() => {
    // jestのタイマーモック
    // 実際に待たなくてもタイマーのコールバックを実行できる
    // テスト前にモックに置き換える
    jest.useFakeTimers();

    // jest.fnはモック関数を作成する関数
    // コールバックが呼ばれたかどうかなどをテストできる
    handleChange = jest.fn();

    renderResult = render(<DelayInput onChange={handleChange}></DelayInput>);
  });

  afterEach(() => {
    renderResult.unmount();
    // テスト後にタイマーを元に戻す
    jest.useFakeTimers();
  });

  const spanTestId = "display-text";

  it("should display empty in span on initial render", () => {
    // getByTestIdでdata-testid属性の要素を取得できる
    const spanNode = screen.getByTestId(spanTestId) as HTMLSpanElement;

    expect(spanNode).toHaveTextContent("入力したテキスト：");
  });

  it("should display 「入力中...」 immediately after onChange event occurs", () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByTestId("input-text") as HTMLInputElement;

    fireEvent.change(inputNode, { target: { value: inputText } });

    const spanNode = screen.getByTestId(spanTestId) as HTMLSpanElement;

    expect(spanNode).toHaveTextContent("入力中...");
  });

  it("should display input text 1 second after onChange event occurs", async () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByTestId("input-text") as HTMLInputElement;

    fireEvent.change(inputNode, { target: { value: inputText } });

    // act関数はタイマーのコールバック内で呼ばれる状態変更を反映することを保証する
    await act(() => {
      // テスト中でタイマーが設定された後にrunAllTimersを実行するとタイマーのコールバックを実行できる
      jest.runAllTimers();
    });

    const spanNode = screen.getByTestId(spanTestId) as HTMLSpanElement;

    expect(spanNode).toHaveTextContent(`入力したテキスト：${inputText}`);
  });

  it("should call onChange 1 second after onChange event occurs", async () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByTestId("input-text") as HTMLInputElement;

    fireEvent.change(inputNode, { target: { value: inputText } });

    await act(() => {
      jest.runAllTimers();
    });

    // 渡したモック関数が呼び出されたかを確認する
    expect(handleChange).toHaveBeenCalled();
  });
});
