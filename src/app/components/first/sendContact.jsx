import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class sendContact extends Component {
  constructor(props) {
    super(props);
    this.dataChangeSelection = this.dataChangeSelection.bind(this);
    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    this.setState({
      data: [
        { index   : '13',
          label   : '全学年',
          hl      : '',
          selected: false },
        { index   : '1',
          label   : '1年生',
          hl      : 'low' ,
          selected: false
        },
        { index   : '2',
          label   : '2年生',
          hl      : 'low',
          selected: false
        },
        { index   : '3',
          label   : '3年生',
          hl      : 'low',
          selected: false
        },
        { index   : '4',
          label   : '4年生',
          hl      : 'high',
          selected: false
        },
        { index   : '5',
          label   : '5年生',
          hl      : 'high',
          selected: false
        },
        { index   : '6',
          label   : '6年生',
          hl      : 'high',
          selected: false,
        }
      ],
    });
  }

  // チェックボッスクがON/OFFされた場合の処理
  dataChangeSelection = (targetId) => {
    const nextdata = this.state.data.map((d) => {
      if (d.index === targetId.currentTarget.id) {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: !d.selected
        };
      } else if (targetId.currentTarget.value === '') {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: targetId.currentTarget.checked
        };
      } else {
        return{
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: d.selected
        };
      }
    });
    this.setState({data: nextdata});

    //1~6年生全てがチェックされた時
  //   const chkAll = nextdata.map((all) => {
  //     if (targetId.currentTarget.hl === '') {
  //       for (let i = 0; i <= all.lengh; i ++) {
  //         return {
  //           index   : all.index,
  //           label   : all.label,
  //           hl      : all.hl,
  //           selected: true
  //         };
  //       }
  //     } else {
  //       return {
  //         index   : all.index,
  //         label   : all.label,
  //         hl      : all.hl,
  //         selected: all.selected
  //       };
  //     }
  //   });
  //   this.setState({data: chkAll});
  };

  render() {
    const chkBoxData = this.state.data.map((data) => {
      return (
        <div key={ data.index } className="checkbox-inline">
          <input
            id={data.index}
            type="checkbox"
            onChange={this.dataChangeSelection.bind(this)}
            checked={data.selected}
            value={data.hl}
          >{data.label}</input>
        </div>
      );
    });

    return(
      <div className="container">
        <form>
          <div className="form-group col-xs-4">
            <input
              type="text"
              className="form-control"
              placeholder="件名">
            </input>
          </div>
          <div className="form-group col-xs-12">
            <textarea
              className="form-control"
              rows="10"
              placeholder="本文">
            </textarea>
          </div>
          <div className="form-group col-xs-4">
            <input
              type="file">
            </input>
          </div>
          <div className="col-xs-12"></div>
          <div className="form-group col-xs-12">
            {chkBoxData}
          </div>
          <div className="col-xs-12"></div>
          <div className="col-xs-4"></div>
          <div className="col-xs-4">
            <button className="form-group btn-block">送信</button>
          </div>
          <div className="col-xs-4"></div>
        </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(sendContact);
