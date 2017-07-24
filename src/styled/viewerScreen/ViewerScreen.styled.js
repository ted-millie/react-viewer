import styled, { css } from 'styled-components';
import { svgIcons } from '../SvgIcons.styled';
import { STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT } from '../../constants/StyledConstants';
import { ContentType } from '../../constants/ContentConstants';
import SvgIconConstants from '../../constants/SvgIconConstants';


const getNovelLineHeight = level => {
  switch (level) {
    case 1:
      return 1.35;
    case 2:
      return 1.51;
    case 3:
      return 1.70;
    case 4:
      return 1.86;
    case 5:
      return 2.05;
    case 6:
      return 2.27;
    default:
      return 1.70;
  }
};

const getFontSize = level => {
  const fontSizeUnit = 15;
  switch (Number(level)) {
    case 1: return fontSizeUnit * 0.8;
    case 2: return fontSizeUnit * 0.85;
    case 3: return fontSizeUnit * 0.9;
    case 4: return fontSizeUnit * 0.95;
    case 5: return fontSizeUnit;
    case 6: return fontSizeUnit * 1.15;
    case 7: return fontSizeUnit * 1.25;
    case 8: return fontSizeUnit * 1.4;
    case 9: return fontSizeUnit * 1.6;
    case 10: return fontSizeUnit * 1.8;
    case 11: return fontSizeUnit * 2.0;
    case 12: return fontSizeUnit * 2.3;
    default: return fontSizeUnit;
  }
};

const getNovelPadding = level => {
  const paddingValue = 7 - Number(level);
  return `0 ${paddingValue}% 80px ${paddingValue}%`;
};
const getComicPadding = level => '0';
const getComicWidth = level => (Number(level) * 10) + 40;
const getMaxWidth = contentType => (contentType === ContentType.WEB_NOVEL ? `600px` : `none`);

// language=SCSS prefix=dummy{ suffix=}
const ViewerScreen = styled.div`
  background: transparent;
`;

// language=SCSS prefix=dummy{ suffix=}
const SizingWrapper = styled.div`
  max-width: ${props => getMaxWidth(props.contentType)};
  margin: 0 auto;
  box-sizing: border-box;
  .error_image_wrapper {
    display: block; width: 100%;
    text-align: center;
    .svg_picture_1 {
      display: inline-block; text-indent: -444px; font-size: 0; overflow: hidden;
      background: url("data:image/svg+xml,${svgIcons[SvgIconConstants.PICTURE_1]('#e5e8eb')}") center center no-repeat;
      background-size: 100% 100%;
      width: 66px; height: 52px; content: '';
    }
  }
`;
SizingWrapper.defaultProps = {
  contentType: ContentType.WEB_NOVEL
};

// language=SCSS prefix=dummy{ suffix=}
const novelStyleMixin = css`
  // 리디스토리 커스텀 스타일 -----------------------------------------------------
  p {
    display: block;
    padding: 0.5em;
    text-indent: 1em;
    font-size: 1em;
    text-align: justify;
  }
  h2, h3 {
    padding: 1em 0 0.7em 0;
  }
  .flashback {
    color: #868a8e!important;
  }
  .ridiborder {
    padding: 0.5em 1em;
    border: 0.1em solid #868a8e;
    border-radius: 0.5em;
  }
  .ridibox {
    padding: 0.5em 1em;
  }

  .ridipost {
    padding: 0.5em 1em;
    border-radius: 0.5em;
  }
  .ridicenter {
    text-align: center;
  }
`;

// language=SCSS prefix=dummy{ suffix=}
const ViewerContents = styled.section`
  @font-face {
    font-family: 'kopub_batang';
    font-style: normal;
    font-weight: normal;
    src: ${props =>
      `url('${props.fontDomain}KoPubBatangMedium.woff2') format('woff2'), 
      url('${props.fontDomain}KoPubBatangMedium.woff') format('woff'), 
      url('${props.fontDomain}KoPubBatangMedium.ttf') format('truetype');`
    }
  }
  @font-face {
    font-family: 'kopub_dotum';
    font-style: normal;
    font-weight: normal;
    src: ${props =>
      `url('${props.fontDomain}KoPubDotumMedium.woff2') format('woff2'),
      url('${props.fontDomain}KoPubDotumMedium.woff') format('woff'),
      url('${props.fontDomain}KoPubDotumMedium.ttf') format('truetype');`
    }
  }
  
  * {
    font-size: ${props => getFontSize(props.fontSizeLevel)}px;
    line-height: ${props => getNovelLineHeight(props.lineHeight)}em;
    font-family: ${props => props.fontFamily};
  }
  .comic_page {
    text-align: center;
    img {
      padding: 0;
      width: ${props => getComicWidth(props.comicWidthLevel)}%;
    }
  }

  h1, h2, h3, h4, h5, h6, p, th, td, div, label, textarea, a, li, input, button, textarea, select, address {
    letter-spacing: -.01em;
  }
  
  h1, h2, h3, h4, h5, h6 {
    text-align: center;
    font-size: 1.3em!important;
    font-weight: bold;
  }

  img {
    max-width: 100%;
    height: auto!important;
    box-sizing: border-box;
  }

  th, td {
    padding: 8px;
  }
  
  ${props => props.contentType === ContentType.WEB_NOVEL ? novelStyleMixin : ''}
`;
ViewerContents.defaultProps = {
  contentType: ContentType.WEB_NOVEL,
  fontDomain: '',
};

// language=SCSS prefix=dummy{ suffix=}
const PageScreen = ViewerScreen.extend`
  .viewer_bottom {
    min-height: 100%; min-height: 100vh;
    padding: ${NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT + 10}px 0 132px 0;
    box-sizing: border-box;
    user-select: none;
    .viewer_bottom_button_wrapper {
      .move_prev_page_button {
        width: 100%; margin-top: 5px; padding: 15px 0;
        text-align: center; font-size: 14px;
        line-height: 20px;
        .svg_arrow_6_left {
          width: 20px; height: 20px; vertical-align: top;
          margin-right: 8px; content: '';
        }
      }
    }
  }
`;

// language=SCSS prefix=dummy{ suffix=}
const PageContents = ViewerContents.extend`
  overflow: hidden;
  .pages {
    .comic_page {
      img {
        width: auto;
        height: auto;
        max-width: ${props => getComicWidth(props.comicWidthLevel)}%;
        max-height: ${props => getComicWidth(props.comicWidthLevel)}vh;
      }
    }
  }
`;

// language=SCSS prefix=dummy{ suffix=}
const Pages = styled.div`
  .error_image_wrapper {
    height: 100vh; overflow: hidden;
    display: flex; align-items: center;
  }
  .comic_page {
    display: flex; height: 100vh; overflow: hidden;
    box-sizing: border-box; align-items: center;
    img {
      margin: 0 auto;
      padding: 0;
      box-sizing: border-box;
    }
    .error_image_wrapper {
      display: block; height: auto;
    }
  }
`;

// language=SCSS prefix=dummy{ suffix=}
const ScrollScreen = ViewerScreen.extend`
  padding-bottom: 0;
  .error_image_wrapper {
    padding: 100px 0;
  }
  .viewer_bottom {
    padding: 10px 0 94px 0;
  }
`;

// language=SCSS prefix=dummy{ suffix=}
const ScrollContents = ViewerContents.extend`
  article {
    padding: ${props => props.contentType === ContentType.WEB_NOVEL ? getNovelPadding(props.paddingLevel) : getComicPadding(props.paddingLevel)};
  }
  img  {
    padding: 15px;
  }
`;
ScrollContents.defaultProps = {
  contentType: ContentType.WEB_NOVEL,
  fontSizeUnit: 15,
  fontSizeLevel: 4,
  fontFamily: "dotum",
  lineHeight: 1.70,
  paddingLevel: 3,
  comicWidthLevel: 6,
  fontDomain: '',
};

export { ScrollScreen, PageScreen, SizingWrapper, PageContents, Pages, ScrollContents };
