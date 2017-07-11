import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPasswordEmail } from '../../actions/firebase_actions';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const email = this.email.value;
    this.props.resetPasswordEmail(email).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage });
      } else {
        this.setState({ message: 'Please see your email!' });
      }
    });
  }

  render() {
    return (
      <div className="col-md-4">
        <form
          role="form"
          onSubmit={this.onFormSubmit}
        >
          <div className="form-group">
            <label htmlFor="txtEmail">メールアドレス（アカウント）</label>
            <input
              type="email"
              className="form-control"
              id="txtEmail"
              ref={c => {this.email = c; }}
              placeholder="Enter Email"
              name="email"
            />
          </div>
          <p className="state-message">
            {this.state.message}
          </p>
          <button
            type="submit"
            className="btn btn-default btn-block"
          >パスワードのリセット</button>
        </form>
      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetPasswordEmail,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ResetPassword);
