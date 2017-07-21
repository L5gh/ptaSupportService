import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class sendContact extends Component {
  constructor(props) {
    super(props);
    this.dataChangeSelection = this.dataChangeSelection.bind(this);
    this.state = {
      grade: [],
      cate : []
    };
    this.lowCheckCount = 0;
    this.highCheckCount = 0;
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
      cate: [
        { index   : '10',
          label   : '全学年',
          hl      : 'All',
          selected: false },
        { index   : '11',
          label   : '低学年',
          hl      : 'lowAll',
          selected: false },
        { index   : '12',
          label   : '高学年',
          hl      : 'highAll',
          selected: false }
      ]
    });
  }

  // チェックボッスクがON/OFFされた場合の処理
  dataChangeSelection = (targetId) => {
    //1~6年生のチェックボックス処理
    const checkGrade = this.state.grade.map((d) => {
      if (d.index === targetId.currentTarget.id) {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: !d.selected
        };
        //全学年がON/OFFされた場合の処理
      } else if (targetId.currentTarget.value === 'All') {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: targetId.currentTarget.checked
        };
        //高学年がON/OFFされた場合の処理
      } else if (targetId.currentTarget.value === 'highAll'
        && d.hl === 'high'
      ) {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: targetId.currentTarget.checked
        };
        //低学年がON／OFFされた場合の処理
      } else if (targetId.currentTarget.value === 'lowAll'
        && d.hl === 'low'
      ) {
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

    this.lowCheckCount = 0; //1~3年生のチェックONの数
    this.highCheckCount = 0; //4~6年生のチェックONの数
//1~3,4~6年生のチェックON数のカウント
    checkGrade.map(data => {
      if(data.selected === true && data.hl === 'high') {
        this.highCheckCount = this.highCheckCount + 1;
      } else if (data.selected === true && data.hl === 'low') {
        this.lowCheckCount = this.lowCheckCount + 1;
      }
    });
//全、高、低学年のチェックボックス処理
    const cateData = this.state.cate.map(d => {
      const lowGradeNumber = 3;
      const highGradeNumber = 3;
      if (this.lowCheckCount === lowGradeNumber
        && d.hl === 'lowAll') {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: true
        };
      } else if (this.highCheckCount === highGradeNumber
        && d.hl === 'highAll') {
        return{
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: true
        };
      } else if ( this.lowCheckCount === lowGradeNumber
        && this.highCheckCount === highGradeNumber
        && d.hl === 'All') {
        return{
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: true
        };
      } else {
        return{
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: false
        };
      }
    });
    this.setState({grade: checkGrade});
    this.setState({cate: cateData});
  };

  render() {
    const nextCate = this.state.cate.map((data) => {
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
            {nextCate}
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
