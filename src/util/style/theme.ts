import * as styledComponents from "styled-components";

enum Color {
  LightGrey = "rgba(0, 0, 0, 0.25)",
  Grey = "rgba(0, 0, 0, 0.45)",
  darkGrey = "rgba(0, 0, 0, 0.65)",
  blue = "#0f215b",
  black = "black"
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {}

export const theme = {};

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider, Color };
