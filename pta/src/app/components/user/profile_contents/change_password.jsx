import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from '../../helpers/loading';
import {changePassword} from '../../../actions/firebase_actions';

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: ''
    };
  }

  onFormSubmit(event) {
    console.info(this.state.currentUser);
    event.preventDefault();
    const password = this.password.value;
    const repeatPassword = this.repeatPassword.value;

    if (password !== repeatPassword) {
      this.setState({
        message: '確認用パスワードと一致しませんでした!'
      });
    } else {
      this.props.changePassword(password).then((data) => {
        if (data.payload.errorCode) {
          this.setState({
            message: data.payload.errorMessage
          });
        } else {
          this.setState({
            message: 'パスワードを更新しました!'
          });
        }
      });
    }
  }

  render() {
    if (!this.props.currentUser) {
      return <Loading/>;
    }
    return (
      <form
        id="ChangePassword"
        role="form"
        onSubmit={this.onFormSubmit}
      >
        <h4>パスワード変更</h4>
        <div className="form-group">
          <label htmlFor="password">新しいパスワード:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            ref={c => {this.password = c; }}
            id="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">新しいパスワード（確認用）:</label>
          <input
            type="password"
            className="form-control"
            name="repeatPassword"
            ref={c => {this.repeatPassword = c; }}
            id="repeatPassword"
          />
        </div>
        <p className="state-message">
          {this.state.message}
        </p>
        <button
          type="submit"
          className="btn btn-primary"
        >パスワード更新</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changePassword
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
