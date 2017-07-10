import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from '../../utils/firebase';
import { action } from '../../dispatcher/dispatcher';
import Loading from '../helpers/loading';
import ChangePassword from './profile_contents/change_password';
import { updateUser } from '../../actions/firebase_actions';

class Profile extends Component {

  constructor(props) {
    super(props);
    // this.props.fetchUser();
    this.props = props;
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onSelectedOptions = this.onSelectedOptions.bind(this);
    this.state = {
      message     : '', //処理結果のメッセージ
      isOpen      : false, // 学年のプルダウンメニーの開閉フラグ
      role        : '一般会員', // ロール（役割）
      selectOption: '在学学年', // 学年の値
      grades      : [
        // {
        //   dataValue: '年少',
        //   dispLabel: '年少'
        // },
        // {
        //   dataValue: '年中',
        //   dispLabel: '年中'
        // },
        // {
        //   dataValue: '年長',
        //   dispLabel: '年長'
        // },
        {
          dataValue: '1年生',
          dispLabel: '1年生'
        },
        {
          dataValue: '2年生',
          dispLabel: '2年生'
        },
        {
          dataValue: '3年生',
          dispLabel: '3年生'
        },
        {
          dataValue: '4年生',
          dispLabel: '4年生'
        },
        {
          dataValue: '5年生',
          dispLabel: '5年生'
        },
        {
          dataValue: '6年生',
          dispLabel: '6年生'
        }
      ]
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onSelectedOptions(options) {
    this.setState({
      isOpen      : !this.state.isOpen,
      selectOption: options.currentTarget.text
    });
  }

  onButtonClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const email = this.email.value;
    const displayName = this.displayName.value;
    this.props.updateUser({ email, displayName }).then((data) => {
      console.info(data);
      if (data.payload.errorCode) {
        this.setState({
          message: data.payload.errorMessage,
        });
      } else {
        this.setState({
          message: '会員情報を更新しました！',
        });
        const uid = email;
        const data = {
          title: displayName,
          raw  : email,
          roles: this.roles.value,
          grade: this.grade.value,
        };
        action.newPost(uid, data);
      }
    }
  );}

  render() {
    const data = this.state.grades;
    const list = [];
    data.map((data, index) => {
      list.push(
        <li key={index}><a
          onClick={this.onSelectedOptions.bind(this)}
          value={data.dataValue}
        >{data.dispLabel}</a></li>
      );
    });

    return (
      <div className="col-md-7">
        <form
          id="form-profile"
          role="form"
          onSubmit={this.onFormSubmit}
        >
          <h2>会員情報画面</h2>
          <br />
          {/* 会員種別 */}
          <div className="form-group">
            <label htmlFor="roles">会員種別: </label>
            <input
              type="text"
              defaultValue={this.state.role}
              className="form-control"
              id="roles"
              ref={c => { this.roles = c; }}
              placeholder="Members Role"
              name="roles"
              disabled
            />
          </div>
          {/* メールアドレス（アカウント） */}
          <div className="form-group">
            <label htmlFor="email">メールアドレス: </label>
            <input
              type="text"
              defaultValue={this.props.email}
              className="form-control"
              id="email"
              ref={c => { this.email = c; }}
              placeholder="Email"
              name="email"
              disabled
            />
          </div>
          {/* 氏名 */}
          <div className="form-group">
            <label htmlFor="displayName">ご氏名: </label>
            <input
              type="text"
              defaultValue={this.props.displayName}
              className="form-control"
              ref={c => { this.displayName = c; }}
              id="displayName"
              placeholder="Display name"
              name="displayName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="grade">学年: </label>
            <input
              type="hidden"
              defaultValue={this.state.selectOption}
              className="form-control"
              ref={c => { this.grade = c; }}
              id="grade"
              placeholder="Grade"
              name="grade"
            />
            <div
              onClick={this.onButtonClick.bind(this)}
              className="dropdown open"
            >
              <button
                className="btn btn-default dropdown-toggle"
                type="button"
              >
                {this.state.selectOption}
                <span className="caret" />
              </button>
              {
              this.state.isOpen ?
                <ul className="dropdown-menu">
                  {list}
                </ul>
              :
                null
              }
            </div>
          </div>

          <p className="state-message">
            {this.state.message}
          </p>

          <button
            type="submit"
            className="btn btn-primary"
          >会員情報更新</button>
        </form>
        <ChangePassword />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
