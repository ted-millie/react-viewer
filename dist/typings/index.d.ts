// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../react
//   ../@ridi/reader.js/web

declare module '@ridi/react-reader' {
    import EpubReader from '@ridi/react-reader/components/EpubReader';
    import Loading from '@ridi/react-reader/components/Loading';
    import * as SettingUtil from '@ridi/react-reader/SettingUtil';
    export { EpubReader, Loading, SettingUtil, };
    export * from '@ridi/react-reader/EpubService';
    export * from '@ridi/react-reader/contexts';
    export * from '@ridi/react-reader/ReaderJsHelper';
}

declare module '@ridi/react-reader/components/EpubReader' {
    const EpubReader: () => JSX.Element;
    export default EpubReader;
}

declare module '@ridi/react-reader/components/Loading' {
    /** @jsx jsx */
    import * as React from 'react';
    const Loading: React.FunctionComponent;
    export default Loading;
}

declare module '@ridi/react-reader/SettingUtil' {
    import { SettingState } from '@ridi/react-reader/contexts';
    export const isScroll: ({ viewType }: SettingState) => boolean;
    export const isDoublePage: ({ viewType }: SettingState) => boolean;
    export const columnsInPage: ({ viewType }: SettingState) => number;
    export const columnWidth: (setting: SettingState) => number;
    export const columnGap: ({ columnGapInPercent }: SettingState) => number;
    export const contentPadding: ({ contentPaddingInPercent }: SettingState) => number;
    export const containerWidth: (setting: SettingState) => number;
    export const containerHeight: ({ containerVerticalMargin }: SettingState) => number;
}

declare module '@ridi/react-reader/EpubService' {
    import { PagingAction, SettingAction, SettingState, SpinePagingState, StatusAction } from '@ridi/react-reader/contexts';
    import * as React from 'react';
    export interface FontData {
        href: string;
    }
    export interface EpubParsedData {
        fonts?: Array<FontData>;
        styles?: Array<String>;
        spines?: Array<String>;
        unzipPath: string;
    }
    export class EpubService {
        static dispatchSetting?: React.Dispatch<SettingAction>;
        static dispatchStatus?: React.Dispatch<StatusAction>;
        static dispatchPaging?: React.Dispatch<PagingAction>;
        static init({ dispatchSetting, dispatchPaging, dispatchStatus }: {
            dispatchSetting: React.Dispatch<SettingAction>;
            dispatchStatus: React.Dispatch<StatusAction>;
            dispatchPaging: React.Dispatch<PagingAction>;
        }): void;
        static goToPage: ({ page, pageUnit, isScroll, }: {
            page: number;
            pageUnit: number;
            isScroll: boolean;
        }) => Promise<void>;
        static invalidate: ({ currentSpineIndex, currentPosition, isScroll, columnWidth, columnGap, }: {
            currentSpineIndex: number;
            currentPosition: number;
            isScroll: boolean;
            columnWidth: number;
            columnGap: number;
        }) => Promise<void>;
        static load: ({ currentSpineIndex, currentPosition, metadata, isScroll, columnWidth, columnGap, }: {
            currentSpineIndex: number;
            currentPosition: number;
            metadata: EpubParsedData;
            isScroll: boolean;
            columnWidth: number;
            columnGap: number;
        }) => Promise<void>;
        static loadWithParsedData: ({ currentSpineIndex, currentPosition, metadata, isScroll, columnWidth, columnGap, }: {
            currentSpineIndex: number;
            currentPosition: number;
            metadata: EpubParsedData;
            isScroll: boolean;
            columnWidth: number;
            columnGap: number;
        }) => Promise<void>;
        static updateCurrent: ({ pageUnit, isScroll, spines, }: {
            pageUnit: number;
            isScroll: boolean;
            spines: SpinePagingState[];
        }) => Promise<any>;
        static updateSetting: (setting: Partial<SettingState>) => void;
    }
}

declare module '@ridi/react-reader/contexts' {
    export * from '@ridi/react-reader/contexts/SettingContext';
    export * from '@ridi/react-reader/contexts/PagingContext';
    export * from '@ridi/react-reader/contexts/StatusContext';
    export * from '@ridi/react-reader/contexts/EpubProvider';
}

declare module '@ridi/react-reader/ReaderJsHelper' {
    import { Context, Reader } from '@ridi/reader.js/web';
    class ReaderJsHelper {
        readonly readerJs: Reader | null;
        readonly sel: any;
        readonly content: any;
        readonly context: any;
        _setDebugMode(debugMode?: boolean): void;
        mount(contentRoot: HTMLElement, context: Context): void;
        unmount(): void;
        reviseImages(): Promise<any>;
        getOffsetFromNodeLocation(location: any): number | null;
        getNodeLocationOfCurrentPage(): string | null;
        getRectsFromSerializedRange(serializedRange: string): Array<any> | null;
        getOffsetFromSerializedRange(serializedRange: string): number | null;
        getOffsetFromAnchor(anchor: string): number | null;
    }
    const _default: ReaderJsHelper;
    export default _default;
    export { Context };
}

declare module '@ridi/react-reader/contexts/SettingContext' {
    import { Reducer } from "react";
    export enum ViewType {
        SCROLL = "scroll",
        PAGE1 = "page1",
        PAGE12 = "page12",
        PAGE23 = "page23"
    }
    export enum SettingActionType {
        UPDATE_SETTING = "update_setting"
    }
    export enum SettingProperties {
        VIEW_TYPE = "viewType",
        FONT_SIZE_IN_EM = "fontSizeInEm",
        LINE_HEIGHT_IN_EM = "lineHeightInEm",
        CONTENT_PADDING_IN_PERCENT = "contentPaddingInPercent",
        COLUMN_GAP_IN_PERCENT = "columnGapInPercent",
        MAX_WIDTH = "maxWidth",
        CONTAINER_HORIZONTAL_MARGIN = "containerHorizontalMargin",
        CONTAINER_VERTICAL_MARGIN = "containerVerticalMargin"
    }
    export type SettingAction = {
        type: SettingActionType.UPDATE_SETTING;
        setting: Partial<SettingState>;
    };
    export type SettingState = {
        [SettingProperties.VIEW_TYPE]: ViewType;
        [SettingProperties.FONT_SIZE_IN_EM]: number;
        [SettingProperties.LINE_HEIGHT_IN_EM]: number;
        [SettingProperties.CONTENT_PADDING_IN_PERCENT]: number;
        [SettingProperties.COLUMN_GAP_IN_PERCENT]: number;
        [SettingProperties.MAX_WIDTH]: number;
        [SettingProperties.CONTAINER_HORIZONTAL_MARGIN]: number;
        [SettingProperties.CONTAINER_VERTICAL_MARGIN]: number;
    };
    export const initialSettingState: SettingState;
    export const settingReducer: Reducer<SettingState, SettingAction>;
    export const SettingDispatchContext: import("react").Context<import("react").Dispatch<SettingAction>>, SettingContext: import("react").Context<SettingState>, SettingContextProvider: import("react").FunctionComponent<{
        children: import("react").ReactNode;
        customInitialState?: Partial<SettingState> | undefined;
    }>;
}

declare module '@ridi/react-reader/contexts/PagingContext' {
    import * as React from 'react';
    export enum PagingActionType {
        UPDATE_PAGING = "update_paging"
    }
    export enum PagingProperties {
        TOTAL_PAGE = "totalPage",
        FULL_HEIGHT = "fullHeight",
        FULL_WIDTH = "fullWidth",
        PAGE_UNIT = "pageUnit",
        CURRENT_PAGE = "currentPage",
        CURRENT_SPINE_INDEX = "currentSpineIndex",
        CURRENT_POSITION = "currentPosition",
        SPINES = "spines"
    }
    export type PagingAction = {
        type: PagingActionType.UPDATE_PAGING;
        paging: Partial<PagingState>;
    };
    export type SpinePagingState = {
        spineIndex: number;
        offset: number;
        total: number;
        pageOffset: number;
        totalPage: number;
    };
    export type PagingState = {
        [PagingProperties.TOTAL_PAGE]: number;
        [PagingProperties.FULL_HEIGHT]: number;
        [PagingProperties.FULL_WIDTH]: number;
        [PagingProperties.PAGE_UNIT]: number;
        [PagingProperties.CURRENT_PAGE]: number;
        [PagingProperties.CURRENT_SPINE_INDEX]: number;
        [PagingProperties.CURRENT_POSITION]: number;
        [PagingProperties.SPINES]: Array<SpinePagingState>;
    };
    export const initialPagingState: PagingState;
    export const PagingReducer: React.Reducer<PagingState, PagingAction>;
    export const PagingDispatchContext: React.Context<React.Dispatch<PagingAction>>, PagingContext: React.Context<PagingState>, PagingContextProvider: React.FunctionComponent<{
        children: React.ReactNode;
        customInitialState?: Partial<PagingState> | undefined;
    }>;
}

declare module '@ridi/react-reader/contexts/StatusContext' {
    import * as React from 'react';
    export enum StatusActionType {
        SET_READY_TO_READ = "set_ready_to_read"
    }
    export enum StatusProperties {
        READY_TO_READ = "readyToRead"
    }
    export type StatusAction = {
        type: StatusActionType.SET_READY_TO_READ;
        readyToRead: boolean;
    };
    export type StatusState = {
        [StatusProperties.READY_TO_READ]: boolean;
    };
    export const initialStatusState: StatusState;
    export const StatusReducer: React.Reducer<StatusState, StatusAction>;
    export const StatusDispatchContext: React.Context<React.Dispatch<StatusAction>>, StatusContext: React.Context<StatusState>, StatusContextProvider: React.FunctionComponent<{
        children: React.ReactNode;
        customInitialState?: Partial<StatusState> | undefined;
    }>;
}

declare module '@ridi/react-reader/contexts/EpubProvider' {
    import { PagingState } from '@ridi/react-reader/contexts/PagingContext';
    import { StatusState } from '@ridi/react-reader/contexts/StatusContext';
    import { SettingState } from '@ridi/react-reader/contexts/SettingContext';
    import * as React from 'react';
    export interface EpubProviderProps {
        children: React.ReactNode;
        settingState?: Partial<SettingState>;
        pagingState?: Partial<PagingState>;
        statusState?: Partial<StatusState>;
    }
    export const EpubProvider: React.FunctionComponent<EpubProviderProps>;
}

