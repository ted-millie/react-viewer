import Connector from '../Connector';
import { selectPageViewPagination } from '../../redux/viewerScreen/ViewerScreen.selector';
import { documentClientWidth, documentClientHeight, scrollTo, scrollLeft } from '../BrowserWrapper';
import {
  DEFAULT_PADDING_TOP,
  MAX_PADDING_LEVEL,
  MIN_PADDING_BOTTOM,
  PAGE_MAX_WIDTH,
  PAGE_VIEWER_SELECTOR,
  EXTENDED_TOUCH_WIDTH,
} from '../../constants/StyledConstants';
import { ContentType } from '../../constants/ContentConstants';
import { ViewerType } from '../../constants/ViewerScreenConstants';

class ViewerHelper extends Connector {
  afterConnected() {
    const {
      paddingTop = DEFAULT_PADDING_TOP,
      pageMaxWidth = PAGE_MAX_WIDTH,
      pageViewerSelector = PAGE_VIEWER_SELECTOR,
      extendedTouchWidth = EXTENDED_TOUCH_WIDTH,
    } = this._options;

    this._targetSelector = pageViewerSelector;
    this._paddingTop = paddingTop;
    this._pageMaxWidth = pageMaxWidth;
    this._extendedTouchWidth = extendedTouchWidth;
  }

  getScrollStyle() {
    return {
      paddingTop: this._paddingTop,
    };
  }

  getPageStyle(paddingLevel) {
    const width = documentClientWidth();
    const height = documentClientHeight();

    const maxGap = width > this._pageMaxWidth ? ((width - this._pageMaxWidth) / 2) : 0;
    const paddingHorizontal = parseInt(width * 0.01 * (MAX_PADDING_LEVEL - paddingLevel), 10);
    let paddingVertical = parseInt(width * 0.10, 10);
    paddingVertical = paddingVertical > MIN_PADDING_BOTTOM ? paddingVertical : MIN_PADDING_BOTTOM;
    const columnGap = (paddingHorizontal + maxGap) * 2;

    return {
      WebkitColumnWidth: `${width}px`,
      columnWidth: `${width}px`,
      WebkitColumnGap: columnGap,
      columnGap,
      paddingTop: this._paddingTop,
      paddingBottom: paddingVertical,
      paddingLeft: paddingHorizontal,
      paddingRight: paddingHorizontal,
      boxSizing: 'border-box',
      height,
    };
  }

  getComicPageStyle() {
    const width = documentClientWidth();
    const height = documentClientHeight();

    return {
      WebkitColumnWidth: `${width}px`,
      columnWidth: `${width}px`,
      WebkitColumnGap: 0,
      columnGap: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      height,
    };
  }

  shouldSlideToPage(nextPage) {
    const pageView = selectPageViewPagination(this.getState());
    const { totalPage } = pageView;
    return totalPage > nextPage && (nextPage - 1) * documentClientWidth() !== scrollLeft();
  }

  slideToPage(nextPage) {
    const leftOffset = (nextPage - 1) * documentClientWidth();
    scrollTo(leftOffset, 0);
  }

  getPageMaxWidth() {
    return this._pageMaxWidth || PAGE_MAX_WIDTH;
  }

  getExtendedTouchWidth() {
    return this._extendedTouchWidth || EXTENDED_TOUCH_WIDTH;
  }

  getLeftRightAreaWidth() {
    const clientWidth = documentClientWidth();
    if (clientWidth >= (this.getPageMaxWidth() - this.getExtendedTouchWidth()) * 2) {
      return ((clientWidth - this.getPageMaxWidth()) / 2) + this.getExtendedTouchWidth();
    }
    return clientWidth * 0.25;
  }

  getNovelPadding(level) {
    const paddingValue = 7 - Number(level);
    return `0 ${paddingValue}% 80px ${paddingValue}%`;
  }

  getComicPadding() { return '0'; }

  getComicWidth(level) {
    return (Number(level) * 10) + 40;
  }

  getMaxWidth(contentType, viewerType) {
    if (contentType === ContentType.WEB_NOVEL || viewerType === ViewerType.SCROLL) {
      return `${this.getPageMaxWidth()}px`;
    }
    return 'none';
  }

  getFontSize(level) {
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
  }

  getNovelLineHeight(level) {
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
  }
}
const viewerHelper = new ViewerHelper();
export default viewerHelper;

