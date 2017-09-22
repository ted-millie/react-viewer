import Renderer from '../utils/Renderer';
import { renderSpine } from '../../../lib/index';
import { getJson } from '../utils/Api';


export const ViewerUiActions = {
  TOGGLE_VIEWER_SETTING: 'VIEWER_FOOTER:TOGGLE_SETTING',
  VIEWER_SETTING_CHANGED: 'VIEWER:SETTING_CHANGED',
};

export const onToggleViewerSetting = () => ({
  type: ViewerUiActions.TOGGLE_VIEWER_SETTING,
});

export const viewerSettingChanged = changedSetting => ({
  type: ViewerUiActions.VIEWER_SETTING_CHANGED,
  changedSetting,
});

export const updateViewerSettings = changedSetting => (dispatch, getState) => {
  dispatch(viewerSettingChanged(changedSetting));
};

export const requestLoadEpisodeEpub = (spine, index) => (dispatch, getState) => {
  getJson(spine).then(({ value }) => {
    const spineHtml = Renderer.generateSpineHtml(index, value);
    dispatch(renderSpine(index, spineHtml));
  });
};

export const requestLoadEpisode = (contentId, episodeId) => (dispatch, getState) => {
  const spineUrl = `./resources/contents/${contentId}/${episodeId}/spine.json`;
  getJson(spineUrl).then(({ spines }) => {
    spines.forEach((spine, index) => dispatch(requestLoadEpisodeEpub(spine, index)));
  });
};