'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _Logo = require('./Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _New = require('./New');

var _New2 = _interopRequireDefault(_New);

var _authentication = require('../../services/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _drafts = require('../../services/drafts');

var _drafts2 = _interopRequireDefault(_drafts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @jsx h */


var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      user: props.user,
      isChangingAuthentication: false,
      isPreparingNewDraft: false
    };
    _this.toggleLogin = _this.toggleLogin.bind(_this);
    _this.newDraft = _this.newDraft.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.user) {
        _authentication2.default.getToken().then(function (token) {
          _authentication2.default.writeCookie(token);
        });
      }
    }
  }, {
    key: 'toggleLogin',
    value: function toggleLogin() {
      var _this2 = this;

      this.setState({ isChangingAuthentication: true });
      if (this.state.user) {
        _authentication2.default.signOut().then(function () {
          _this2.setState({ isChangingAuthentication: false, user: null });
        });
      } else {
        _authentication2.default.signIn().then(function (user) {
          _this2.setState({ isChangingAuthentication: false, user: user });
        });
      }
    }
  }, {
    key: 'newDraft',
    value: function newDraft() {
      var _this3 = this;

      this.setState({ isPreparingNewDraft: true });
      _drafts2.default.new(this.state.user).then(function (draftKey) {
        _this3.setState({ isPreparingNewDraft: false });
        location.href = '/drafts/' + _this3.state.user.displayName + '/' + draftKey;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'div',
        { className: 'App-wrapper' },
        (0, _preact.h)(_Logo2.default, null),
        (0, _preact.h)(_New2.default, {
          isLoggedIn: Boolean(this.state.user),
          isPreparingNewDraft: this.state.isPreparingNewDraft,
          onClick: this.newDraft
        }),
        (0, _preact.h)(_Login2.default, {
          isChangingAuthentication: this.state.isChangingAuthentication,
          isLoggedIn: Boolean(this.state.user),
          toggleLogin: this.toggleLogin
        })
      );
    }
  }]);

  return App;
}(_preact.Component);

exports.default = App;