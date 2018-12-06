import {
  EventBus,
  Events,
  Connector,
  Service,
  reducers as reader,
  unload,
} from '@ridi/react-viewer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import ContentsData from '../../resources/contents/contents.json';
import viewer from '../redux/Viewer.reducer';
import {
  setAnnotations,
} from '../redux/Viewer.action';
import Cache from '../utils/Cache';
import { screenHeight, screenWidth } from '../utils/BrowserWrapper';
import { selectAnnotations } from '../redux/Viewer.selector';
import { getJson } from '../utils/Api';

class AppService {
  _store = null;

  _contentMeta = null;

  _readerCache = null;

  _annotationCache = null;

  get contentMeta() {
    return this._contentMeta;
  }

  get store() {
    return this._store;
  }

  constructor() {
    this.onMounted = this.onMounted.bind(this);
    this.onUnmounted = this.onUnmounted.bind(this);

    this._setContentMeta();
    this._setRedux();
    this._setCache();
    this._connectWithReactViewer();
  }

  _setContentMeta() {
    const { contents } = ContentsData;
    const queryParam = new URLSearchParams(window.location.search);

    const contentId = queryParam.get('contentId');
    const selected = contents.filter(content => content.id.toString() === contentId);
    this._contentMeta = selected.length === 1 ? selected[0] : contents[Math.floor(Math.random() * contents.length)];
  }

  _setRedux() {
    const rootReducer = combineReducers({
      viewer,
      reader: reader({
        setting: {
          font: 'kopup_dotum',
          containerHorizontalMargin: 30,
          containerVerticalMargin: 50,
        },
      }),
    });

    const enhancer = composeWithDevTools(applyMiddleware(thunk));
    this._store = createStore(rootReducer, {}, enhancer);
  }

  _setCache() {
    this._readerCache = new Cache(
      this._contentMeta.id,
      key => `${key}_${screenWidth()}x${screenHeight()}_${Connector.setting.getSetting().viewType}`,
    );
    this._annotationCache = new Cache(this._contentMeta.id);
  }

  _connectWithReactViewer() {
    EventBus.on(Events.core.MOUNTED, this.onMounted);
    EventBus.on(Events.core.UNMOUNTED, this.onUnmounted);
    Connector.connect(this._store);
  }

  _loadContent() {
    const {
      id,
      contentFormat,
      bindingType,
      hasLoadedContent,
    } = this._contentMeta;

    getJson(`./resources/contents/${id}/spine.json`)
      .then((spines) => {
        if (hasLoadedContent) {
          Service.load.setContentsByValue(contentFormat, bindingType, spines.map(spine => spine.content));
        } else {
          Service.load.setContentsByUri(contentFormat, bindingType, spines.contents);
        }
      });
  }

  onMounted() {
    const readerState = this._readerCache.get();
    if (readerState) {
      Service.loadAll(readerState);
    } else {
      Service.loadAll();
      this._loadContent();
    }
    const annotationsState = this._annotationCache.get();
    if (annotationsState) {
      this._store.dispatch(setAnnotations(annotationsState));
    }
  }

  onUnmounted() {
    if (!Connector.core.isReaderLoaded() || !Connector.core.isReaderAllCalculated()) return;
    const currentState = Connector.core.getReaderState();
    this._readerCache.set(currentState);
    this._annotationCache.set(selectAnnotations(this._store.getState()));
    this._store.dispatch(unload());
  }
}

export default new AppService();