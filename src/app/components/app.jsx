import React, { Component, Children  } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {
//   fetchUser,
//   logoutUser,
//   loadFireBaseDbUsers,
//   addFireBaseDbUser,
//   updateFireBaseDbUser,
//   deleteFireBaseDbUser,
// } from '../actions/firebase_actions';
import { action, store } from '../dispatcher/dispatcher';

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      user   : store.user,
      isLogin: store.isLogin,
      uid    : null,
    };
    // login check
    action.loginCheck();
    // subscribe
    store.on('UPDATE_STORE', this.updateState.bind(this));
  }

  updateState(newState) {
    this.setState(newState);

    // 一覧未取得時は取得
    if (this.state.isLogin && !this.state.loadedUserPost) {
      action.getUserPosts();
    }
  }
  setChildren() {
    let count = 0;

    if(this.props.children === null && !this.alreadyLogin()) {
      return <Splash/>;
    }

    return Children.map(this.props.children, child =>{
      return React.cloneElement(child, Object.assign(this.state, {  key: ++count  }));
    });
  }

  isFetching() {
    return this.state.isDataFetch;
  }

  alreadyFetch() {
    return !this.state.isDataFetch && this.state.isDataFetch !== undefined;
  }

  alreadyLogin() {
    return this.state.isLogin;
  }

  notLogin() {
    return !this.state.isLogin || this.state.isLogin === undefined;
  }

  isInitialLoading() {
    return this.alreadyFetch() && this.notLogin();
  }

  alreadyDependShowedData() {
    return this.alreadyFetch() && this.alreadyLogin();
  }

  logOut() {
    return action.logout();
    // this.props.logoutUser().then((data) => {
      // reload props from reducer
      // this.props.fetchUser();
    // });
  }

  renderUserMenu() {
    // if current user exists and user id exists than make user navigation
    if (this.state.isLogin) {
      return (
        <li className="dropdown">
          <a
            href="#"
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.email}
            <span className="caret" /></a>
          <ul className="dropdown-menu">
            <li>
              <Link to="/profile">ユーザ情報</Link>
            </li>
            <li
              role="separator"
              className="divider"
            />
            <li>
              <Link to="/sendContact"> 連絡事項登録</Link>
            </li>
            <li
              role="separator"
              className="divider"
            />
            <li>
              <Link to="/contact"> 連絡事項</Link>
            </li>
            <li
              role="separator"
              className="divider"
            />
            <li>
              <Link
                to="/logout"
                onClick={this.logOut}
              >ログアウト</Link>
            </li>
          </ul>
        </li>
      );
    } else {
      return [
        <li key={1}>
          <Link to="/login">ログイン</Link>
        </li>,
        <li key={2}>
          <Link to="/register">アカウント登録</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <div>
        <header className="navbar navbar-static-top navbar-inverse"
          id="top"
          role="banner"
        >
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggle collapsed"
                type="button"
                data-toggle="collapse"
                data-target=".bs-navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link
                to="/"
                className="navbar-brand"
              >PTA運営支援サービス</Link>
            </div>
            <nav
              className="collapse navbar-collapse bs-navbar-collapse"
              role="navigation">
              <ul className="nav navbar-nav">
                <li><Link to="/"> TOP</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                { this.renderUserMenu(this.props.user) }
              </ul>
            </nav>
          </div>
        </header>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    action
  },
  dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
