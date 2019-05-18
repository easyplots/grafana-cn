// Libaries
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// Utils & Services
import { AngularComponent, getAngularLoader } from 'app/core/services/AngularLoader';
import { appEvents } from 'app/core/app_events';
import { PlaylistSrv } from 'app/features/playlist/playlist_srv';

// Components
import { DashNavButton } from './DashNavButton';
import { Tooltip } from '@grafana/ui';

// State
import { updateLocation } from 'app/core/actions';

// Types
import { DashboardModel } from '../../state';

export interface Props {
  dashboard: DashboardModel;
  editview: string;
  isEditing: boolean;
  isFullscreen: boolean;
  $injector: any;
  updateLocation: typeof updateLocation;
  onAddPanel: () => void;
}

export class DashNav extends PureComponent<Props> {
  timePickerEl: HTMLElement;
  timepickerCmp: AngularComponent;
  playlistSrv: PlaylistSrv;

  constructor(props: Props) {
    super(props);
    this.playlistSrv = this.props.$injector.get('playlistSrv');
  }

  componentDidMount() {
    const loader = getAngularLoader();

    const template =
      '<gf-time-picker class="gf-timepicker-nav" dashboard="dashboard" ng-if="!dashboard.timepicker.hidden" />';
    const scopeProps = { dashboard: this.props.dashboard };

    this.timepickerCmp = loader.load(this.timePickerEl, scopeProps, template);
  }

  componentWillUnmount() {
    if (this.timepickerCmp) {
      this.timepickerCmp.destroy();
    }
  }

  onOpenSearch = () => {
    appEvents.emit('show-dash-search');
  };

  onClose = () => {
    if (this.props.editview) {
      this.props.updateLocation({
        query: { editview: null },
        partial: true,
      });
    } else {
      this.props.updateLocation({
        query: { panelId: null, edit: null, fullscreen: null, tab: null },
        partial: true,
      });
    }
  };

  onToggleTVMode = () => {
    appEvents.emit('toggle-kiosk-mode');
  };

  onSave = () => {
    const { $injector } = this.props;
    const dashboardSrv = $injector.get('dashboardSrv');
    dashboardSrv.saveDashboard();
  };

  onOpenSettings = () => {
    this.props.updateLocation({
      query: { editview: 'settings' },
      partial: true,
    });
  };

  onStarDashboard = () => {
    const { dashboard, $injector } = this.props;
    const dashboardSrv = $injector.get('dashboardSrv');

    dashboardSrv.starDashboard(dashboard.id, dashboard.meta.isStarred).then(newState => {
      dashboard.meta.isStarred = newState;
      this.forceUpdate();
    });
  };

  onPlaylistPrev = () => {
    this.playlistSrv.prev();
  };

  onPlaylistNext = () => {
    this.playlistSrv.next();
  };

  onPlaylistStop = () => {
    this.playlistSrv.stop();
    this.forceUpdate();
  };

  onOpenShare = () => {
    const $rootScope = this.props.$injector.get('$rootScope');
    const modalScope = $rootScope.$new();
    modalScope.tabIndex = 0;
    modalScope.dashboard = this.props.dashboard;

    appEvents.emit('show-modal', {
      src: 'public/app/features/dashboard/components/ShareModal/template.html',
      scope: modalScope,
    });
  };

  renderDashboardTitleSearchButton() {
    const { dashboard } = this.props;

    const folderTitle = dashboard.meta.folderTitle;
    const haveFolder = dashboard.meta.folderId > 0;

    return (
      <>
        <div>
          <a className="navbar-page-btn" onClick={this.onOpenSearch}>
            {!this.isInFullscreenOrSettings && <i className="gicon gicon-dashboard" />}
            {haveFolder && <span className="navbar-page-btn--folder">{folderTitle} / </span>}
            {dashboard.title}
            <i className="fa fa-caret-down" />
          </a>
        </div>
        <div className="navbar__spacer" />
      </>
    );
  }

  get isInFullscreenOrSettings() {
    return this.props.editview || this.props.isFullscreen;
  }

  renderBackButton() {
    return (
      <div className="navbar-edit">
        <Tooltip content="返回 (Esc)">
          <button className="navbar-edit__back-btn" onClick={this.onClose}>
            <i className="fa fa-arrow-left" />
          </button>
        </Tooltip>
      </div>
    );
  }

  render() {
    const { dashboard, onAddPanel } = this.props;
    const { canStar, canSave, canShare, showSettings, isStarred } = dashboard.meta;
    const { snapshot } = dashboard;

    const snapshotUrl = snapshot && snapshot.originalUrl;

    return (
      <div className="navbar">
        {this.isInFullscreenOrSettings && this.renderBackButton()}
        {this.renderDashboardTitleSearchButton()}

        {this.playlistSrv.isPlaying && (
          <div className="navbar-buttons navbar-buttons--playlist">
            <DashNavButton
              tooltip="上一个仪表盘"
              classSuffix="tight"
              icon="fa fa-step-backward"
              onClick={this.onPlaylistPrev}
            />
            <DashNavButton tooltip="停止播放列表" classSuffix="tight" icon="fa fa-stop" onClick={this.onPlaylistStop} />
            <DashNavButton
              tooltip="下一个仪表盘"
              classSuffix="tight"
              icon="fa fa-forward"
              onClick={this.onPlaylistNext}
            />
          </div>
        )}

        <div className="navbar-buttons navbar-buttons--actions">
          {canSave && (
            <DashNavButton
              tooltip="添加面板"
              classSuffix="add-panel"
              icon="gicon gicon-add-panel"
              onClick={onAddPanel}
            />
          )}

          {canStar && (
            <DashNavButton
              tooltip="收藏"
              classSuffix="star"
              icon={`${isStarred ? 'fa fa-star' : 'fa fa-star-o'}`}
              onClick={this.onStarDashboard}
            />
          )}

          {canShare && (
            <DashNavButton
              tooltip="分享仪表盘"
              classSuffix="share"
              icon="fa fa-share-square-o"
              onClick={this.onOpenShare}
            />
          )}

          {canSave && <DashNavButton tooltip="保存仪表盘" classSuffix="save" icon="fa fa-save" onClick={this.onSave} />}

          {snapshotUrl && (
            <DashNavButton
              tooltip="打开原始仪表盘"
              classSuffix="snapshot-origin"
              icon="fa fa-link"
              href={snapshotUrl}
            />
          )}

          {showSettings && (
            <DashNavButton tooltip="仪表盘设置" classSuffix="settings" icon="fa fa-cog" onClick={this.onOpenSettings} />
          )}
        </div>

        <div className="navbar-buttons navbar-buttons--tv">
          <DashNavButton tooltip="循环查看模式" classSuffix="tv" icon="fa fa-desktop" onClick={this.onToggleTVMode} />
        </div>

        <div className="gf-timepicker-nav" ref={element => (this.timePickerEl = element)} />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashNav);
