import * as BrowserWrapper from './BrowserWrapper';
import { isExist } from './Util';
import DOMEventConstants from '../constants/DOMEventConstants';


export const isScrolledToTop = () => BrowserWrapper.scrollTop <= 10;

export const isScrolledToBottom = () => BrowserWrapper.scrollTop() >= BrowserWrapper.scrollHeight() - BrowserWrapper.screenHeight() - 10;


const _preventDefault = e => e.preventDefault();


export const preventScrollEvent = ref => {
  removeScrollEvent(ref);
  if (isExist(ref)) {
    ref.addEventListener(DOMEventConstants.SCROLL, _preventDefault, { passive: false });
    ref.addEventListener(DOMEventConstants.TOUCH_MOVE, _preventDefault, { passive: false });
    ref.addEventListener(DOMEventConstants.MOUSE_WHEEL, _preventDefault);
  }
};

export const removeScrollEvent = ref => {
  if (isExist(ref)) {
    ref.removeEventListener(DOMEventConstants.SCROLL, _preventDefault);
    ref.removeEventListener(DOMEventConstants.TOUCH_MOVE, _preventDefault);
    ref.removeEventListener(DOMEventConstants.MOUSE_WHEEL, _preventDefault);
  }
};

export const pageUp = () => window.scrollTo(0, window.scrollY - (BrowserWrapper.screenHeight() * 0.9));

export const pageDown = () => window.scrollTo(0, window.scrollY + (BrowserWrapper.screenHeight() * 0.9));
