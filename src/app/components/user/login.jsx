import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action } from '../../dispatcher/dispatcher';

class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.loginWithProvider = this.loginWithProvider.bind(this);
    this.state = {
      message: '',
    };
  }

  onFormSubmit(event) {
    event.preventDefault();
    action.login(this.email.value, this.password.value);
    this.setState({
      email   : '',
      password: '',
    });
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    return (
      <div className="col-md-4">
        <form
          id="frmLogin"
          role="form"
          onSubmit={this.onFormSubmit}
        >
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="txtEmail">メールアドレス</label>
            <input
              type="email"
              className="form-control"
              id="txtEmail"
              ref={c => { this.email = c; }}
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtPass">パスワード</label>
            <input
              type="password"
              className="form-control"
              id="txtPass"
              ref={c => { this.password = c; }}
              placeholder="Password"
              name="password"
            />
          </div>
          <p className="state-message">
            {this.state.message}
          </p>
          <button
            type="submit"
            className="btn btn-default btn-block"
          >ログイン</button>
          <br />
          <h5><Link to="/reset">パスワードを忘れましたか?</Link></h5>
          {/*
          <h4>SNSアカウントと連携</h4>
          }<a
            href="#"
            className="btn btn-block btn-social btn-facebook"
            onClick={() => {
              this.loginWithProvider('facebook');
            }} data-provider="facebook"
          >Facebook</a>

          <a
            href="#"
            className="btn btn-block btn-social btn-twitter"
            onClick={() => {
              this.loginWithProvider('twitter');
            }} data-provider="twitter"
          >Twitter</a>
          <a
            href="#"
            className="btn btn-block btn-social btn-google"
            onClick={() => {
              this.loginWithProvider('google');
            }}
            data-provider="twitter"
          >Google</a>
          <a
            href="#"
            className="btn btn-block btn-social btn-github"
            onClick={() => {
              this.loginWithProvider('github');
            }} data-provider="twitter"
          >Github</a>
        */}
        </form>
      </div>

    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    action
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
