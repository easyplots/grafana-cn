// Libraries
import React, { PureComponent } from 'react';

// Utils & Services
import { AngularComponent, getAngularLoader } from 'app/core/services/AngularLoader';
import { connectWithStore } from 'app/core/utils/connectWithReduxStore';
import { StoreState } from 'app/types';
import { updateLocation } from 'app/core/actions';

// Components
import { EditorTabBody, EditorToolbarView } from './EditorTabBody';
import { VizTypePicker } from './VizTypePicker';
import { PluginHelp } from 'app/core/components/PluginHelp/PluginHelp';
import { FadeIn } from 'app/core/components/Animations/FadeIn';

// Types
import { PanelModel } from '../state';
import { DashboardModel } from '../state';
import { PanelPlugin } from 'app/types/plugins';
import { VizPickerSearch } from './VizPickerSearch';
import PluginStateinfo from 'app/features/plugins/PluginStateInfo';

interface Props {
  panel: PanelModel;
  dashboard: DashboardModel;
  plugin: PanelPlugin;
  angularPanel?: AngularComponent;
  onTypeChanged: (newType: PanelPlugin) => void;
  updateLocation: typeof updateLocation;
  urlOpenVizPicker: boolean;
}

interface State {
  isVizPickerOpen: boolean;
  searchQuery: string;
  scrollTop: number;
  hasBeenFocused: boolean;
}

export class VisualizationTab extends PureComponent<Props, State> {
  element: HTMLElement;
  angularOptions: AngularComponent;

  constructor(props) {
    super(props);

    this.state = {
      isVizPickerOpen: this.props.urlOpenVizPicker,
      hasBeenFocused: false,
      searchQuery: '',
      scrollTop: 0,
    };
  }

  getReactPanelOptions = () => {
    const { panel, plugin } = this.props;
    return panel.getOptions(plugin.reactPlugin.defaults);
  };

  renderPanelOptions() {
    const { plugin, angularPanel } = this.props;

    if (angularPanel) {
      return <div ref={element => (this.element = element)} />;
    }

    if (plugin.reactPlugin) {
      const PanelEditor = plugin.reactPlugin.editor;

      if (PanelEditor) {
        return <PanelEditor options={this.getReactPanelOptions()} onOptionsChange={this.onPanelOptionsChanged} />;
      }
    }

    return <p>Visualization has no options</p>;
  }

  componentDidMount() {
    if (this.shouldLoadAngularOptions()) {
      this.loadAngularOptions();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.plugin !== prevProps.plugin) {
      this.cleanUpAngularOptions();
    }

    if (this.shouldLoadAngularOptions()) {
      this.loadAngularOptions();
    }
  }

  shouldLoadAngularOptions() {
    return this.props.angularPanel && this.element && !this.angularOptions;
  }

  loadAngularOptions() {
    const { angularPanel } = this.props;

    const scope = angularPanel.getScope();

    // When full page reloading in edit mode the angular panel has on fully compiled & instantiated yet
    if (!scope.$$childHead) {
      setTimeout(() => {
        this.forceUpdate();
      });
      return;
    }

    const panelCtrl = scope.$$childHead.ctrl;
    panelCtrl.initEditMode();

    let template = '';
    for (let i = 0; i < panelCtrl.editorTabs.length; i++) {
      template +=
        `
      <div class="panel-options-group" ng-cloak>` +
        (i > 0
          ? `<div class="panel-options-group__header">
           <span class="panel-options-group__title">{{ctrl.editorTabs[${i}].title}}
           </span>
         </div>`
          : '') +
        `<div class="panel-options-group__body">
          <panel-editor-tab editor-tab="ctrl.editorTabs[${i}]" ctrl="ctrl"></panel-editor-tab>
        </div>
      </div>
      `;
    }

    const loader = getAngularLoader();
    const scopeProps = { ctrl: panelCtrl };

    this.angularOptions = loader.load(this.element, scopeProps, template);
  }

  componentWillUnmount() {
    this.cleanUpAngularOptions();
  }

  cleanUpAngularOptions() {
    if (this.angularOptions) {
      this.angularOptions.destroy();
      this.angularOptions = null;
    }
  }

  clearQuery = () => {
    this.setState({ searchQuery: '' });
  };

  onPanelOptionsChanged = (options: any) => {
    this.props.panel.updateOptions(options);
    this.forceUpdate();
  };

  onOpenVizPicker = () => {
    this.setState({ isVizPickerOpen: true, scrollTop: 0 });
  };

  onCloseVizPicker = () => {
    if (this.props.urlOpenVizPicker) {
      this.props.updateLocation({ query: { openVizPicker: null }, partial: true });
    }

    this.setState({ isVizPickerOpen: false, hasBeenFocused: false });
  };

  onSearchQueryChange = (value: string) => {
    this.setState({
      searchQuery: value,
    });
  };

  renderToolbar = (): JSX.Element => {
    const { plugin } = this.props;
    const { isVizPickerOpen, searchQuery } = this.state;

    if (isVizPickerOpen) {
      return (
        <VizPickerSearch
          plugin={plugin}
          searchQuery={searchQuery}
          onChange={this.onSearchQueryChange}
          onClose={this.onCloseVizPicker}
        />
      );
    } else {
      return (
        <div className="toolbar__main" onClick={this.onOpenVizPicker}>
          <img className="toolbar__main-image" src={plugin.info.logos.small} />
          <div className="toolbar__main-name">{plugin.name}</div>
          <i className="fa fa-caret-down" />
        </div>
      );
    }
  };

  onTypeChanged = (plugin: PanelPlugin) => {
    if (plugin.id === this.props.plugin.id) {
      this.setState({ isVizPickerOpen: false });
    } else {
      this.props.onTypeChanged(plugin);
    }
  };

  renderHelp = () => <PluginHelp plugin={this.props.plugin} type="help" />;

  setScrollTop = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    this.setState({ scrollTop: target.scrollTop });
  };

  render() {
    const { plugin } = this.props;
    const { isVizPickerOpen, searchQuery, scrollTop } = this.state;

    const pluginHelp: EditorToolbarView = {
      heading: 'Help',
      icon: 'fa fa-question',
      render: this.renderHelp,
    };

    return (
      <EditorTabBody
        heading="可视化"
        renderToolbar={this.renderToolbar}
        toolbarItems={[pluginHelp]}
        scrollTop={scrollTop}
        setScrollTop={this.setScrollTop}
      >
        <>
          <FadeIn in={isVizPickerOpen} duration={200} unmountOnExit={true} onExited={this.clearQuery}>
            <VizTypePicker
              current={plugin}
              onTypeChanged={this.onTypeChanged}
              searchQuery={searchQuery}
              onClose={this.onCloseVizPicker}
            />
          </FadeIn>
          <PluginStateinfo state={plugin.state} />
          {this.renderPanelOptions()}
        </>
      </EditorTabBody>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  urlOpenVizPicker: !!state.location.query.openVizPicker,
});

const mapDispatchToProps = {
  updateLocation,
};

export default connectWithStore(VisualizationTab, mapStateToProps, mapDispatchToProps);
