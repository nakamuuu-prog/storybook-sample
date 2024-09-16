export const variants = {
  primary: {
    color: "#ffffff",
    backgroundColor: "#1D3461",
    border: "none",
  },
  success: {
    color: "#111111",
    backgroundColor: "#5AB203",
    border: "none",
  },
  transparent: {
    color: "#111111",
    backgroundColor: "transparent",
    border: "1px solid black",
  },
} as const;

export type StyledButtonProps = {
  variant: keyof typeof variants;
};
