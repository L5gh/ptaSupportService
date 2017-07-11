import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import login from '../user/login';

class Contact extends Component {
// export default () => (
  constructor(props) {
    super(props);
    this.state={
    };
  }
  render() {
    if (!this.props.currentUser) {
      return <login />;
    }
    const list = [];

    const data = [
        { text: 'リスト1' },
        { text: 'リスト2' },
        { text: 'リスト3' },
        { text: 'リスト4' },
        { text: 'リスト1' },
        { text: 'リスト2' },
        { text: 'リスト3' },
        { text: 'リスト4' },
        { text: 'リスト1' },
        { text: 'リスト2' },
        { text: 'リスト3' },
        { text: 'リスト4' },
        { text: 'リスト1' },
        { text: 'リスト2' },
        { text: 'リスト3' },
        { text: 'リスト4' },
        { text: 'リスト5' }
    ];

    for(const i in data) {
      list.push(<li><a href="#" className="list-group-item">{data[i].text}</a></li>);
    }

    return (
      <div className="list-group">
        <div className="col-md-6 over-flow">
          <p>連絡事項</p>
          <a href="#" className="list-group-item">リスト１</a>
          <ul>
            {list}
          </ul>
        </div>
        <div className="col-md-6 hidden-sm hidden-xs">
            free
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
