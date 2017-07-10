import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action } from '../../dispatcher/dispatcher';

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: '',
    };
  }

  onFormSubmit(event) {
    event.preventDefault();

    action.signup(this.email.value, this.password.value);
    this.setState({
      signupEmail   : '',
      signupPassword: '',
    });
    // this.props.registerUser({ email, password }).then((data) => {
    //   // if (data.payload.errorCode !== '') {
    //   // if (data.payload.errorCode !== undefined) {
    //   if (data.payload.errorCode) {
    //     this.setState({
    //       message: data.payload.errorMessage
    //     });
    //   } else {
    //     // this.setState({
    //     //   message: '登録が完了しました。/n 画面が切り替わらない場合は、アカウント（メールアドレス） → ユーザ情報にアクセスしてみてください。'
    //     // });
    //     browserHistory.push('/profile');
    //   }
    // });
  }

  render() {
    return (
      <div className="col-md-4">
        <form
          id="frmRegister"
          role="form"
          onSubmit={this.onFormSubmit}
        >
          <h2>アカウント登録</h2>
          <div className="form-group">
            <input
              type="hidden"
              defaultValue="members"
              value="一般会員"
              className="form-control"
              ref={c => { this.roles = c; }}
              id="txtRoles"
              placeholder="Members Roles"
              name="roles"
              />
          </div>
          <div className="form-group">
            <label htmlFor="txtRegEmail">メールアドレス</label>
            <input
              type="email"
              className="form-control"
              ref={c => { this.email = c; }}
              id="txtEmail"
              placeholder="Enter Email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtRegPass">パスワード</label>
            <input
              type="password"
              className="form-control"
              ref={c => { this.password = c; }}
              id="txtPass"
              placeholder="Password"
              name="password"
            />
          </div>
          <p className="state-message">
            {this.state.message}
          </p>
          <button
            type="submit"
            className="btn btn-default"
          >登録</button>
          {/*
          <br /> <br />
          <a
            href="#"
            className="btn btn-block btn-social btn-google"
            onClick={() => {
              this.loginWithProvider('google');
            }}
            data-provider="twitter"
          >Google</a>
          */}
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    action,
  },
  dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
