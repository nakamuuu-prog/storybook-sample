import styled, { css } from "styled-components";
import { variants, StyledButtonProps } from "@/type";

// variantによってボタンの色を制御できるコンポーネント
export const StyledButton = styled.button<StyledButtonProps>`
  ${({ variant }) => {
    const style = variants[variant];

    return css`
      color: ${style.color};
      background-color: ${style.backgroundColor};
      border: ${style.border};
    `;
  }}

  border-radius: 12px;
  font-size: 14px;
  height: 38px;
  line-height: 22px;
  letter-spacing: 0;
  cursor:pointer:

  &:focus {
    outline: none;
  }
`;
