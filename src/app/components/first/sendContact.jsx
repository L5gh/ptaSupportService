import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class sendContact extends Component {
  constructor(props) {
    super(props);
    this.dataChangeSelection = this.dataChangeSelection.bind(this);
    this.state = {
      grade     : [],
      All       : [],
      checkCount: 0
    };
    this.count = 0;
  }

  componentDidMount = () => {
    this.setState({
      grade: [
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
      All: [
        { index   : '10',
          label   : '全学年',
          hl      : '',
          selected: false }
      ]
    });
  }

  // チェックボッスクがON/OFFされた場合の処理
  dataChangeSelection = (targetId) => {
    const checkAll = this.state.All.map(d => {
      if (d.index === targetId.currentTarget.id) {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: !d.selected
        };
      }else{
        return{
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: d.selected
        };
      }
    });
    const checkGrade = this.state.grade.map((d) => {
      if (d.index === targetId.currentTarget.id) {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: !d.selected
        };
        //全学年がON/OFFされた場合の処理
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
    //1~6年生全てがチェックされた時
    this.count = 0;
    checkGrade.map(data => {
      if(data.selected === true) {
        this.count = this.count + 1;
      }
    });
    console.log('count:'+this.count);

    const AllData = this.state.All.map(d => {
      if (this.count === 6) {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: true
        };
      }else{
        return{
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: false
        };
      }
    });

    this.setState({grade: checkGrade});
    this.setState({All: checkAll});
    this.setState({All: AllData});
  };

  render() {
    const nextAll = this.state.All.map((data) => {
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
    const nextGrade = this.state.grade.map((data) => {
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
            {nextAll}
            {nextGrade}
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
