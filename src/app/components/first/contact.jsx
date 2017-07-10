import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import login from '../user/login';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state={
      linkDatas: [
        {
          label: 'list1'
        }, {
          label: 'list2'
        }, {
          label: 'list3'
        }, {
          label: 'list4'
        }, {
          label: 'list5'
        }
      ],
    };
  }

  render() {
    const data = this.state.linkDatas;
    const list = [];
    data.map((data, index) => {
      list.push(
        <a
          key={index}
          href="#"
          className="list-group-item"
          value={data.label}
        >
          {data.label}
        </a>);
    });

    return (
      <div className="list-group">
        <div className="col-md-6">
          <p>連絡事項</p>
          {list}
        </div>
        <div className="col-md-6">
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
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
