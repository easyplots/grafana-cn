(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["explore"],{

/***/ "./public/app/core/components/ToggleButtonGroup/ToggleButtonGroup.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/core/components/ToggleButtonGroup/ToggleButtonGroup.tsx ***!
  \****************************************************************************/
/*! exports provided: default, ToggleButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return ToggleButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");



var ToggleButtonGroup = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToggleButtonGroup, _super);
    function ToggleButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleButtonGroup.prototype.render = function () {
        var _a = this.props, children = _a.children, label = _a.label, transparent = _a.transparent;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
            label && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "gf-form-label " + (transparent ? 'gf-form-label--transparent' : '') }, label),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "toggle-button-group " + (transparent ? 'toggle-button-group--transparent' : '') }, children)));
    };
    return ToggleButtonGroup;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ToggleButtonGroup);
var ToggleButton = function (_a) {
    var children = _a.children, selected = _a.selected, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.value, value = _c === void 0 ? null : _c, tooltip = _a.tooltip, onChange = _a.onChange;
    var onClick = function (event) {
        event.stopPropagation();
        if (onChange) {
            onChange(value);
        }
    };
    var btnClassName = "btn " + className + " " + (selected ? 'active' : '');
    var button = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: btnClassName, onClick: onClick },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, children)));
    if (tooltip) {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], { content: tooltip, placement: "bottom" }, button));
    }
    else {
        return button;
    }
};


/***/ }),

/***/ "./public/app/core/utils/reselect.ts":
/*!*******************************************!*\
  !*** ./public/app/core/utils/reselect.ts ***!
  \*******************************************/
/*! exports provided: createLodashMemoizedSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLodashMemoizedSelector", function() { return createLodashMemoizedSelector; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");


var hashFn = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (acc, val) { return acc + '-' + JSON.stringify(val); }, '');
};
var createLodashMemoizedSelector = Object(reselect__WEBPACK_IMPORTED_MODULE_1__["createSelectorCreator"])(lodash__WEBPACK_IMPORTED_MODULE_0__["memoize"], hashFn);


/***/ }),

/***/ "./public/app/features/explore/ElapsedTime.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/ElapsedTime.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var INTERVAL = 150;
var ElapsedTime = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ElapsedTime, _super);
    function ElapsedTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            elapsed: 0,
        };
        _this.tick = function () {
            var jetzt = Date.now();
            var elapsed = jetzt - _this.offset;
            _this.setState({ elapsed: elapsed });
        };
        return _this;
    }
    ElapsedTime.prototype.start = function () {
        this.offset = Date.now();
        this.timer = window.setInterval(this.tick, INTERVAL);
    };
    ElapsedTime.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.time) {
            clearInterval(this.timer);
        }
        else if (this.props.time) {
            this.start();
        }
    };
    ElapsedTime.prototype.componentDidMount = function () {
        this.start();
    };
    ElapsedTime.prototype.componentWillUnmount = function () {
        clearInterval(this.timer);
    };
    ElapsedTime.prototype.render = function () {
        var elapsed = this.state.elapsed;
        var _a = this.props, className = _a.className, time = _a.time;
        var value = (time || elapsed) / 1000;
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "elapsed-time " + className },
            value.toFixed(1),
            "s");
    };
    return ElapsedTime;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ElapsedTime);


/***/ }),

/***/ "./public/app/features/explore/Error.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Error.tsx ***!
  \***********************************************/
/*! exports provided: Alert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return Alert; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var Alert = function (props) {
    var message = props.message, button = props.button;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-error alert" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fa fa-exclamation-triangle" })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-body" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-title" }, message)),
            button && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-button" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { className: "btn btn-outline-danger", onClick: button.onClick }, button.text))))));
};


/***/ }),

/***/ "./public/app/features/explore/ErrorBoundary.tsx":
/*!*******************************************************!*\
  !*** ./public/app/features/explore/ErrorBoundary.tsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var ErrorBoundary = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { error: null, errorInfo: null };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.errorInfo) {
            // Error path
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "An unexpected error happened."),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("details", { style: { whiteSpace: 'pre-wrap' } },
                    this.state.error && this.state.error.toString(),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                    this.state.errorInfo.componentStack)));
        }
        // Normally, just render children
        return this.props.children;
    };
    return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (ErrorBoundary);


/***/ }),

/***/ "./public/app/features/explore/Explore.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/explore/Explore.tsx ***!
  \*************************************************/
/*! exports provided: Explore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Explore", function() { return Explore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_virtualized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-virtualized */ "./node_modules/react-virtualized/dist/es/index.js");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Error */ "./public/app/features/explore/Error.tsx");
/* harmony import */ var _ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ErrorBoundary */ "./public/app/features/explore/ErrorBoundary.tsx");
/* harmony import */ var _GraphContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./GraphContainer */ "./public/app/features/explore/GraphContainer.tsx");
/* harmony import */ var _LogsContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LogsContainer */ "./public/app/features/explore/LogsContainer.tsx");
/* harmony import */ var _QueryRows__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./QueryRows */ "./public/app/features/explore/QueryRows.tsx");
/* harmony import */ var _TableContainer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TableContainer */ "./public/app/features/explore/TableContainer.tsx");
/* harmony import */ var _TimePicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./TimePicker */ "./public/app/features/explore/TimePicker.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_core_utils_emitter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/core/utils/emitter */ "./public/app/core/utils/emitter.ts");
/* harmony import */ var _ExploreToolbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ExploreToolbar */ "./public/app/features/explore/ExploreToolbar.tsx");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var _NoDataSourceCallToAction__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./NoDataSourceCallToAction */ "./public/app/features/explore/NoDataSourceCallToAction.tsx");
/* harmony import */ var app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! app/core/components/Animations/FadeIn */ "./public/app/core/components/Animations/FadeIn.tsx");

// Libraries


// @ts-ignore


// Services & Utils

// Components







// Actions







/**
 * Explore provides an area for quick query iteration for a given datasource.
 * Once a datasource is selected it populates the query section at the top.
 * When queries are run, their results are being displayed in the main section.
 * The datasource determines what kind of query editor it brings, and what kind
 * of results viewers it supports. The state is managed entirely in Redux.
 *
 * SPLIT VIEW
 *
 * Explore can have two Explore areas side-by-side. This is handled in `Wrapper.tsx`.
 * Since there can be multiple Explores (e.g., left and right) each action needs
 * the `exploreId` as first parameter so that the reducer knows which Explore state
 * is affected.
 *
 * DATASOURCE REQUESTS
 *
 * A click on Run Query creates transactions for all DataQueries for all expanded
 * result viewers. New runs are discarding previous runs. Upon completion a transaction
 * saves the result. The result viewers construct their data from the currently existing
 * transactions.
 *
 * The result viewers determine some of the query options sent to the datasource, e.g.,
 * `format`, to indicate eventual transformations by the datasources' result transformers.
 */
var Explore = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Explore, _super);
    function Explore(props) {
        var _this = _super.call(this, props) || this;
        _this.getRef = function (el) {
            _this.el = el;
        };
        _this.onChangeTime = function (range, changedByScanner) {
            if (_this.props.scanning && !changedByScanner) {
                _this.onStopScanning();
            }
            _this.props.changeTime(_this.props.exploreId, range);
        };
        // Use this in help pages to set page to a single query
        _this.onClickExample = function (query) {
            _this.props.setQueries(_this.props.exploreId, [query]);
        };
        _this.onClickLabel = function (key, value) {
            _this.onModifyQueries({ type: 'ADD_FILTER', key: key, value: value });
        };
        _this.onModifyQueries = function (action, index) {
            var datasourceInstance = _this.props.datasourceInstance;
            if (datasourceInstance && datasourceInstance.modifyQuery) {
                var modifier = function (queries, modification) { return datasourceInstance.modifyQuery(queries, modification); };
                _this.props.modifyQueries(_this.props.exploreId, action, index, modifier);
            }
        };
        _this.onResize = function (size) {
            _this.props.changeSize(_this.props.exploreId, size);
        };
        _this.onStartScanning = function () {
            // Scanner will trigger a query
            var scanner = _this.scanPreviousRange;
            _this.props.scanStart(_this.props.exploreId, scanner);
        };
        _this.scanPreviousRange = function () {
            // Calling move() on the timepicker will trigger this.onChangeTime()
            return _this.timepickerRef.current.move(-1, true);
        };
        _this.onStopScanning = function () {
            _this.props.scanStopAction({ exploreId: _this.props.exploreId });
        };
        _this.refreshExplore = function () {
            var _a = _this.props, exploreId = _a.exploreId, update = _a.update;
            if (update.queries || update.ui || update.range || update.datasource) {
                _this.props.refreshExplore(exploreId);
            }
        };
        _this.renderEmptyState = function () {
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_NoDataSourceCallToAction__WEBPACK_IMPORTED_MODULE_18__["NoDataSourceCallToAction"], null)));
        };
        _this.onReconnect = function (event) {
            var _a = _this.props, exploreId = _a.exploreId, reconnectDatasource = _a.reconnectDatasource;
            event.preventDefault();
            reconnectDatasource(exploreId);
        };
        _this.exploreEvents = new app_core_utils_emitter__WEBPACK_IMPORTED_MODULE_15__["Emitter"]();
        _this.timepickerRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
        return _this;
    }
    Explore.prototype.componentDidMount = function () {
        var _a = this.props, exploreId = _a.exploreId, urlState = _a.urlState, initialized = _a.initialized;
        var _b = (urlState || {}), datasource = _b.datasource, queries = _b.queries, _c = _b.range, range = _c === void 0 ? app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_RANGE"] : _c, _d = _b.ui, ui = _d === void 0 ? app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_UI_STATE"] : _d;
        var initialDatasource = datasource || app_core_store__WEBPACK_IMPORTED_MODULE_5__["default"].get(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["LAST_USED_DATASOURCE_KEY"]);
        var initialQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["ensureQueries"])(queries);
        var initialRange = { from: Object(_TimePicker__WEBPACK_IMPORTED_MODULE_12__["parseTime"])(range.from), to: Object(_TimePicker__WEBPACK_IMPORTED_MODULE_12__["parseTime"])(range.to) };
        var width = this.el ? this.el.offsetWidth : 0;
        // initialize the whole explore first time we mount and if browser history contains a change in datasource
        if (!initialized) {
            this.props.initializeExplore(exploreId, initialDatasource, initialQueries, initialRange, width, this.exploreEvents, ui);
        }
    };
    Explore.prototype.componentWillUnmount = function () {
        this.exploreEvents.removeAllListeners();
    };
    Explore.prototype.componentDidUpdate = function (prevProps) {
        this.refreshExplore();
    };
    Explore.prototype.render = function () {
        var _this = this;
        var _a = this.props, StartPage = _a.StartPage, datasourceInstance = _a.datasourceInstance, datasourceError = _a.datasourceError, datasourceLoading = _a.datasourceLoading, datasourceMissing = _a.datasourceMissing, exploreId = _a.exploreId, showingStartPage = _a.showingStartPage, split = _a.split, supportsGraph = _a.supportsGraph, supportsLogs = _a.supportsLogs, supportsTable = _a.supportsTable, queryKeys = _a.queryKeys;
        var exploreClass = split ? 'explore explore-split' : 'explore';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: exploreClass, ref: this.getRef },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ExploreToolbar__WEBPACK_IMPORTED_MODULE_16__["ExploreToolbar"], { exploreId: exploreId, timepickerRef: this.timepickerRef, onChangeTime: this.onChangeTime }),
            datasourceLoading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" }, "Loading datasource...") : null,
            datasourceMissing ? this.renderEmptyState() : null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_19__["FadeIn"], { duration: datasourceError ? 150 : 5, in: datasourceError ? true : false },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Error__WEBPACK_IMPORTED_MODULE_6__["Alert"], { message: "Error connecting to datasource: " + datasourceError, button: { text: 'Reconnect', onClick: this.onReconnect } }))),
            datasourceInstance && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryRows__WEBPACK_IMPORTED_MODULE_10__["default"], { exploreEvents: this.exploreEvents, exploreId: exploreId, queryKeys: queryKeys }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_4__["AutoSizer"], { onResize: this.onResize, disableHeight: true }, function (_a) {
                    var width = _a.width;
                    if (width === 0) {
                        return null;
                    }
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", { className: "m-t-2", style: { width: width } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__["default"], null,
                            showingStartPage && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StartPage, { onClickExample: _this.onClickExample }),
                            !showingStartPage && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                supportsGraph && !supportsLogs && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_GraphContainer__WEBPACK_IMPORTED_MODULE_8__["default"], { width: width, exploreId: exploreId }),
                                supportsTable && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TableContainer__WEBPACK_IMPORTED_MODULE_11__["default"], { exploreId: exploreId, onClickCell: _this.onClickLabel }),
                                supportsLogs && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogsContainer__WEBPACK_IMPORTED_MODULE_9__["default"], { width: width, exploreId: exploreId, onChangeTime: _this.onChangeTime, onClickLabel: _this.onClickLabel, onStartScanning: _this.onStartScanning, onStopScanning: _this.onStopScanning })))))));
                })))));
    };
    return Explore;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    var split = explore.split;
    var item = explore[exploreId];
    var StartPage = item.StartPage, datasourceError = item.datasourceError, datasourceInstance = item.datasourceInstance, datasourceLoading = item.datasourceLoading, datasourceMissing = item.datasourceMissing, initialized = item.initialized, range = item.range, showingStartPage = item.showingStartPage, supportsGraph = item.supportsGraph, supportsLogs = item.supportsLogs, supportsTable = item.supportsTable, queryKeys = item.queryKeys, urlState = item.urlState, update = item.update;
    return {
        StartPage: StartPage,
        datasourceError: datasourceError,
        datasourceInstance: datasourceInstance,
        datasourceLoading: datasourceLoading,
        datasourceMissing: datasourceMissing,
        initialized: initialized,
        range: range,
        showingStartPage: showingStartPage,
        split: split,
        supportsGraph: supportsGraph,
        supportsLogs: supportsLogs,
        supportsTable: supportsTable,
        queryKeys: queryKeys,
        urlState: urlState,
        update: update,
    };
}
var mapDispatchToProps = {
    changeSize: _state_actions__WEBPACK_IMPORTED_MODULE_13__["changeSize"],
    changeTime: _state_actions__WEBPACK_IMPORTED_MODULE_13__["changeTime"],
    initializeExplore: _state_actions__WEBPACK_IMPORTED_MODULE_13__["initializeExplore"],
    modifyQueries: _state_actions__WEBPACK_IMPORTED_MODULE_13__["modifyQueries"],
    reconnectDatasource: _state_actions__WEBPACK_IMPORTED_MODULE_13__["reconnectDatasource"],
    refreshExplore: _state_actions__WEBPACK_IMPORTED_MODULE_13__["refreshExplore"],
    scanStart: _state_actions__WEBPACK_IMPORTED_MODULE_13__["scanStart"],
    scanStopAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_17__["scanStopAction"],
    setQueries: _state_actions__WEBPACK_IMPORTED_MODULE_13__["setQueries"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Explore)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/ExploreToolbar.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/ExploreToolbar.tsx ***!
  \********************************************************/
/*! exports provided: UnConnectedExploreToolbar, ExploreToolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnConnectedExploreToolbar", function() { return UnConnectedExploreToolbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreToolbar", function() { return ExploreToolbar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _TimePicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TimePicker */ "./public/app/features/explore/TimePicker.tsx");
/* harmony import */ var app_core_components_ClickOutsideWrapper_ClickOutsideWrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/ClickOutsideWrapper/ClickOutsideWrapper */ "./public/app/core/components/ClickOutsideWrapper/ClickOutsideWrapper.tsx");








var IconSide;
(function (IconSide) {
    IconSide["left"] = "left";
    IconSide["right"] = "right";
})(IconSide || (IconSide = {}));
var createResponsiveButton = function (options) {
    var defaultOptions = {
        iconSide: IconSide.left,
    };
    var props = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options, { defaultOptions: defaultOptions });
    var title = props.title, onClick = props.onClick, buttonClassName = props.buttonClassName, iconClassName = props.iconClassName, splitted = props.splitted, iconSide = props.iconSide;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button " + (buttonClassName ? buttonClassName : ''), onClick: onClick },
        iconClassName && iconSide === IconSide.left ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: iconClassName + " icon-margin-right" }) : null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "btn-title" }, !splitted ? title : ''),
        iconClassName && iconSide === IconSide.right ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: iconClassName + " icon-margin-left" }) : null));
};
var UnConnectedExploreToolbar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](UnConnectedExploreToolbar, _super);
    function UnConnectedExploreToolbar(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeDatasource = function (option) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.props.changeDatasource(this.props.exploreId, option.value);
                return [2 /*return*/];
            });
        }); };
        _this.onClearAll = function () {
            _this.props.clearAll(_this.props.exploreId);
        };
        _this.onRunQuery = function () {
            _this.props.runQuery(_this.props.exploreId);
        };
        _this.onCloseTimePicker = function () {
            _this.props.timepickerRef.current.setState({ isOpen: false });
        };
        return _this;
    }
    UnConnectedExploreToolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, datasourceMissing = _a.datasourceMissing, exploreDatasources = _a.exploreDatasources, exploreId = _a.exploreId, loading = _a.loading, range = _a.range, selectedDatasource = _a.selectedDatasource, splitted = _a.splitted, timepickerRef = _a.timepickerRef;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: splitted ? 'explore-toolbar splitted' : 'explore-toolbar' },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-item" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-header" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-header-title" }, exploreId === 'left' && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "navbar-page-btn" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "gicon gicon-explore" }),
                        "Explore"))),
                    splitted && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "explore-toolbar-header-close", onClick: function () { return _this.props.closeSplit(exploreId); } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-times fa-fw" }))))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-item" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-content" },
                    !datasourceMissing ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "datasource-picker" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_4__["DataSourcePicker"], { onChange: this.onChangeDatasource, datasources: exploreDatasources, current: selectedDatasource })))) : null,
                    exploreId === 'left' && !splitted ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-content-item" }, createResponsiveButton({
                        splitted: splitted,
                        title: 'Split',
                        onClick: this.props.split,
                        iconClassName: 'fa fa-fw fa-columns icon-margin-right',
                        iconSide: IconSide.left,
                    }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-content-item timepicker" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_ClickOutsideWrapper_ClickOutsideWrapper__WEBPACK_IMPORTED_MODULE_7__["ClickOutsideWrapper"], { onClick: this.onCloseTimePicker },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TimePicker__WEBPACK_IMPORTED_MODULE_6__["default"], { ref: timepickerRef, range: range, onChangeTime: this.props.onChangeTime }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--no-icon", onClick: this.onClearAll }, "Clear All")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-toolbar-content-item" }, createResponsiveButton({
                        splitted: splitted,
                        title: 'Run Query',
                        onClick: this.onRunQuery,
                        buttonClassName: 'navbar-button--secondary',
                        iconClassName: loading ? 'fa fa-spinner fa-fw fa-spin run-icon' : 'fa fa-level-down fa-fw run-icon',
                        iconSide: IconSide.right,
                    }))))));
    };
    return UnConnectedExploreToolbar;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var mapStateToProps = function (state, _a) {
    var exploreId = _a.exploreId;
    var splitted = state.explore.split;
    var exploreItem = state.explore[exploreId];
    var datasourceInstance = exploreItem.datasourceInstance, datasourceMissing = exploreItem.datasourceMissing, exploreDatasources = exploreItem.exploreDatasources, queryTransactions = exploreItem.queryTransactions, range = exploreItem.range;
    var selectedDatasource = datasourceInstance
        ? exploreDatasources.find(function (datasource) { return datasource.name === datasourceInstance.name; })
        : undefined;
    var loading = queryTransactions.some(function (qt) { return !qt.done; });
    return {
        datasourceMissing: datasourceMissing,
        exploreDatasources: exploreDatasources,
        loading: loading,
        range: range,
        selectedDatasource: selectedDatasource,
        splitted: splitted,
    };
};
var mapDispatchToProps = {
    changeDatasource: _state_actions__WEBPACK_IMPORTED_MODULE_5__["changeDatasource"],
    clearAll: _state_actions__WEBPACK_IMPORTED_MODULE_5__["clearQueries"],
    runQuery: _state_actions__WEBPACK_IMPORTED_MODULE_5__["runQueries"],
    closeSplit: _state_actions__WEBPACK_IMPORTED_MODULE_5__["splitClose"],
    split: _state_actions__WEBPACK_IMPORTED_MODULE_5__["splitOpen"],
};
var ExploreToolbar = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(UnConnectedExploreToolbar));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/Graph.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Graph.tsx ***!
  \***********************************************/
/*! exports provided: Graph, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graph", function() { return Graph; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vendor_flot_jquery_flot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vendor/flot/jquery.flot */ "./public/vendor/flot/jquery.flot.js");
/* harmony import */ var vendor_flot_jquery_flot__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vendor_flot_jquery_flot__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vendor_flot_jquery_flot_time__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vendor/flot/jquery.flot.time */ "./public/vendor/flot/jquery.flot.time.js");
/* harmony import */ var vendor_flot_jquery_flot_time__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vendor_flot_jquery_flot_time__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vendor_flot_jquery_flot_selection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vendor/flot/jquery.flot.selection */ "./public/vendor/flot/jquery.flot.selection.js");
/* harmony import */ var vendor_flot_jquery_flot_selection__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vendor_flot_jquery_flot_selection__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vendor_flot_jquery_flot_stack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vendor/flot/jquery.flot.stack */ "./public/vendor/flot/jquery.flot.stack.js");
/* harmony import */ var vendor_flot_jquery_flot_stack__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vendor_flot_jquery_flot_stack__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/utils/datemath */ "./public/app/core/utils/datemath.ts");
/* harmony import */ var _Legend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Legend */ "./public/app/features/explore/Legend.tsx");
/* harmony import */ var _utils_set__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/set */ "./public/app/features/explore/utils/set.ts");











var MAX_NUMBER_OF_TIME_SERIES = 20;
// Copied from graph.ts
function time_format(ticks, min, max) {
    if (min && max && ticks) {
        var range = max - min;
        var secPerTick = range / ticks / 1000;
        var oneDay = 86400000;
        var oneYear = 31536000000;
        if (secPerTick <= 45) {
            return '%H:%M:%S';
        }
        if (secPerTick <= 7200 || range <= oneDay) {
            return '%H:%M';
        }
        if (secPerTick <= 80000) {
            return '%m/%d %H:%M';
        }
        if (secPerTick <= 2419200 || range <= oneYear) {
            return '%m/%d';
        }
        return '%Y-%m';
    }
    return '%H:%M';
}
var FLOT_OPTIONS = {
    legend: {
        show: false,
    },
    series: {
        lines: {
            linewidth: 1,
            zero: false,
        },
        shadowSize: 0,
    },
    grid: {
        minBorderMargin: 0,
        markings: [],
        backgroundColor: null,
        borderWidth: 0,
        // hoverable: true,
        clickable: true,
        color: '#a1a1a1',
        margin: { left: 0, right: 0 },
        labelMarginX: 0,
    },
    selection: {
        mode: 'x',
        color: '#666',
    },
};
var Graph = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Graph, _super);
    function Graph() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dynamicOptions = null;
        _this.state = {
            hiddenSeries: new Set(),
            showAllTimeSeries: false,
        };
        _this.onPlotSelected = function (event, ranges) {
            if (_this.props.onChangeTime) {
                var range = {
                    from: moment__WEBPACK_IMPORTED_MODULE_3___default()(ranges.xaxis.from),
                    to: moment__WEBPACK_IMPORTED_MODULE_3___default()(ranges.xaxis.to),
                };
                _this.props.onChangeTime(range);
            }
        };
        _this.onShowAllTimeSeries = function () {
            _this.setState({
                showAllTimeSeries: true,
            }, _this.draw);
        };
        _this.onToggleSeries = function (series, exclusive) {
            _this.setState(function (state, props) {
                var data = props.data, onToggleSeries = props.onToggleSeries;
                var hiddenSeries = state.hiddenSeries;
                // Deduplicate series as visibility tracks the alias property
                var oneSeriesVisible = hiddenSeries.size === new Set(data.map(function (d) { return d.alias; })).size - 1;
                var nextHiddenSeries = new Set();
                if (exclusive) {
                    if (hiddenSeries.has(series.alias) || !oneSeriesVisible) {
                        nextHiddenSeries = new Set(data.filter(function (d) { return d.alias !== series.alias; }).map(function (d) { return d.alias; }));
                    }
                }
                else {
                    // Prune hidden series no longer part of those available from the most recent query
                    var availableSeries = new Set(data.map(function (d) { return d.alias; }));
                    nextHiddenSeries = Object(_utils_set__WEBPACK_IMPORTED_MODULE_10__["intersect"])(new Set(hiddenSeries), availableSeries);
                    if (nextHiddenSeries.has(series.alias)) {
                        nextHiddenSeries.delete(series.alias);
                    }
                    else {
                        nextHiddenSeries.add(series.alias);
                    }
                }
                if (onToggleSeries) {
                    onToggleSeries(series.alias, nextHiddenSeries);
                }
                return {
                    hiddenSeries: nextHiddenSeries,
                };
            }, _this.draw);
        };
        return _this;
    }
    Graph.prototype.getGraphData = function () {
        var data = this.props.data;
        return this.state.showAllTimeSeries ? data : data.slice(0, MAX_NUMBER_OF_TIME_SERIES);
    };
    Graph.prototype.componentDidMount = function () {
        this.draw();
        this.$el = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#" + this.props.id);
        this.$el.bind('plotselected', this.onPlotSelected);
    };
    Graph.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.data !== this.props.data ||
            prevProps.range !== this.props.range ||
            prevProps.split !== this.props.split ||
            prevProps.height !== this.props.height ||
            prevProps.width !== this.props.width ||
            !Object(_utils_set__WEBPACK_IMPORTED_MODULE_10__["equal"])(prevState.hiddenSeries, this.state.hiddenSeries)) {
            this.draw();
        }
    };
    Graph.prototype.componentWillUnmount = function () {
        this.$el.unbind('plotselected', this.onPlotSelected);
    };
    Graph.prototype.getDynamicOptions = function () {
        var _a = this.props, range = _a.range, width = _a.width;
        var ticks = (width || 0) / 100;
        var from = range.from, to = range.to;
        if (!moment__WEBPACK_IMPORTED_MODULE_3___default.a.isMoment(from)) {
            from = app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_8__["parse"](from, false);
        }
        if (!moment__WEBPACK_IMPORTED_MODULE_3___default.a.isMoment(to)) {
            to = app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_8__["parse"](to, true);
        }
        var min = from.valueOf();
        var max = to.valueOf();
        return {
            xaxis: {
                mode: 'time',
                min: min,
                max: max,
                label: 'Datetime',
                ticks: ticks,
                timezone: 'browser',
                timeformat: time_format(ticks, min, max),
            },
        };
    };
    Graph.prototype.draw = function () {
        var _a = this.props.userOptions, userOptions = _a === void 0 ? {} : _a;
        var hiddenSeries = this.state.hiddenSeries;
        var data = this.getGraphData();
        var $el = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#" + this.props.id);
        var series = [{ data: [[0, 0]] }];
        if (data && data.length > 0) {
            series = data
                .filter(function (ts) { return !hiddenSeries.has(ts.alias); })
                .map(function (ts) { return ({
                color: ts.color,
                label: ts.label,
                data: ts.getFlotPairs('null'),
            }); });
        }
        this.dynamicOptions = this.getDynamicOptions();
        var options = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, FLOT_OPTIONS, this.dynamicOptions, userOptions);
        jquery__WEBPACK_IMPORTED_MODULE_1___default.a.plot($el, series, options);
    };
    Graph.prototype.render = function () {
        var _a = this.props, _b = _a.height, height = _b === void 0 ? 100 : _b, _c = _a.id, id = _c === void 0 ? 'graph' : _c;
        var hiddenSeries = this.state.hiddenSeries;
        var data = this.getGraphData();
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
            this.props.data && this.props.data.length > MAX_NUMBER_OF_TIME_SERIES && !this.state.showAllTimeSeries && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "time-series-disclaimer" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-fw fa-warning disclaimer-icon" }), "Showing only " + MAX_NUMBER_OF_TIME_SERIES + " time series. ",
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "show-all-time-series", onClick: this.onShowAllTimeSeries }, "Show all " + this.props.data.length))),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { id: id, className: "explore-graph", style: { height: height } }),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Legend__WEBPACK_IMPORTED_MODULE_9__["default"], { data: data, hiddenSeries: hiddenSeries, onToggleSeries: this.onToggleSeries })));
    };
    return Graph;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (Graph);


/***/ }),

/***/ "./public/app/features/explore/GraphContainer.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/GraphContainer.tsx ***!
  \********************************************************/
/*! exports provided: GraphContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphContainer", function() { return GraphContainer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Graph */ "./public/app/features/explore/Graph.tsx");
/* harmony import */ var _Panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Panel */ "./public/app/features/explore/Panel.tsx");







var GraphContainer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GraphContainer, _super);
    function GraphContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickGraphButton = function () {
            _this.props.toggleGraph(_this.props.exploreId, _this.props.showingGraph);
        };
        _this.onChangeTime = function (timeRange) {
            _this.props.changeTime(_this.props.exploreId, timeRange);
        };
        return _this;
    }
    GraphContainer.prototype.render = function () {
        var _a = this.props, exploreId = _a.exploreId, graphResult = _a.graphResult, loading = _a.loading, showingGraph = _a.showingGraph, showingTable = _a.showingTable, range = _a.range, split = _a.split, width = _a.width;
        var graphHeight = showingGraph && showingTable ? 200 : 400;
        if (!graphResult) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Panel__WEBPACK_IMPORTED_MODULE_6__["default"], { label: "Graph", isOpen: showingGraph, loading: loading, onToggle: this.onClickGraphButton },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Graph__WEBPACK_IMPORTED_MODULE_5__["default"], { data: graphResult, height: graphHeight, id: "explore-graph-" + exploreId, onChangeTime: this.onChangeTime, range: range, split: split, width: width })));
    };
    return GraphContainer;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    var split = explore.split;
    var item = explore[exploreId];
    var graphResult = item.graphResult, queryTransactions = item.queryTransactions, range = item.range, showingGraph = item.showingGraph, showingTable = item.showingTable;
    var loading = queryTransactions.some(function (qt) { return qt.resultType === 'Graph' && !qt.done; });
    return { graphResult: graphResult, loading: loading, range: range, showingGraph: showingGraph, showingTable: showingTable, split: split };
}
var mapDispatchToProps = {
    toggleGraph: _state_actions__WEBPACK_IMPORTED_MODULE_4__["toggleGraph"],
    changeTime: _state_actions__WEBPACK_IMPORTED_MODULE_4__["changeTime"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(GraphContainer)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/Legend.tsx":
/*!************************************************!*\
  !*** ./public/app/features/explore/Legend.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



var LegendItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LegendItem, _super);
    function LegendItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickLabel = function (e) { return _this.props.onClickLabel(_this.props.series, e); };
        return _this;
    }
    LegendItem.prototype.render = function () {
        var _a = this.props, hidden = _a.hidden, series = _a.series;
        var seriesClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'graph-legend-series-hidden': hidden,
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "graph-legend-series " + seriesClasses },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "graph-legend-icon" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-minus pointer", style: { color: series.color } })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "graph-legend-alias pointer", title: series.alias, onClick: this.onClickLabel }, series.alias)));
    };
    return LegendItem;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var Legend = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Legend, _super);
    function Legend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickLabel = function (series, event) {
            var onToggleSeries = _this.props.onToggleSeries;
            var exclusive = event.ctrlKey || event.metaKey || event.shiftKey;
            onToggleSeries(series, !exclusive);
        };
        return _this;
    }
    Legend.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, hiddenSeries = _a.hiddenSeries;
        var items = data || [];
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "graph-legend ps" }, items.map(function (series, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LegendItem, { hidden: hiddenSeries.has(series.alias), 
            // Workaround to resolve conflicts since series visibility tracks the alias property
            key: series.id + "-" + i, onClickLabel: _this.onClickLabel, series: series })); })));
    };
    Legend.defaultProps = {
        onToggleSeries: function () { },
    };
    return Legend;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Legend);


/***/ }),

/***/ "./public/app/features/explore/LogLabel.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/explore/LogLabel.tsx ***!
  \**************************************************/
/*! exports provided: LogLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLabel", function() { return LogLabel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");
/* harmony import */ var _LogLabelStats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LogLabelStats */ "./public/app/features/explore/LogLabelStats.tsx");




var LogLabel = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LogLabel, _super);
    function LogLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            stats: null,
            showStats: false,
        };
        _this.onClickClose = function () {
            _this.setState({ showStats: false });
        };
        _this.onClickLabel = function () {
            var _a = _this.props, onClickLabel = _a.onClickLabel, label = _a.label, value = _a.value;
            if (onClickLabel) {
                onClickLabel(label, value);
            }
        };
        _this.onClickStats = function () {
            _this.setState(function (state) {
                if (state.showStats) {
                    return { showStats: false, stats: null };
                }
                var allRows = _this.props.getRows();
                var stats = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_2__["calculateLogsLabelStats"])(allRows, _this.props.label);
                return { showStats: true, stats: stats };
            });
        };
        return _this;
    }
    LogLabel.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, label = _a.label, plain = _a.plain, value = _a.value;
        var _b = this.state, showStats = _b.showStats, stats = _b.stats;
        var tooltip = label + ": " + value;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-label" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-label__value", title: tooltip }, value),
            !plain && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { title: "Filter for label", onClick: this.onClickLabel, className: "logs-label__icon fa fa-search-plus" })),
            !plain && getRows && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { onClick: this.onClickStats, className: "logs-label__icon fa fa-signal" }),
            showStats && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-label__stats" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogLabelStats__WEBPACK_IMPORTED_MODULE_3__["LogLabelStats"], { stats: stats, rowCount: getRows().length, label: label, value: value, onClickClose: this.onClickClose })))));
    };
    return LogLabel;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/explore/LogLabelStats.tsx":
/*!*******************************************************!*\
  !*** ./public/app/features/explore/LogLabelStats.tsx ***!
  \*******************************************************/
/*! exports provided: LogLabelStats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLabelStats", function() { return LogLabelStats; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



function LogLabelStatsRow(logLabelStatsModel) {
    var active = logLabelStatsModel.active, count = logLabelStatsModel.count, proportion = logLabelStatsModel.proportion, value = logLabelStatsModel.value;
    var percent = Math.round(proportion * 100) + "%";
    var barStyle = { width: percent };
    var className = classnames__WEBPACK_IMPORTED_MODULE_2___default()('logs-stats-row', { 'logs-stats-row--active': active });
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__label" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__value", title: value }, value),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__count" }, count),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__percent" }, percent)),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__bar" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats-row__innerbar", style: barStyle }))));
}
var STATS_ROW_LIMIT = 5;
var LogLabelStats = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LogLabelStats, _super);
    function LogLabelStats() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogLabelStats.prototype.render = function () {
        var _a = this.props, label = _a.label, rowCount = _a.rowCount, stats = _a.stats, value = _a.value, onClickClose = _a.onClickClose;
        var topRows = stats.slice(0, STATS_ROW_LIMIT);
        var activeRow = topRows.find(function (row) { return row.value === value; });
        var otherRows = stats.slice(STATS_ROW_LIMIT);
        var insertActiveRow = !activeRow;
        // Remove active row from other to show extra
        if (insertActiveRow) {
            activeRow = otherRows.find(function (row) { return row.value === value; });
            otherRows = otherRows.filter(function (row) { return row.value !== value; });
        }
        var otherCount = otherRows.reduce(function (sum, row) { return sum + row.count; }, 0);
        var topCount = topRows.reduce(function (sum, row) { return sum + row.count; }, 0);
        var total = topCount + otherCount;
        var otherProportion = otherCount / total;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats__header" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-stats__title" },
                    label,
                    ": ",
                    total,
                    " of ",
                    rowCount,
                    " rows have that label"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-stats__close fa fa-remove", onClick: onClickClose })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-stats__body" },
                topRows.map(function (stat) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LogLabelStatsRow, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ key: stat.value }, stat, { active: stat.value === value }))); }),
                insertActiveRow && activeRow && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LogLabelStatsRow, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ key: activeRow.value }, activeRow, { active: true })),
                otherCount > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LogLabelStatsRow, { key: "__OTHERS__", count: otherCount, value: "Other", proportion: otherProportion })))));
    };
    return LogLabelStats;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/explore/LogLabels.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/explore/LogLabels.tsx ***!
  \***************************************************/
/*! exports provided: LogLabels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLabels", function() { return LogLabels; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LogLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LogLabel */ "./public/app/features/explore/LogLabel.tsx");



var LogLabels = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LogLabels, _super);
    function LogLabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogLabels.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, labels = _a.labels, onClickLabel = _a.onClickLabel, plain = _a.plain;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-labels" }, Object.keys(labels).map(function (key) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogLabel__WEBPACK_IMPORTED_MODULE_2__["LogLabel"], { key: key, getRows: getRows, label: key, value: labels[key], plain: plain, onClickLabel: onClickLabel })); })));
    };
    return LogLabels;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/explore/LogMessageAnsi.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/LogMessageAnsi.tsx ***!
  \********************************************************/
/*! exports provided: LogMessageAnsi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogMessageAnsi", function() { return LogMessageAnsi; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vendor_ansicolor_ansicolor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vendor/ansicolor/ansicolor */ "./public/vendor/ansicolor/ansicolor.ts");



function convertCSSToStyle(css) {
    return css.split(/;\s*/).reduce(function (accumulated, line) {
        var match = line.match(/([^:\s]+)\s*:\s*(.+)/);
        if (match && match[1] && match[2]) {
            var key = match[1].replace(/-(a-z)/g, function (_, character) { return character.toUpperCase(); });
            accumulated[key] = match[2];
        }
        return accumulated;
    }, {});
}
var LogMessageAnsi = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LogMessageAnsi, _super);
    function LogMessageAnsi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            chunks: [],
            prevValue: '',
        };
        return _this;
    }
    LogMessageAnsi.getDerivedStateFromProps = function (props, state) {
        if (props.value === state.prevValue) {
            return null;
        }
        var parsed = vendor_ansicolor_ansicolor__WEBPACK_IMPORTED_MODULE_2__["default"].parse(props.value);
        return {
            chunks: parsed.spans.map(function (span) {
                return span.css
                    ? {
                        style: convertCSSToStyle(span.css),
                        text: span.text,
                    }
                    : { text: span.text };
            }),
            prevValue: props.value,
        };
    };
    LogMessageAnsi.prototype.render = function () {
        var chunks = this.state.chunks;
        return chunks.map(function (chunk, index) {
            return chunk.style ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { key: index, style: chunk.style }, chunk.text)) : (chunk.text);
        });
    };
    return LogMessageAnsi;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/explore/LogRow.tsx":
/*!************************************************!*\
  !*** ./public/app/features/explore/LogRow.tsx ***!
  \************************************************/
/*! exports provided: LogRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogRow", function() { return LogRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-highlight-words */ "./node_modules/react-highlight-words/dist/main.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_highlight_words__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");
/* harmony import */ var _LogLabels__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LogLabels */ "./public/app/features/explore/LogLabels.tsx");
/* harmony import */ var app_core_utils_text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/utils/text */ "./public/app/core/utils/text.ts");
/* harmony import */ var _LogLabelStats__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LogLabelStats */ "./public/app/features/explore/LogLabelStats.tsx");
/* harmony import */ var _LogMessageAnsi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LogMessageAnsi */ "./public/app/features/explore/LogMessageAnsi.tsx");










/**
 * Renders a highlighted field.
 * When hovering, a stats icon is shown.
 */
var FieldHighlight = function (onClick) { return function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: props.className, style: props.style },
        props.children,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-row__field-highlight--icon fa fa-signal", onClick: function () { return onClick(props.children); } })));
}; };
/**
 * Renders a log line.
 *
 * When user hovers over it for a certain time, it lazily parses the log line.
 * Once a parser is found, it will determine fields, that will be highlighted.
 * When the user requests stats for a field, they will be calculated and rendered below the row.
 */
var LogRow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LogRow, _super);
    function LogRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            fieldCount: 0,
            fieldLabel: null,
            fieldStats: null,
            fieldValue: null,
            parsed: false,
            parser: undefined,
            parsedFieldHighlights: [],
            showFieldStats: false,
        };
        _this.onClickClose = function () {
            _this.setState({ showFieldStats: false });
        };
        _this.onClickHighlight = function (fieldText) {
            var getRows = _this.props.getRows;
            var parser = _this.state.parser;
            var allRows = getRows();
            // Build value-agnostic row matcher based on the field label
            var fieldLabel = parser.getLabelFromField(fieldText);
            var fieldValue = parser.getValueFromField(fieldText);
            var matcher = parser.buildMatcher(fieldLabel);
            var fieldStats = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["calculateFieldStats"])(allRows, matcher);
            var fieldCount = fieldStats.reduce(function (sum, stat) { return sum + stat.count; }, 0);
            _this.setState({ fieldCount: fieldCount, fieldLabel: fieldLabel, fieldStats: fieldStats, fieldValue: fieldValue, showFieldStats: true });
        };
        _this.onMouseOverMessage = function () {
            // Don't parse right away, user might move along
            _this.mouseMessageTimer = setTimeout(_this.parseMessage, 500);
        };
        _this.onMouseOutMessage = function () {
            clearTimeout(_this.mouseMessageTimer);
            _this.setState({ parsed: false });
        };
        _this.parseMessage = function () {
            if (!_this.state.parsed) {
                var row = _this.props.row;
                var parser = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["getParser"])(row.entry);
                if (parser) {
                    // Use parser to highlight detected fields
                    var parsedFieldHighlights = parser.getFields(_this.props.row.entry);
                    _this.setState({ parsedFieldHighlights: parsedFieldHighlights, parsed: true, parser: parser });
                }
            }
        };
        return _this;
    }
    LogRow.prototype.componentWillUnmount = function () {
        clearTimeout(this.mouseMessageTimer);
    };
    LogRow.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, highlighterExpressions = _a.highlighterExpressions, onClickLabel = _a.onClickLabel, row = _a.row, showDuplicates = _a.showDuplicates, showLabels = _a.showLabels, showLocalTime = _a.showLocalTime, showUtc = _a.showUtc;
        var _b = this.state, fieldCount = _b.fieldCount, fieldLabel = _b.fieldLabel, fieldStats = _b.fieldStats, fieldValue = _b.fieldValue, parsed = _b.parsed, parsedFieldHighlights = _b.parsedFieldHighlights, showFieldStats = _b.showFieldStats;
        var entry = row.entry, hasAnsi = row.hasAnsi, raw = row.raw;
        var previewHighlights = highlighterExpressions && !lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEqual(highlighterExpressions, row.searchWords);
        var highlights = previewHighlights ? highlighterExpressions : row.searchWords;
        var needsHighlighter = highlights && highlights.length > 0 && highlights[0].length > 0;
        var highlightClassName = classnames__WEBPACK_IMPORTED_MODULE_4___default()('logs-row__match-highlight', {
            'logs-row__match-highlight--preview': previewHighlights,
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-row" },
            showDuplicates && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-row__duplicates" }, row.duplicates > 0 ? row.duplicates + 1 + "x" : null)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: row.logLevel ? "logs-row__level logs-row__level--" + row.logLevel : '' }),
            showUtc && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-row__time", title: "Local: " + row.timeLocal + " (" + row.timeFromNow + ")" }, row.timestamp)),
            showLocalTime && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-row__localtime", title: row.timestamp + " (" + row.timeFromNow + ")" }, row.timeLocal)),
            showLabels && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-row__labels" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogLabels__WEBPACK_IMPORTED_MODULE_6__["LogLabels"], { getRows: getRows, labels: row.uniqueLabels, onClickLabel: onClickLabel }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-row__message", onMouseEnter: this.onMouseOverMessage, onMouseLeave: this.onMouseOutMessage },
                parsed && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_highlight_words__WEBPACK_IMPORTED_MODULE_3___default.a, { autoEscape: true, highlightTag: FieldHighlight(this.onClickHighlight), textToHighlight: entry, searchWords: parsedFieldHighlights, highlightClassName: "logs-row__field-highlight" })),
                !parsed && needsHighlighter && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_highlight_words__WEBPACK_IMPORTED_MODULE_3___default.a, { textToHighlight: entry, searchWords: highlights, findChunks: app_core_utils_text__WEBPACK_IMPORTED_MODULE_7__["findHighlightChunksInText"], highlightClassName: highlightClassName })),
                hasAnsi && !parsed && !needsHighlighter && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogMessageAnsi__WEBPACK_IMPORTED_MODULE_9__["LogMessageAnsi"], { value: raw }),
                !hasAnsi && !parsed && !needsHighlighter && entry,
                showFieldStats && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-row__stats" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogLabelStats__WEBPACK_IMPORTED_MODULE_8__["LogLabelStats"], { stats: fieldStats, label: fieldLabel, value: fieldValue, onClickClose: this.onClickClose, rowCount: fieldCount }))))));
    };
    return LogRow;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/explore/Logs.tsx":
/*!**********************************************!*\
  !*** ./public/app/features/explore/Logs.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/utils/rangeutil */ "./public/app/core/utils/rangeutil.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_time_series2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/time_series2 */ "./public/app/core/time_series2.ts");
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");
/* harmony import */ var app_core_components_ToggleButtonGroup_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/ToggleButtonGroup/ToggleButtonGroup */ "./public/app/core/components/ToggleButtonGroup/ToggleButtonGroup.tsx");
/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Graph */ "./public/app/features/explore/Graph.tsx");
/* harmony import */ var _LogLabels__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LogLabels */ "./public/app/features/explore/LogLabels.tsx");
/* harmony import */ var _LogRow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LogRow */ "./public/app/features/explore/LogRow.tsx");










var PREVIEW_LIMIT = 100;
var graphOptions = {
    series: {
        stack: true,
        bars: {
            show: true,
            lineWidth: 5,
        },
    },
    yaxis: {
        tickDecimals: 0,
    },
};
function renderMetaItem(value, kind) {
    if (kind === app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["LogsMetaKind"].LabelsMap) {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-meta-item__labels" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogLabels__WEBPACK_IMPORTED_MODULE_8__["LogLabels"], { labels: value, plain: true })));
    }
    return value;
}
var Logs = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Logs, _super);
    function Logs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            deferLogs: true,
            renderAll: false,
            showLabels: false,
            showLocalTime: true,
            showUtc: false,
        };
        _this.onChangeDedup = function (dedup) {
            var onDedupStrategyChange = _this.props.onDedupStrategyChange;
            if (_this.props.dedupStrategy === dedup) {
                return onDedupStrategyChange(app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["LogsDedupStrategy"].none);
            }
            return onDedupStrategyChange(dedup);
        };
        _this.onChangeLabels = function (event) {
            var target = event.target;
            _this.setState({
                showLabels: target.checked,
            });
        };
        _this.onChangeLocalTime = function (event) {
            var target = event.target;
            _this.setState({
                showLocalTime: target.checked,
            });
        };
        _this.onChangeUtc = function (event) {
            var target = event.target;
            _this.setState({
                showUtc: target.checked,
            });
        };
        _this.onToggleLogLevel = function (rawLevel, hiddenRawLevels) {
            var hiddenLogLevels = new Set(Array.from(hiddenRawLevels).map(function (level) { return _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LogLevel"][level]; }));
            _this.props.onToggleLogLevel(hiddenLogLevels);
        };
        _this.onClickScan = function (event) {
            event.preventDefault();
            _this.props.onStartScanning();
        };
        _this.onClickStopScan = function (event) {
            event.preventDefault();
            _this.props.onStopScanning();
        };
        return _this;
    }
    Logs.prototype.componentDidMount = function () {
        var _this = this;
        // Staged rendering
        if (this.state.deferLogs) {
            var data = this.props.data;
            var rowCount = data && data.rows ? data.rows.length : 0;
            // Render all right away if not too far over the limit
            var renderAll_1 = rowCount <= PREVIEW_LIMIT * 2;
            this.deferLogsTimer = setTimeout(function () { return _this.setState({ deferLogs: false, renderAll: renderAll_1 }); }, rowCount);
        }
    };
    Logs.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        // Staged rendering
        if (prevState.deferLogs && !this.state.deferLogs && !this.state.renderAll) {
            this.renderAllTimer = setTimeout(function () { return _this.setState({ renderAll: true }); }, 2000);
        }
    };
    Logs.prototype.componentWillUnmount = function () {
        clearTimeout(this.deferLogsTimer);
        clearTimeout(this.renderAllTimer);
    };
    Logs.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, exploreId = _a.exploreId, highlighterExpressions = _a.highlighterExpressions, _b = _a.loading, loading = _b === void 0 ? false : _b, onClickLabel = _a.onClickLabel, range = _a.range, scanning = _a.scanning, scanRange = _a.scanRange, width = _a.width, dedupedData = _a.dedupedData;
        if (!data) {
            return null;
        }
        var _c = this.state, deferLogs = _c.deferLogs, renderAll = _c.renderAll, showLabels = _c.showLabels, showLocalTime = _c.showLocalTime, showUtc = _c.showUtc;
        var dedupStrategy = this.props.dedupStrategy;
        var hasData = data && data.rows && data.rows.length > 0;
        var hasLabel = hasData && dedupedData.hasUniqueLabels;
        var dedupCount = dedupedData.rows.reduce(function (sum, row) { return sum + row.duplicates; }, 0);
        var showDuplicates = dedupStrategy !== app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["LogsDedupStrategy"].none && dedupCount > 0;
        var meta = tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](data.meta);
        if (dedupStrategy !== app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["LogsDedupStrategy"].none) {
            meta.push({
                label: 'Dedup count',
                value: dedupCount,
                kind: app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["LogsMetaKind"].Number,
            });
        }
        // Staged rendering
        var processedRows = dedupedData.rows;
        var firstRows = processedRows.slice(0, PREVIEW_LIMIT);
        var lastRows = processedRows.slice(PREVIEW_LIMIT);
        var scanText = scanRange ? "Scanning " + app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_2__["describeTimeRange"](scanRange) : 'Scanning...';
        // React profiler becomes unusable if we pass all rows to all rows and their labels, using getter instead
        var getRows = function () { return processedRows; };
        var timeSeries = data.series.map(function (series) { return new app_core_time_series2__WEBPACK_IMPORTED_MODULE_4__["default"](series); });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-graph" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Graph__WEBPACK_IMPORTED_MODULE_7__["default"], { data: timeSeries, height: 100, width: width, range: range, id: "explore-logs-graph-" + exploreId, onChangeTime: this.props.onChangeTime, onToggleSeries: this.onToggleLogLevel, userOptions: graphOptions })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-options" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-controls" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Timestamp", checked: showUtc, onChange: this.onChangeUtc, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Local time", checked: showLocalTime, onChange: this.onChangeLocalTime, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Labels", checked: showLabels, onChange: this.onChangeLabels, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_ToggleButtonGroup_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_6__["default"], { label: "Dedup", transparent: true }, Object.keys(app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["LogsDedupStrategy"]).map(function (dedupType, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_ToggleButtonGroup_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_6__["ToggleButton"], { key: i, value: dedupType, onChange: _this.onChangeDedup, selected: dedupStrategy === dedupType, tooltip: app_core_logs_model__WEBPACK_IMPORTED_MODULE_5__["LogsDedupDescription"][dedupType] }, dedupType)); })))),
            hasData && meta && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-meta" }, meta.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-meta__item", key: item.label },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-panel-meta__label" },
                    item.label,
                    ":"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-panel-meta__value" }, renderMetaItem(item.value, item.kind)))); }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-rows" },
                hasData &&
                    !deferLogs && // Only inject highlighterExpression in the first set for performance reasons
                    firstRows.map(function (row) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogRow__WEBPACK_IMPORTED_MODULE_9__["LogRow"], { key: row.key + row.duplicates, getRows: getRows, highlighterExpressions: highlighterExpressions, row: row, showDuplicates: showDuplicates, showLabels: showLabels && hasLabel, showLocalTime: showLocalTime, showUtc: showUtc, onClickLabel: onClickLabel })); }),
                hasData &&
                    !deferLogs &&
                    renderAll &&
                    lastRows.map(function (row) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogRow__WEBPACK_IMPORTED_MODULE_9__["LogRow"], { key: row.key + row.duplicates, getRows: getRows, row: row, showDuplicates: showDuplicates, showLabels: showLabels && hasLabel, showLocalTime: showLocalTime, showUtc: showUtc, onClickLabel: onClickLabel })); }),
                hasData && deferLogs && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null,
                    "Rendering ",
                    dedupedData.rows.length,
                    " rows...")),
            !loading && !hasData && !scanning && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-nodata" },
                "No logs found.",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "link", onClick: this.onClickScan }, "Scan for older logs"))),
            scanning && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-nodata" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, scanText),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "link", onClick: this.onClickStopScan }, "Stop scan")))));
    };
    return Logs;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Logs);


/***/ }),

/***/ "./public/app/features/explore/LogsContainer.tsx":
/*!*******************************************************!*\
  !*** ./public/app/features/explore/LogsContainer.tsx ***!
  \*******************************************************/
/*! exports provided: LogsContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsContainer", function() { return LogsContainer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _Logs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Logs */ "./public/app/features/explore/Logs.tsx");
/* harmony import */ var _Panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Panel */ "./public/app/features/explore/Panel.tsx");
/* harmony import */ var app_features_explore_state_actionTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/features/explore/state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var app_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/features/explore/state/selectors */ "./public/app/features/explore/state/selectors.ts");










var LogsContainer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LogsContainer, _super);
    function LogsContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickLogsButton = function () {
            _this.props.toggleLogs(_this.props.exploreId, _this.props.showingLogs);
        };
        _this.handleDedupStrategyChange = function (dedupStrategy) {
            _this.props.changeDedupStrategy(_this.props.exploreId, dedupStrategy);
        };
        _this.hangleToggleLogLevel = function (hiddenLogLevels) {
            var exploreId = _this.props.exploreId;
            _this.props.toggleLogLevelAction({
                exploreId: exploreId,
                hiddenLogLevels: hiddenLogLevels,
            });
        };
        return _this;
    }
    LogsContainer.prototype.render = function () {
        var _a = this.props, exploreId = _a.exploreId, loading = _a.loading, logsHighlighterExpressions = _a.logsHighlighterExpressions, logsResult = _a.logsResult, dedupedResult = _a.dedupedResult, onChangeTime = _a.onChangeTime, onClickLabel = _a.onClickLabel, onStartScanning = _a.onStartScanning, onStopScanning = _a.onStopScanning, range = _a.range, showingLogs = _a.showingLogs, scanning = _a.scanning, scanRange = _a.scanRange, width = _a.width, hiddenLogLevels = _a.hiddenLogLevels;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Panel__WEBPACK_IMPORTED_MODULE_7__["default"], { label: "Logs", loading: loading, isOpen: showingLogs, onToggle: this.onClickLogsButton },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Logs__WEBPACK_IMPORTED_MODULE_6__["default"], { dedupStrategy: this.props.dedupStrategy || app_core_logs_model__WEBPACK_IMPORTED_MODULE_4__["LogsDedupStrategy"].none, data: logsResult, dedupedData: dedupedResult, exploreId: exploreId, key: logsResult && logsResult.id, highlighterExpressions: logsHighlighterExpressions, loading: loading, onChangeTime: onChangeTime, onClickLabel: onClickLabel, onStartScanning: onStartScanning, onStopScanning: onStopScanning, onDedupStrategyChange: this.handleDedupStrategyChange, onToggleLogLevel: this.hangleToggleLogLevel, range: range, scanning: scanning, scanRange: scanRange, width: width, hiddenLogLevels: hiddenLogLevels })));
    };
    return LogsContainer;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    var item = explore[exploreId];
    var logsHighlighterExpressions = item.logsHighlighterExpressions, logsResult = item.logsResult, queryTransactions = item.queryTransactions, scanning = item.scanning, scanRange = item.scanRange, range = item.range;
    var loading = queryTransactions.some(function (qt) { return qt.resultType === 'Logs' && !qt.done; });
    var _b = Object(app_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_9__["exploreItemUIStateSelector"])(item), showingLogs = _b.showingLogs, dedupStrategy = _b.dedupStrategy;
    var hiddenLogLevels = new Set(item.hiddenLogLevels);
    var dedupedResult = Object(app_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_9__["deduplicatedLogsSelector"])(item);
    return {
        loading: loading,
        logsHighlighterExpressions: logsHighlighterExpressions,
        logsResult: logsResult,
        scanning: scanning,
        scanRange: scanRange,
        showingLogs: showingLogs,
        range: range,
        dedupStrategy: dedupStrategy,
        hiddenLogLevels: hiddenLogLevels,
        dedupedResult: dedupedResult,
    };
}
var mapDispatchToProps = {
    toggleLogs: _state_actions__WEBPACK_IMPORTED_MODULE_5__["toggleLogs"],
    changeDedupStrategy: _state_actions__WEBPACK_IMPORTED_MODULE_5__["changeDedupStrategy"],
    toggleLogLevelAction: app_features_explore_state_actionTypes__WEBPACK_IMPORTED_MODULE_8__["toggleLogLevelAction"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(LogsContainer)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/NoDataSourceCallToAction.tsx":
/*!******************************************************************!*\
  !*** ./public/app/features/explore/NoDataSourceCallToAction.tsx ***!
  \******************************************************************/
/*! exports provided: NoDataSourceCallToAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoDataSourceCallToAction", function() { return NoDataSourceCallToAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");




var NoDataSourceCallToAction = function () {
    var theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ThemeContext"]);
    var message = 'Explore requires at least one data source. Once you have added a data source, you can query it here.';
    var footer = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-rocket" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, " ProTip: You can also define data sources through configuration files. "),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "http://docs.grafana.org/administration/provisioning/#datasources?utm_source=explore", target: "_blank", className: "text-link" }, "Learn more")));
    var ctaElement = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LargeLinkButton"], { href: "/datasources/new", icon: "gicon gicon-datasources" }, "Add data source"));
    var cardClassName = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    max-width: ", ";\n  "], ["\n    max-width: ", ";\n  "])), theme.breakpoints.lg);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["CallToActionCard"], { callToActionElement: ctaElement, className: cardClassName, footer: footer, message: message, theme: theme }));
};
var templateObject_1;


/***/ }),

/***/ "./public/app/features/explore/Panel.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Panel.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var Panel = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickToggle = function () { return _this.props.onToggle(!_this.props.isOpen); };
        return _this;
    }
    Panel.prototype.render = function () {
        var _a = this.props, isOpen = _a.isOpen, loading = _a.loading;
        var iconClass = isOpen ? 'fa fa-caret-up' : 'fa fa-caret-down';
        var loaderClass = loading ? 'explore-panel__loader explore-panel__loader--active' : 'explore-panel__loader';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel panel-container" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel__header", onClick: this.onClickToggle },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel__header-buttons" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: iconClass })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel__header-label" }, this.props.label)),
            isOpen && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-panel__body" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: loaderClass }),
                this.props.children))));
    };
    return Panel;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Panel);


/***/ }),

/***/ "./public/app/features/explore/QueryEditor.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/QueryEditor.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_services_AngularLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/services/AngularLoader */ "./public/app/core/services/AngularLoader.ts");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/plugins/plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");

// Libraries

// Services



var QueryEditor = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryEditor, _super);
    function QueryEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryEditor.prototype.componentDidMount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, datasource, initialQuery, exploreEvents, range, loader, template, target, scopeProps;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                if (!this.element) {
                    return [2 /*return*/];
                }
                _a = this.props, datasource = _a.datasource, initialQuery = _a.initialQuery, exploreEvents = _a.exploreEvents, range = _a.range;
                this.initTimeSrv(range);
                loader = Object(app_core_services_AngularLoader__WEBPACK_IMPORTED_MODULE_2__["getAngularLoader"])();
                template = '<plugin-component type="query-ctrl"> </plugin-component>';
                target = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ datasource: datasource.name }, initialQuery);
                scopeProps = {
                    ctrl: {
                        datasource: datasource,
                        target: target,
                        refresh: function () {
                            _this.props.onQueryChange(target);
                            _this.props.onExecuteQuery();
                        },
                        onQueryChange: function () {
                            _this.props.onQueryChange(target);
                        },
                        events: exploreEvents,
                        panel: { datasource: datasource, targets: [target] },
                        dashboard: {},
                    },
                };
                this.component = loader.load(this.element, scopeProps, template);
                this.props.onQueryChange(target);
                return [2 /*return*/];
            });
        });
    };
    QueryEditor.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    QueryEditor.prototype.initTimeSrv = function (range) {
        var timeSrv = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_3__["getTimeSrv"])();
        timeSrv.init({
            time: range,
            refresh: false,
            getTimezone: function () { return 'utc'; },
            timeRangeUpdated: function () { return console.log('refreshDashboard!'); },
        });
    };
    QueryEditor.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-query", ref: function (element) { return (_this.element = element); }, style: { width: '100%' } });
    };
    return QueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryEditor);


/***/ }),

/***/ "./public/app/features/explore/QueryRow.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/explore/QueryRow.tsx ***!
  \**************************************************/
/*! exports provided: QueryRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryRow", function() { return QueryRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _QueryEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./QueryEditor */ "./public/app/features/explore/QueryEditor.tsx");
/* harmony import */ var _QueryTransactionStatus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./QueryTransactionStatus */ "./public/app/features/explore/QueryTransactionStatus.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");

// Libraries

// @ts-ignore


// @ts-ignore

// Components


// Actions



function getFirstHintFromTransactions(transactions) {
    var transaction = transactions.find(function (qt) { return qt.hints && qt.hints.length > 0; });
    if (transaction) {
        return transaction.hints[0];
    }
    return undefined;
}
var QueryRow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryRow, _super);
    function QueryRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onExecuteQuery = function () {
            var exploreId = _this.props.exploreId;
            _this.props.runQueries(exploreId);
        };
        _this.onChangeQuery = function (query, override) {
            var _a = _this.props, datasourceInstance = _a.datasourceInstance, exploreId = _a.exploreId, index = _a.index;
            _this.props.changeQuery(exploreId, query, index, override);
            if (query && !override && datasourceInstance.getHighlighterExpression && index === 0) {
                // Live preview of log search matches. Only use on first row for now
                _this.updateLogsHighlights(query);
            }
        };
        _this.onClickAddButton = function () {
            var _a = _this.props, exploreId = _a.exploreId, index = _a.index;
            _this.props.addQueryRow(exploreId, index);
        };
        _this.onClickClearButton = function () {
            _this.onChangeQuery(null, true);
        };
        _this.onClickHintFix = function (action) {
            var _a = _this.props, datasourceInstance = _a.datasourceInstance, exploreId = _a.exploreId, index = _a.index;
            if (datasourceInstance && datasourceInstance.modifyQuery) {
                var modifier = function (queries, action) { return datasourceInstance.modifyQuery(queries, action); };
                _this.props.modifyQueries(exploreId, action, index, modifier);
            }
        };
        _this.onClickRemoveButton = function () {
            var _a = _this.props, exploreId = _a.exploreId, index = _a.index;
            _this.props.removeQueryRowAction({ exploreId: exploreId, index: index });
        };
        _this.updateLogsHighlights = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.debounce(function (value) {
            var datasourceInstance = _this.props.datasourceInstance;
            if (datasourceInstance.getHighlighterExpression) {
                var exploreId = _this.props.exploreId;
                var expressions = [datasourceInstance.getHighlighterExpression(value)];
                _this.props.highlightLogsExpressionAction({ exploreId: exploreId, expressions: expressions });
            }
        }, 500);
        return _this;
    }
    QueryRow.prototype.componentWillUnmount = function () {
        console.log('QueryRow will unmount');
    };
    QueryRow.prototype.render = function () {
        var _a = this.props, datasourceInstance = _a.datasourceInstance, history = _a.history, index = _a.index, query = _a.query, queryTransactions = _a.queryTransactions, exploreEvents = _a.exploreEvents, range = _a.range, datasourceStatus = _a.datasourceStatus;
        var transactions = queryTransactions.filter(function (t) { return t.rowIndex === index; });
        var transactionWithError = transactions.find(function (t) { return t.error !== undefined; });
        var hint = getFirstHintFromTransactions(transactions);
        var queryError = transactionWithError ? transactionWithError.error : null;
        var QueryField = datasourceInstance.components.ExploreQueryField;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row-status" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryTransactionStatus__WEBPACK_IMPORTED_MODULE_6__["default"], { transactions: transactions })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row-field flex-shrink-1" }, QueryField ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(QueryField, { datasource: datasourceInstance, datasourceStatus: datasourceStatus, query: query, error: queryError, hint: hint, history: history, onExecuteQuery: this.onExecuteQuery, onExecuteHint: this.onClickHintFix, onQueryChange: this.onChangeQuery })) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryEditor__WEBPACK_IMPORTED_MODULE_5__["default"], { datasource: datasourceInstance, error: queryError, onQueryChange: this.onChangeQuery, onExecuteQuery: this.onExecuteQuery, initialQuery: query, exploreEvents: exploreEvents, range: range }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline flex-shrink-0" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", onClick: this.onClickClearButton },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-times" }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", onClick: this.onClickAddButton },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-plus" }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", onClick: this.onClickRemoveButton },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-minus" }))))));
    };
    return QueryRow;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId, index = _a.index;
    var explore = state.explore;
    var item = explore[exploreId];
    var datasourceInstance = item.datasourceInstance, history = item.history, queries = item.queries, queryTransactions = item.queryTransactions, range = item.range, datasourceError = item.datasourceError;
    var query = queries[index];
    return {
        datasourceInstance: datasourceInstance,
        history: history,
        query: query,
        queryTransactions: queryTransactions,
        range: range,
        datasourceStatus: datasourceError ? _grafana_ui__WEBPACK_IMPORTED_MODULE_8__["DataSourceStatus"].Disconnected : _grafana_ui__WEBPACK_IMPORTED_MODULE_8__["DataSourceStatus"].Connected,
    };
}
var mapDispatchToProps = {
    addQueryRow: _state_actions__WEBPACK_IMPORTED_MODULE_7__["addQueryRow"],
    changeQuery: _state_actions__WEBPACK_IMPORTED_MODULE_7__["changeQuery"],
    highlightLogsExpressionAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_9__["highlightLogsExpressionAction"],
    modifyQueries: _state_actions__WEBPACK_IMPORTED_MODULE_7__["modifyQueries"],
    removeQueryRowAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_9__["removeQueryRowAction"],
    runQueries: _state_actions__WEBPACK_IMPORTED_MODULE_7__["runQueries"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(QueryRow)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/QueryRows.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/explore/QueryRows.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _QueryRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryRow */ "./public/app/features/explore/QueryRow.tsx");

// Libraries

// Components

var QueryRows = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryRows, _super);
    function QueryRows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryRows.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, exploreEvents = _a.exploreEvents, exploreId = _a.exploreId, queryKeys = _a.queryKeys;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className }, queryKeys.map(function (key, index) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryRow__WEBPACK_IMPORTED_MODULE_2__["default"], { key: key, exploreEvents: exploreEvents, exploreId: exploreId, index: index });
        })));
    };
    return QueryRows;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryRows);


/***/ }),

/***/ "./public/app/features/explore/QueryTransactionStatus.tsx":
/*!****************************************************************!*\
  !*** ./public/app/features/explore/QueryTransactionStatus.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ElapsedTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ElapsedTime */ "./public/app/features/explore/ElapsedTime.tsx");



function formatLatency(value) {
    return (value / 1000).toFixed(1) + "s";
}
var QueryTransactionStatusItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryTransactionStatusItem, _super);
    function QueryTransactionStatusItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryTransactionStatusItem.prototype.render = function () {
        var transaction = this.props.transaction;
        var className = transaction.done ? 'query-transaction' : 'query-transaction query-transaction--loading';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-transaction__type" },
                transaction.resultType,
                ":"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-transaction__duration" }, transaction.done ? formatLatency(transaction.latency) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ElapsedTime__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
    };
    return QueryTransactionStatusItem;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var QueryTransactionStatus = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryTransactionStatus, _super);
    function QueryTransactionStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryTransactionStatus.prototype.render = function () {
        var transactions = this.props.transactions;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-transactions" }, transactions.map(function (t, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(QueryTransactionStatusItem, { key: t.rowIndex + ":" + t.resultType, transaction: t })); })));
    };
    return QueryTransactionStatus;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryTransactionStatus);


/***/ }),

/***/ "./public/app/features/explore/Table.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Table.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");





var EMPTY_TABLE = new app_core_table_model__WEBPACK_IMPORTED_MODULE_4__["default"]();
// Identify columns that contain values
var VALUE_REGEX = /^[Vv]alue #\d+/;
function prepareRows(rows, columnNames) {
    return rows.map(function (cells) { return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.zipObject(columnNames, cells); });
}
var Table = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getCellProps = function (state, rowInfo, column) {
            return {
                onClick: function (e) {
                    // Only handle click on link, not the cell
                    if (e.target) {
                        var link = e.target;
                        if (link.className === 'link') {
                            var columnKey = column.Header;
                            var rowValue = rowInfo.row[columnKey];
                            _this.props.onClickCell(columnKey, rowValue);
                        }
                    }
                },
            };
        };
        return _this;
    }
    Table.prototype.render = function () {
        var _a = this.props, data = _a.data, loading = _a.loading;
        var tableModel = data || EMPTY_TABLE;
        var columnNames = tableModel.columns.map(function (_a) {
            var text = _a.text;
            return text;
        });
        var columns = tableModel.columns.map(function (_a) {
            var filterable = _a.filterable, text = _a.text;
            return ({
                Header: function () { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { title: text }, text); },
                accessor: text,
                className: VALUE_REGEX.test(text) ? 'text-right' : '',
                show: text !== 'Time',
                Cell: function (row) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: filterable ? 'link' : '', title: text + ': ' + row.value }, row.value)); },
            });
        });
        var noDataText = data ? 'The queries returned no data for a table.' : '';
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_table__WEBPACK_IMPORTED_MODULE_3__["default"], { columns: columns, data: tableModel.rows, getTdProps: this.getCellProps, loading: loading, minRows: 0, noDataText: noDataText, resolveData: function (data) { return prepareRows(data, columnNames); }, showPagination: Boolean(data) }));
    };
    return Table;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Table);


/***/ }),

/***/ "./public/app/features/explore/TableContainer.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/TableContainer.tsx ***!
  \********************************************************/
/*! exports provided: TableContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableContainer", function() { return TableContainer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Table */ "./public/app/features/explore/Table.tsx");
/* harmony import */ var _Panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Panel */ "./public/app/features/explore/Panel.tsx");







var TableContainer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableContainer, _super);
    function TableContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickTableButton = function () {
            _this.props.toggleTable(_this.props.exploreId, _this.props.showingTable);
        };
        return _this;
    }
    TableContainer.prototype.render = function () {
        var _a = this.props, loading = _a.loading, onClickCell = _a.onClickCell, showingTable = _a.showingTable, tableResult = _a.tableResult;
        if (!tableResult) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Panel__WEBPACK_IMPORTED_MODULE_6__["default"], { label: "Table", loading: loading, isOpen: showingTable, onToggle: this.onClickTableButton },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Table__WEBPACK_IMPORTED_MODULE_5__["default"], { data: tableResult, loading: loading, onClickCell: onClickCell })));
    };
    return TableContainer;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    var item = explore[exploreId];
    var queryTransactions = item.queryTransactions, showingTable = item.showingTable, tableResult = item.tableResult;
    var loading = queryTransactions.some(function (qt) { return qt.resultType === 'Table' && !qt.done; });
    return { loading: loading, showingTable: showingTable, tableResult: tableResult };
}
var mapDispatchToProps = {
    toggleTable: _state_actions__WEBPACK_IMPORTED_MODULE_4__["toggleTable"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(TableContainer)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/TimePicker.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/explore/TimePicker.tsx ***!
  \****************************************************/
/*! exports provided: DEFAULT_RANGE, parseTime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RANGE", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTime", function() { return parseTime; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/utils/datemath */ "./public/app/core/utils/datemath.ts");
/* harmony import */ var app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/rangeutil */ "./public/app/core/utils/rangeutil.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");






var DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
var DEFAULT_RANGE = {
    from: 'now-6h',
    to: 'now',
};
/**
 * Return a human-editable string of either relative (inludes "now") or absolute local time (in the shape of DATE_FORMAT).
 * @param value Epoch or relative time
 */
function parseTime(value, isUtc, ensureString) {
    if (isUtc === void 0) { isUtc = false; }
    if (ensureString === void 0) { ensureString = false; }
    if (moment__WEBPACK_IMPORTED_MODULE_2___default.a.isMoment(value)) {
        if (ensureString) {
            return value.format(DATE_FORMAT);
        }
        return value;
    }
    if (value.indexOf('now') !== -1) {
        return value;
    }
    var time = value;
    // Possible epoch
    if (!isNaN(time)) {
        time = parseInt(time, 10);
    }
    time = isUtc ? moment__WEBPACK_IMPORTED_MODULE_2___default.a.utc(time) : moment__WEBPACK_IMPORTED_MODULE_2___default()(time);
    return time.format(DATE_FORMAT);
}
/**
 * TimePicker with dropdown menu for relative dates.
 *
 * Initialize with a range that is either based on relative time strings,
 * or on Moment objects.
 * Internally the component needs to keep a string representation in `fromRaw`
 * and `toRaw` for the controlled inputs.
 * When a time is picked, `onChangeTime` is called with the new range that
 * is again based on relative time strings or Moment objects.
 */
var TimePicker = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TimePicker, _super);
    function TimePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChangeFrom = function (e) {
            _this.setState({
                fromRaw: e.target.value,
            });
        };
        _this.handleChangeTo = function (e) {
            _this.setState({
                toRaw: e.target.value,
            });
        };
        _this.handleClickApply = function () {
            var onChangeTime = _this.props.onChangeTime;
            var range;
            _this.setState(function (state) {
                var _a = _this.state, toRaw = _a.toRaw, fromRaw = _a.fromRaw;
                range = {
                    from: app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__["parse"](fromRaw, false),
                    to: app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__["parse"](toRaw, true),
                };
                var rangeString = app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["describeTimeRange"](range);
                return {
                    isOpen: false,
                    rangeString: rangeString,
                };
            }, function () {
                if (onChangeTime) {
                    onChangeTime(range);
                }
            });
        };
        _this.handleClickLeft = function () { return _this.move(-1); };
        _this.handleClickPicker = function () {
            _this.setState(function (state) { return ({
                isOpen: !state.isOpen,
            }); });
        };
        _this.handleClickRight = function () { return _this.move(1); };
        _this.handleClickRefresh = function () { };
        _this.handleClickRelativeOption = function (range) {
            var onChangeTime = _this.props.onChangeTime;
            var rangeString = app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["describeTimeRange"](range);
            _this.setState({
                toRaw: range.to,
                fromRaw: range.from,
                isOpen: false,
                rangeString: rangeString,
            }, function () {
                if (onChangeTime) {
                    onChangeTime(range);
                }
            });
        };
        _this.dropdownRef = function (el) {
            _this.dropdownEl = el;
        };
        _this.state = {
            isOpen: props.isOpen,
            isUtc: props.isUtc,
            rangeString: '',
            fromRaw: '',
            toRaw: '',
            initialRange: DEFAULT_RANGE,
            refreshInterval: '',
        };
        return _this;
    } //Temp solution... How do detect if ds supports table format?
    TimePicker.getDerivedStateFromProps = function (props, state) {
        if (state.initialRange && state.initialRange === props.range) {
            return state;
        }
        var from = props.range ? props.range.from : DEFAULT_RANGE.from;
        var to = props.range ? props.range.to : DEFAULT_RANGE.to;
        // Ensure internal string format
        var fromRaw = parseTime(from, props.isUtc, true);
        var toRaw = parseTime(to, props.isUtc, true);
        var range = {
            from: fromRaw,
            to: toRaw,
        };
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { fromRaw: fromRaw,
            toRaw: toRaw, initialRange: props.range, rangeString: app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["describeTimeRange"](range) });
    };
    TimePicker.prototype.move = function (direction, scanning) {
        var onChangeTime = this.props.onChangeTime;
        var _a = this.state, fromRaw = _a.fromRaw, toRaw = _a.toRaw;
        var from = app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__["parse"](fromRaw, false);
        var to = app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_3__["parse"](toRaw, true);
        var step = scanning ? 1 : 2;
        var timespan = (to.valueOf() - from.valueOf()) / step;
        var nextTo, nextFrom;
        if (direction === -1) {
            nextTo = to.valueOf() - timespan;
            nextFrom = from.valueOf() - timespan;
        }
        else if (direction === 1) {
            nextTo = to.valueOf() + timespan;
            nextFrom = from.valueOf() + timespan;
            if (nextTo > Date.now() && to.valueOf() < Date.now()) {
                nextTo = Date.now();
                nextFrom = from.valueOf();
            }
        }
        else {
            nextTo = to.valueOf();
            nextFrom = from.valueOf();
        }
        var nextRange = {
            from: moment__WEBPACK_IMPORTED_MODULE_2___default()(nextFrom),
            to: moment__WEBPACK_IMPORTED_MODULE_2___default()(nextTo),
        };
        var nextTimeRange = {
            raw: nextRange,
            from: nextRange.from,
            to: nextRange.to,
        };
        this.setState({
            rangeString: app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["describeTimeRange"](nextRange),
            fromRaw: nextRange.from.format(DATE_FORMAT),
            toRaw: nextRange.to.format(DATE_FORMAT),
        }, function () {
            onChangeTime(nextTimeRange, scanning);
        });
        return nextRange;
    };
    TimePicker.prototype.getTimeOptions = function () {
        return app_core_utils_rangeutil__WEBPACK_IMPORTED_MODULE_4__["getRelativeTimesList"]({}, this.state.rangeString);
    };
    TimePicker.prototype.renderDropdown = function () {
        var _this = this;
        var _a = this.state, fromRaw = _a.fromRaw, isOpen = _a.isOpen, toRaw = _a.toRaw;
        if (!isOpen) {
            return null;
        }
        var timeOptions = this.getTimeOptions();
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: this.dropdownRef, className: "gf-timepicker-dropdown" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "popover-box" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "popover-box__header" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "popover-box__title" }, "Quick ranges")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "popover-box__body gf-timepicker-relative-section" }, Object.keys(timeOptions).map(function (section) {
                    var group = timeOptions[section];
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { key: section }, group.map(function (option) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: option.active ? 'active' : '', key: option.display },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { onClick: function () { return _this.handleClickRelativeOption(option); } }, option.display))); })));
                }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "popover-box" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "popover-box__header" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "popover-box__title" }, "Custom range")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "popover-box__body gf-timepicker-absolute-section" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "small" }, "From:"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-28" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["Input"], { type: "text", className: "gf-form-input input-large timepicker-from", value: fromRaw, onChange: this.handleChangeFrom }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "small" }, "To:"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-28" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["Input"], { type: "text", className: "gf-form-input input-large timepicker-to", value: toRaw, onChange: this.handleChangeTo }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn gf-form-btn btn-secondary", onClick: this.handleClickApply }, "Apply"))))));
    };
    TimePicker.prototype.render = function () {
        var _a = this.state, isUtc = _a.isUtc, rangeString = _a.rangeString, refreshInterval = _a.refreshInterval;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "timepicker" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "navbar-buttons" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--tight timepicker-left", onClick: this.handleClickLeft },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-chevron-left" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button gf-timepicker-nav-btn", onClick: this.handleClickPicker },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-clock-o" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "timepicker-rangestring" }, rangeString),
                    isUtc ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "gf-timepicker-utc" }, "UTC") : null,
                    refreshInterval ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "text-warning" },
                        "\u00A0 Refresh every ",
                        refreshInterval) : null),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--tight timepicker-right", onClick: this.handleClickRight },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-chevron-right" }))),
            this.renderDropdown()));
    };
    return TimePicker;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (TimePicker);


/***/ }),

/***/ "./public/app/features/explore/Wrapper.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/explore/Wrapper.tsx ***!
  \*************************************************/
/*! exports provided: Wrapper, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wrapper", function() { return Wrapper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ErrorBoundary */ "./public/app/features/explore/ErrorBoundary.tsx");
/* harmony import */ var _Explore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Explore */ "./public/app/features/explore/Explore.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");









var Wrapper = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.componentWillUnmount = function () {
        this.props.resetExploreAction();
    };
    Wrapper.prototype.render = function () {
        var split = this.props.split;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-scrollbar-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["CustomScrollbar"], { autoHeightMin: '100%', className: "custom-scrollbar--page" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-wrapper" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__["default"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Explore__WEBPACK_IMPORTED_MODULE_6__["default"], { exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_4__["ExploreId"].left })),
                    split && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__["default"], null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Explore__WEBPACK_IMPORTED_MODULE_6__["default"], { exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_4__["ExploreId"].right })))))));
    };
    return Wrapper;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var mapStateToProps = function (state) {
    var split = state.explore.split;
    return { split: split };
};
var mapDispatchToProps = {
    resetExploreAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_8__["resetExploreAction"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Wrapper)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/state/actions.ts":
/*!******************************************************!*\
  !*** ./public/app/features/explore/state/actions.ts ***!
  \******************************************************/
/*! exports provided: addQueryRow, changeDatasource, changeQuery, changeSize, changeTime, clearQueries, loadExploreDatasourcesAndSetDatasource, initializeExplore, loadDatasourceReady, importQueries, testDatasource, reconnectDatasource, loadDatasource, modifyQueries, queryTransactionFailure, queryTransactionSuccess, runQueries, scanStart, setQueries, splitClose, splitOpen, stateSave, toggleGraph, toggleLogs, toggleTable, changeDedupStrategy, refreshExplore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addQueryRow", function() { return addQueryRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDatasource", function() { return changeDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeQuery", function() { return changeQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeSize", function() { return changeSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeTime", function() { return changeTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearQueries", function() { return clearQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExploreDatasourcesAndSetDatasource", function() { return loadExploreDatasourcesAndSetDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeExplore", function() { return initializeExplore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDatasourceReady", function() { return loadDatasourceReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importQueries", function() { return importQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testDatasource", function() { return testDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reconnectDatasource", function() { return reconnectDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDatasource", function() { return loadDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifyQueries", function() { return modifyQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryTransactionFailure", function() { return queryTransactionFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryTransactionSuccess", function() { return queryTransactionSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runQueries", function() { return runQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scanStart", function() { return scanStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setQueries", function() { return setQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitClose", function() { return splitClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitOpen", function() { return splitOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stateSave", function() { return stateSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleGraph", function() { return toggleGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleLogs", function() { return toggleLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleTable", function() { return toggleTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDedupStrategy", function() { return changeDedupStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshExplore", function() { return refreshExplore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var _TimePicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../TimePicker */ "./public/app/features/explore/TimePicker.tsx");
var _this = undefined;

// Libraries
// @ts-ignore

// Services & Utils



// Actions




/**
 * Updates UI state and save it to the URL
 */
var updateExploreUIState = function (exploreId, uiStateFragment) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["updateUIStateAction"])(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ exploreId: exploreId }, uiStateFragment)));
        dispatch(stateSave());
    };
};
/**
 * Adds a query row after the row with the given index.
 */
function addQueryRow(exploreId, index) {
    return function (dispatch, getState) {
        var query = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["generateEmptyQuery"])(getState().explore[exploreId].queries, index);
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["addQueryRowAction"])({ exploreId: exploreId, index: index, query: query }));
    };
}
/**
 * Loads a new datasource identified by the given name.
 */
function changeDatasource(exploreId, datasource) {
    var _this = this;
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var newDataSourceInstance, currentDataSourceInstance, queries;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    newDataSourceInstance = null;
                    if (!!datasource) return [3 /*break*/, 2];
                    return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__["getDatasourceSrv"])().get()];
                case 1:
                    newDataSourceInstance = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__["getDatasourceSrv"])().get(datasource)];
                case 3:
                    newDataSourceInstance = _a.sent();
                    _a.label = 4;
                case 4:
                    currentDataSourceInstance = getState().explore[exploreId].datasourceInstance;
                    queries = getState().explore[exploreId].queries;
                    return [4 /*yield*/, dispatch(importQueries(exploreId, queries, currentDataSourceInstance, newDataSourceInstance))];
                case 5:
                    _a.sent();
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["updateDatasourceInstanceAction"])({ exploreId: exploreId, datasourceInstance: newDataSourceInstance }));
                    return [4 /*yield*/, dispatch(loadDatasource(exploreId, newDataSourceInstance))];
                case 6:
                    _a.sent();
                    dispatch(runQueries(exploreId));
                    return [2 /*return*/];
            }
        });
    }); };
}
/**
 * Query change handler for the query row with the given index.
 * If `override` is reset the query modifications and run the queries. Use this to set queries via a link.
 */
function changeQuery(exploreId, query, index, override) {
    return function (dispatch, getState) {
        // Null query means reset
        if (query === null) {
            query = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["generateEmptyQuery"])(getState().explore[exploreId].queries));
        }
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["changeQueryAction"])({ exploreId: exploreId, query: query, index: index, override: override }));
        if (override) {
            dispatch(runQueries(exploreId));
        }
    };
}
/**
 * Keep track of the Explore container size, in particular the width.
 * The width will be used to calculate graph intervals (number of datapoints).
 */
function changeSize(exploreId, _a) {
    var height = _a.height, width = _a.width;
    return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["changeSizeAction"])({ exploreId: exploreId, height: height, width: width });
}
/**
 * Change the time range of Explore. Usually called from the Timepicker or a graph interaction.
 */
function changeTime(exploreId, range) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["changeTimeAction"])({ exploreId: exploreId, range: range }));
        dispatch(runQueries(exploreId));
    };
}
/**
 * Clear all queries and results.
 */
function clearQueries(exploreId) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["scanStopAction"])({ exploreId: exploreId }));
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["clearQueriesAction"])({ exploreId: exploreId }));
        dispatch(stateSave());
    };
}
/**
 * Loads all explore data sources and sets the chosen datasource.
 * If there are no datasources a missing datasource action is dispatched.
 */
function loadExploreDatasourcesAndSetDatasource(exploreId, datasourceName) {
    return function (dispatch) {
        var exploreDatasources = Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__["getDatasourceSrv"])()
            .getExternal()
            .map(function (ds) { return ({
            value: ds.name,
            name: ds.name,
            meta: ds.meta,
        }); });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["loadExploreDatasources"])({ exploreId: exploreId, exploreDatasources: exploreDatasources }));
        if (exploreDatasources.length >= 1) {
            dispatch(changeDatasource(exploreId, datasourceName));
        }
        else {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["loadDatasourceMissingAction"])({ exploreId: exploreId }));
        }
    };
}
/**
 * Initialize Explore state with state from the URL and the React component.
 * Call this only on components for with the Explore state has not been initialized.
 */
function initializeExplore(exploreId, datasourceName, queries, range, containerWidth, eventBridge, ui) {
    var _this = this;
    return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            dispatch(loadExploreDatasourcesAndSetDatasource(exploreId, datasourceName));
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["initializeExploreAction"])({
                exploreId: exploreId,
                containerWidth: containerWidth,
                eventBridge: eventBridge,
                queries: queries,
                range: range,
                ui: ui,
            }));
            return [2 /*return*/];
        });
    }); };
}
/**
 * Datasource loading was successfully completed.
 */
var loadDatasourceReady = function (exploreId, instance) {
    var historyKey = "grafana.explore.history." + instance.meta.id;
    var history = app_core_store__WEBPACK_IMPORTED_MODULE_2__["default"].getObject(historyKey, []);
    // Save last-used datasource
    app_core_store__WEBPACK_IMPORTED_MODULE_2__["default"].set(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["LAST_USED_DATASOURCE_KEY"], instance.name);
    return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["loadDatasourceReadyAction"])({
        exploreId: exploreId,
        history: history,
    });
};
function importQueries(exploreId, queries, sourceDataSource, targetDataSource) {
    var _this = this;
    return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var importedQueries, nextQueries;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sourceDataSource) {
                        // explore not initialized
                        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["queriesImportedAction"])({ exploreId: exploreId, queries: queries }));
                        return [2 /*return*/];
                    }
                    importedQueries = queries;
                    if (!(sourceDataSource.meta.id === targetDataSource.meta.id)) return [3 /*break*/, 1];
                    // Keep same queries if same type of datasource
                    importedQueries = tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](queries);
                    return [3 /*break*/, 4];
                case 1:
                    if (!targetDataSource.importQueries) return [3 /*break*/, 3];
                    return [4 /*yield*/, targetDataSource.importQueries(queries, sourceDataSource.meta)];
                case 2:
                    // Datasource-specific importers
                    importedQueries = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    // Default is blank queries
                    importedQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["ensureQueries"])();
                    _a.label = 4;
                case 4:
                    nextQueries = importedQueries.map(function (q, i) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, q, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["generateEmptyQuery"])(queries))); });
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["queriesImportedAction"])({ exploreId: exploreId, queries: nextQueries }));
                    return [2 /*return*/];
            }
        });
    }); };
}
/**
 * Tests datasource.
 */
var testDatasource = function (exploreId, instance) {
    return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var datasourceError, testResult, error_1;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    datasourceError = null;
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["testDataSourcePendingAction"])({ exploreId: exploreId }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, instance.testDatasource()];
                case 2:
                    testResult = _a.sent();
                    datasourceError = testResult.status === 'success' ? null : testResult.message;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    datasourceError = (error_1 && error_1.statusText) || 'Network error';
                    return [3 /*break*/, 4];
                case 4:
                    if (datasourceError) {
                        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["testDataSourceFailureAction"])({ exploreId: exploreId, error: datasourceError }));
                        return [2 /*return*/];
                    }
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["testDataSourceSuccessAction"])({ exploreId: exploreId }));
                    return [2 /*return*/];
            }
        });
    }); };
};
/**
 * Reconnects datasource when there is a connection failure.
 */
var reconnectDatasource = function (exploreId) {
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var instance;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            instance = getState().explore[exploreId].datasourceInstance;
            dispatch(changeDatasource(exploreId, instance.name));
            return [2 /*return*/];
        });
    }); };
};
/**
 * Main action to asynchronously load a datasource. Dispatches lots of smaller actions for feedback.
 */
function loadDatasource(exploreId, instance) {
    var _this = this;
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var datasourceName;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    datasourceName = instance.name;
                    // Keep ID to track selection
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["loadDatasourcePendingAction"])({ exploreId: exploreId, requestedDatasourceName: datasourceName }));
                    return [4 /*yield*/, dispatch(testDatasource(exploreId, instance))];
                case 1:
                    _a.sent();
                    if (datasourceName !== getState().explore[exploreId].requestedDatasourceName) {
                        // User already changed datasource again, discard results
                        return [2 /*return*/];
                    }
                    if (instance.init) {
                        instance.init();
                    }
                    if (datasourceName !== getState().explore[exploreId].requestedDatasourceName) {
                        // User already changed datasource again, discard results
                        return [2 /*return*/];
                    }
                    dispatch(loadDatasourceReady(exploreId, instance));
                    return [2 /*return*/];
            }
        });
    }); };
}
/**
 * Action to modify a query given a datasource-specific modifier action.
 * @param exploreId Explore area
 * @param modification Action object with a type, e.g., ADD_FILTER
 * @param index Optional query row index. If omitted, the modification is applied to all query rows.
 * @param modifier Function that executes the modification, typically `datasourceInstance.modifyQueries`.
 */
function modifyQueries(exploreId, modification, index, modifier) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["modifyQueriesAction"])({ exploreId: exploreId, modification: modification, index: index, modifier: modifier }));
        if (!modification.preventSubmit) {
            dispatch(runQueries(exploreId));
        }
    };
}
/**
 * Mark a query transaction as failed with an error extracted from the query response.
 * The transaction will be marked as `done`.
 */
function queryTransactionFailure(exploreId, transactionId, response, datasourceId) {
    return function (dispatch, getState) {
        var _a = getState().explore[exploreId], datasourceInstance = _a.datasourceInstance, queryTransactions = _a.queryTransactions;
        if (datasourceInstance.meta.id !== datasourceId || response.cancelled) {
            // Navigated away, queries did not matter
            return;
        }
        // Transaction might have been discarded
        if (!queryTransactions.find(function (qt) { return qt.id === transactionId; })) {
            return;
        }
        console.error(response);
        var error;
        var errorDetails;
        if (response.data) {
            if (typeof response.data === 'string') {
                error = response.data;
            }
            else if (response.data.error) {
                error = response.data.error;
                if (response.data.response) {
                    errorDetails = response.data.response;
                }
            }
            else {
                throw new Error('Could not handle error response');
            }
        }
        else if (response.message) {
            error = response.message;
        }
        else if (typeof response === 'string') {
            error = response;
        }
        else {
            error = 'Unknown error during query transaction. Please check JS console logs.';
        }
        // Mark transactions as complete
        var nextQueryTransactions = queryTransactions.map(function (qt) {
            if (qt.id === transactionId) {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, qt, { error: error,
                    errorDetails: errorDetails, done: true });
            }
            return qt;
        });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["queryTransactionFailureAction"])({ exploreId: exploreId, queryTransactions: nextQueryTransactions }));
    };
}
/**
 * Complete a query transaction, mark the transaction as `done` and store query state in URL.
 * If the transaction was started by a scanner, it keeps on scanning for more results.
 * Side-effect: the query is stored in localStorage.
 * @param exploreId Explore area
 * @param transactionId ID
 * @param result Response from `datasourceInstance.query()`
 * @param latency Duration between request and response
 * @param queries Queries from all query rows
 * @param datasourceId Origin datasource instance, used to discard results if current datasource is different
 */
function queryTransactionSuccess(exploreId, transactionId, result, latency, queries, datasourceId) {
    return function (dispatch, getState) {
        var _a = getState().explore[exploreId], datasourceInstance = _a.datasourceInstance, history = _a.history, queryTransactions = _a.queryTransactions, scanner = _a.scanner, scanning = _a.scanning;
        // If datasource already changed, results do not matter
        if (datasourceInstance.meta.id !== datasourceId) {
            return;
        }
        // Transaction might have been discarded
        var transaction = queryTransactions.find(function (qt) { return qt.id === transactionId; });
        if (!transaction) {
            return;
        }
        // Get query hints
        var hints;
        if (datasourceInstance.getQueryHints) {
            hints = datasourceInstance.getQueryHints(transaction.query, result);
        }
        // Mark transactions as complete and attach result
        var nextQueryTransactions = queryTransactions.map(function (qt) {
            if (qt.id === transactionId) {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, qt, { hints: hints,
                    latency: latency,
                    result: result, done: true });
            }
            return qt;
        });
        // Side-effect: Saving history in localstorage
        var nextHistory = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["updateHistory"])(history, datasourceId, queries);
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["queryTransactionSuccessAction"])({
            exploreId: exploreId,
            history: nextHistory,
            queryTransactions: nextQueryTransactions,
        }));
        // Keep scanning for results if this was the last scanning transaction
        if (scanning) {
            if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.size(result) === 0) {
                var other = nextQueryTransactions.find(function (qt) { return qt.scanning && !qt.done; });
                if (!other) {
                    var range = scanner();
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["scanRangeAction"])({ exploreId: exploreId, range: range }));
                }
            }
            else {
                // We can stop scanning if we have a result
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["scanStopAction"])({ exploreId: exploreId }));
            }
        }
    };
}
/**
 * Main action to run queries and dispatches sub-actions based on which result viewers are active
 */
function runQueries(exploreId, ignoreUIState) {
    if (ignoreUIState === void 0) { ignoreUIState = false; }
    return function (dispatch, getState) {
        var _a = getState().explore[exploreId], datasourceInstance = _a.datasourceInstance, queries = _a.queries, showingLogs = _a.showingLogs, showingGraph = _a.showingGraph, showingTable = _a.showingTable, supportsGraph = _a.supportsGraph, supportsLogs = _a.supportsLogs, supportsTable = _a.supportsTable, datasourceError = _a.datasourceError, containerWidth = _a.containerWidth;
        if (datasourceError) {
            // let's not run any queries if data source is in a faulty state
            return;
        }
        if (!Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["hasNonEmptyQuery"])(queries)) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["clearQueriesAction"])({ exploreId: exploreId }));
            dispatch(stateSave()); // Remember to saves to state and update location
            return;
        }
        // Some datasource's query builders allow per-query interval limits,
        // but we're using the datasource interval limit for now
        var interval = datasourceInstance.interval;
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["runQueriesAction"])({ exploreId: exploreId }));
        // Keep table queries first since they need to return quickly
        if ((ignoreUIState || showingTable) && supportsTable) {
            dispatch(runQueriesForType(exploreId, 'Table', {
                interval: interval,
                format: 'table',
                instant: true,
                valueWithRefId: true,
            }, function (data) { return data[0]; }));
        }
        if ((ignoreUIState || showingGraph) && supportsGraph) {
            dispatch(runQueriesForType(exploreId, 'Graph', {
                interval: interval,
                format: 'time_series',
                instant: false,
                maxDataPoints: containerWidth,
            }, app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["makeTimeSeriesList"]));
        }
        if ((ignoreUIState || showingLogs) && supportsLogs) {
            dispatch(runQueriesForType(exploreId, 'Logs', { interval: interval, format: 'logs' }));
        }
        dispatch(stateSave());
    };
}
/**
 * Helper action to build a query transaction object and handing the query to the datasource.
 * @param exploreId Explore area
 * @param resultType Result viewer that will be associated with this query result
 * @param queryOptions Query options as required by the datasource's `query()` function.
 * @param resultGetter Optional result extractor, e.g., if the result is a list and you only need the first element.
 */
function runQueriesForType(exploreId, resultType, queryOptions, resultGetter) {
    var _this = this;
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var _a, datasourceInstance, eventBridge, queries, queryIntervals, range, scanning, datasourceId;
        var _this = this;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
            _a = getState().explore[exploreId], datasourceInstance = _a.datasourceInstance, eventBridge = _a.eventBridge, queries = _a.queries, queryIntervals = _a.queryIntervals, range = _a.range, scanning = _a.scanning;
            datasourceId = datasourceInstance.meta.id;
            // Run all queries concurrently
            queries.forEach(function (query, rowIndex) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                var transaction, now, res, latency, queryTransactions, results, response_1;
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            transaction = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["buildQueryTransaction"])(query, rowIndex, resultType, queryOptions, range, queryIntervals, scanning);
                            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["queryTransactionStartAction"])({ exploreId: exploreId, resultType: resultType, rowIndex: rowIndex, transaction: transaction }));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            now = Date.now();
                            return [4 /*yield*/, datasourceInstance.query(transaction.options)];
                        case 2:
                            res = _a.sent();
                            eventBridge.emit('data-received', res.data || []);
                            latency = Date.now() - now;
                            queryTransactions = getState().explore[exploreId].queryTransactions;
                            results = resultGetter ? resultGetter(res.data, transaction, queryTransactions) : res.data;
                            dispatch(queryTransactionSuccess(exploreId, transaction.id, results, latency, queries, datasourceId));
                            return [3 /*break*/, 4];
                        case 3:
                            response_1 = _a.sent();
                            eventBridge.emit('data-error', response_1);
                            dispatch(queryTransactionFailure(exploreId, transaction.id, response_1, datasourceId));
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); };
}
/**
 * Start a scan for more results using the given scanner.
 * @param exploreId Explore area
 * @param scanner Function that a) returns a new time range and b) triggers a query run for the new range
 */
function scanStart(exploreId, scanner) {
    return function (dispatch) {
        // Register the scanner
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["scanStartAction"])({ exploreId: exploreId, scanner: scanner }));
        // Scanning must trigger query run, and return the new range
        var range = scanner();
        // Set the new range to be displayed
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["scanRangeAction"])({ exploreId: exploreId, range: range }));
    };
}
/**
 * Reset queries to the given queries. Any modifications will be discarded.
 * Use this action for clicks on query examples. Triggers a query run.
 */
function setQueries(exploreId, rawQueries) {
    return function (dispatch, getState) {
        // Inject react keys into query objects
        var queries = rawQueries.map(function (q) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, q, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["generateEmptyQuery"])(getState().explore[exploreId].queries))); });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["setQueriesAction"])({ exploreId: exploreId, queries: queries }));
        dispatch(runQueries(exploreId));
    };
}
/**
 * Close the split view and save URL state.
 */
function splitClose(itemId) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["splitCloseAction"])({ itemId: itemId }));
        dispatch(stateSave());
    };
}
/**
 * Open the split view and copy the left state to be the right state.
 * The right state is automatically initialized.
 * The copy keeps all query modifications but wipes the query results.
 */
function splitOpen() {
    return function (dispatch, getState) {
        // Clone left state to become the right state
        var leftState = getState().explore[app_types_explore__WEBPACK_IMPORTED_MODULE_6__["ExploreId"].left];
        var queryState = getState().location.query[app_types_explore__WEBPACK_IMPORTED_MODULE_6__["ExploreId"].left];
        var urlState = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["parseUrlState"])(queryState);
        var queryTransactions = [];
        var itemState = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, leftState, { queryTransactions: queryTransactions, queries: leftState.queries.slice(), exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_6__["ExploreId"].right, urlState: urlState });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["splitOpenAction"])({ itemState: itemState }));
        dispatch(stateSave());
    };
}
/**
 * Saves Explore state to URL using the `left` and `right` parameters.
 * If split view is not active, `right` will not be set.
 */
function stateSave() {
    return function (dispatch, getState) {
        var _a = getState().explore, left = _a.left, right = _a.right, split = _a.split;
        var urlStates = {};
        var leftUrlState = {
            datasource: left.datasourceInstance.name,
            queries: left.queries.map(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["clearQueryKeys"]),
            range: left.range,
            ui: {
                showingGraph: left.showingGraph,
                showingLogs: left.showingLogs,
                showingTable: left.showingTable,
                dedupStrategy: left.dedupStrategy,
            },
        };
        urlStates.left = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["serializeStateToUrlParam"])(leftUrlState, true);
        if (split) {
            var rightUrlState = {
                datasource: right.datasourceInstance.name,
                queries: right.queries.map(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["clearQueryKeys"]),
                range: right.range,
                ui: {
                    showingGraph: right.showingGraph,
                    showingLogs: right.showingLogs,
                    showingTable: right.showingTable,
                    dedupStrategy: right.dedupStrategy,
                },
            };
            urlStates.right = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["serializeStateToUrlParam"])(rightUrlState, true);
        }
        dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_5__["updateLocation"])({ query: urlStates }));
    };
}
/**
 * Creates action to collapse graph/logs/table panel. When panel is collapsed,
 * queries won't be run
 */
var togglePanelActionCreator = function (actionCreator) { return function (exploreId, isPanelVisible) {
    return function (dispatch) {
        var uiFragmentStateUpdate;
        var shouldRunQueries = !isPanelVisible;
        switch (actionCreator.type) {
            case _actionTypes__WEBPACK_IMPORTED_MODULE_7__["toggleGraphAction"].type:
                uiFragmentStateUpdate = { showingGraph: !isPanelVisible };
                break;
            case _actionTypes__WEBPACK_IMPORTED_MODULE_7__["toggleLogsAction"].type:
                uiFragmentStateUpdate = { showingLogs: !isPanelVisible };
                break;
            case _actionTypes__WEBPACK_IMPORTED_MODULE_7__["toggleTableAction"].type:
                uiFragmentStateUpdate = { showingTable: !isPanelVisible };
                break;
        }
        dispatch(actionCreator({ exploreId: exploreId }));
        dispatch(updateExploreUIState(exploreId, uiFragmentStateUpdate));
        if (shouldRunQueries) {
            dispatch(runQueries(exploreId));
        }
    };
}; };
/**
 * Expand/collapse the graph result viewer. When collapsed, graph queries won't be run.
 */
var toggleGraph = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["toggleGraphAction"]);
/**
 * Expand/collapse the logs result viewer. When collapsed, log queries won't be run.
 */
var toggleLogs = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["toggleLogsAction"]);
/**
 * Expand/collapse the table result viewer. When collapsed, table queries won't be run.
 */
var toggleTable = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["toggleTableAction"]);
/**
 * Change logs deduplication strategy and update URL.
 */
var changeDedupStrategy = function (exploreId, dedupStrategy) {
    return function (dispatch) {
        dispatch(updateExploreUIState(exploreId, { dedupStrategy: dedupStrategy }));
    };
};
function refreshExplore(exploreId) {
    return function (dispatch, getState) {
        var itemState = getState().explore[exploreId];
        if (!itemState.initialized) {
            return;
        }
        var urlState = itemState.urlState, update = itemState.update, containerWidth = itemState.containerWidth, eventBridge = itemState.eventBridge;
        var datasource = urlState.datasource, queries = urlState.queries, range = urlState.range, ui = urlState.ui;
        var refreshQueries = queries.map(function (q) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, q, Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["generateEmptyQuery"])(itemState.queries))); });
        var refreshRange = { from: Object(_TimePicker__WEBPACK_IMPORTED_MODULE_8__["parseTime"])(range.from), to: Object(_TimePicker__WEBPACK_IMPORTED_MODULE_8__["parseTime"])(range.to) };
        // need to refresh datasource
        if (update.datasource) {
            var initialQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_4__["ensureQueries"])(queries);
            var initialRange = { from: Object(_TimePicker__WEBPACK_IMPORTED_MODULE_8__["parseTime"])(range.from), to: Object(_TimePicker__WEBPACK_IMPORTED_MODULE_8__["parseTime"])(range.to) };
            dispatch(initializeExplore(exploreId, datasource, initialQueries, initialRange, containerWidth, eventBridge, ui));
            return;
        }
        if (update.range) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["changeTimeAction"])({ exploreId: exploreId, range: refreshRange }));
        }
        // need to refresh ui state
        if (update.ui) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["updateUIStateAction"])(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, ui, { exploreId: exploreId })));
        }
        // need to refresh queries
        if (update.queries) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_7__["setQueriesAction"])({ exploreId: exploreId, queries: refreshQueries }));
        }
        // always run queries when refresh is needed
        if (update.queries || update.ui || update.range) {
            dispatch(runQueries(exploreId));
        }
    };
}


/***/ }),

/***/ "./public/app/features/explore/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/explore/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: exploreItemUIStateSelector, deduplicatedLogsSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exploreItemUIStateSelector", function() { return exploreItemUIStateSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deduplicatedLogsSelector", function() { return deduplicatedLogsSelector; });
/* harmony import */ var app_core_utils_reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/utils/reselect */ "./public/app/core/utils/reselect.ts");
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");


var exploreItemUIStateSelector = function (itemState) {
    var showingGraph = itemState.showingGraph, showingLogs = itemState.showingLogs, showingTable = itemState.showingTable, showingStartPage = itemState.showingStartPage, dedupStrategy = itemState.dedupStrategy;
    return {
        showingGraph: showingGraph,
        showingLogs: showingLogs,
        showingTable: showingTable,
        showingStartPage: showingStartPage,
        dedupStrategy: dedupStrategy,
    };
};
var logsSelector = function (state) { return state.logsResult; };
var hiddenLogLevelsSelector = function (state) { return state.hiddenLogLevels; };
var dedupStrategySelector = function (state) { return state.dedupStrategy; };
var deduplicatedLogsSelector = Object(app_core_utils_reselect__WEBPACK_IMPORTED_MODULE_0__["createLodashMemoizedSelector"])(logsSelector, hiddenLogLevelsSelector, dedupStrategySelector, function (logs, hiddenLogLevels, dedupStrategy) {
    if (!logs) {
        return null;
    }
    var filteredData = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__["filterLogLevels"])(logs, new Set(hiddenLogLevels));
    return Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__["dedupLogRows"])(filteredData, dedupStrategy);
});


/***/ }),

/***/ "./public/app/features/explore/utils/set.ts":
/*!**************************************************!*\
  !*** ./public/app/features/explore/utils/set.ts ***!
  \**************************************************/
/*! exports provided: equal, intersect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equal", function() { return equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersect", function() { return intersect; });
/**
 * Performs a shallow comparison of two sets with the same item type.
 */
function equal(a, b) {
    if (a.size !== b.size) {
        return false;
    }
    var it = a.values();
    while (true) {
        var _a = it.next(), value = _a.value, done = _a.done;
        if (done) {
            return true;
        }
        if (!b.has(value)) {
            return false;
        }
    }
}
/**
 * Returns a new set with items in both sets using shallow comparison.
 */
function intersect(a, b) {
    var result = new Set();
    var it = b.values();
    while (true) {
        var _a = it.next(), value = _a.value, done = _a.done;
        if (done) {
            return result;
        }
        if (a.has(value)) {
            result.add(value);
        }
    }
}


/***/ })

}]);
//# sourceMappingURL=explore.36bfb8f58cbf31421cf9.js.map