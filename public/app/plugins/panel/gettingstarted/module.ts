import { PanelCtrl } from 'app/plugins/sdk';

import { contextSrv } from 'app/core/core';

class GettingStartedPanelCtrl extends PanelCtrl {
  static templateUrl = 'public/app/plugins/panel/gettingstarted/module.html';
  checksDone: boolean;
  stepIndex: number;
  steps: any;

  /** @ngInject */
  constructor($scope, $injector, private backendSrv, datasourceSrv, private $q) {
    super($scope, $injector);

    this.stepIndex = 0;
    this.steps = [];

    this.steps.push({
      title: '安装 Grafana',
      icon: 'icon-gf icon-gf-check',
      href: 'http://docs.grafana.org/',
      target: '_blank',
      note: 'Review the installation docs',
      check: () => $q.when(true),
    });

    this.steps.push({
      title: '添加你的第一个数据源',
      cta: '添加数据源',
      icon: 'icon-gf icon-gf-datasources',
      href: 'datasources/new?gettingstarted',
      check: () => {
        return $q.when(
          datasourceSrv.getMetricSources().filter(item => {
            return item.meta.builtIn !== true;
          }).length > 0
        );
      },
    });

    this.steps.push({
      title: '创建你的第一个仪表盘',
      cta: '创建仪表盘',
      icon: 'icon-gf icon-gf-dashboard',
      href: 'dashboard/new?gettingstarted',
      check: () => {
        return this.backendSrv.search({ limit: 1 }).then(result => {
          return result.length > 0;
        });
      },
    });

    this.steps.push({
      title: '邀请你的团队',
      cta: '添加用户',
      icon: 'icon-gf icon-gf-users',
      href: 'org/users?gettingstarted',
      check: () => {
        return this.backendSrv.get('/api/org/users').then(res => {
          return res.length > 1;
        });
      },
    });

    this.steps.push({
      title: '安装应用和插件',
      cta: '浏览插件库',
      icon: 'icon-gf icon-gf-apps',
      href: 'https://grafana.com/plugins?utm_source=grafana_getting_started',
      check: () => {
        return this.backendSrv.get('/api/plugins', { embedded: 0, core: 0 }).then(plugins => {
          return plugins.length > 0;
        });
      },
    });
  }

  $onInit() {
    this.stepIndex = -1;
    return this.nextStep().then(res => {
      this.checksDone = true;
    });
  }

  nextStep() {
    if (this.stepIndex === this.steps.length - 1) {
      return this.$q.when();
    }

    this.stepIndex += 1;
    const currentStep = this.steps[this.stepIndex];
    return currentStep.check().then(passed => {
      if (passed) {
        currentStep.cssClass = 'completed';
        return this.nextStep();
      }

      currentStep.cssClass = 'active';
      return this.$q.when();
    });
  }

  dismiss() {
    this.dashboard.removePanel(this.panel, false);

    this.backendSrv
      .request({
        method: 'PUT',
        url: '/api/user/helpflags/1',
        showSuccessAlert: false,
      })
      .then(res => {
        contextSrv.user.helpFlags1 = res.helpFlags1;
      });
  }
}

export { GettingStartedPanelCtrl, GettingStartedPanelCtrl as PanelCtrl };
