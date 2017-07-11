import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class sendContact extends Component {

  constructor(props) {
    super(props);
    this.categoryChangeSelection = this.categoryChangeSelection.bind(this);
    this.gradeChangeSelection = this.gradeChangeSelection.bind(this);
    this.state = {
      grade         : [],
      cate          : [],
      lowCheckCount : 0,
      highCheckCount: 0
    };
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
        { index   : '11',
          label   : '低学年',
          hl      : 'low',
          selected: false },
        { index   : '12',
          label   : '高学年',
          hl      : 'high',
          selected: false },
        { index   : '13',
          label   : '全学年',
          hl      : '',
          selected: false }
      ],
    });
  }

  categoryChangeSelection = (targetId) => {
    const nextCate = this.state.cate.map((d) => {
      if (d.index === targetId.currentTarget.id ) {
        const nextGe = this.state.grade.map((data) => {
          if (data.hl === targetId.currentTarget.value ) {
            return{
              index   : data.index,
              label   : data.label,
              hl      : data.hl,
              selected: targetId.currentTarget.checked
            };
          } else if (targetId.currentTarget.value === '' ) {
            return {
              index   : data.index,
              label   : data.label,
              hl      : data.hl,
              selected: targetId.currentTarget.checked
            };
          } else {
            return {
              index   : data.index,
              label   : data.label,
              hl      : data.hl,
              selected: data.selected
            };
          }
        });
        this.setState({grade: nextGe});
        return{
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: !d.selected
        };
      } else if (targetId.currentTarget.value === '' ) {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: targetId.currentTarget.checked
        };
      } else {
        return {
          index   : d.index,
          label   : d.label,
          hl      : d.hl,
          selected: d.selected
        };
      }
    });
    this.setState({cate: nextCate});
  };

  gradeChangeSelection = (targetId) => {
    const nextGrade = this.state.grade.map((gd) => {
      // gradeのON/OFF制御
      if (gd.index === targetId.currentTarget.id ) {
        return {
          index   : gd.index,
          label   : gd.label,
          hl      : gd.hl,
          selected: !gd.selected
        };
      } else {
        return {
          index   : gd.index,
          label   : gd.label,
          hl      : gd.hl,
          selected: gd.selected
        };
      }
    });
    this.setState({grade: nextGrade});

    // gradeのチェックonの数をカウントする処理
    if(targetId.currentTarget.checked === true) {
      if(targetId.currentTarget.value === 'low') {
        this.setState({ lowCheckCount: this.state.lowCheckCount + 1});
      } else if(targetId.currentTarget.value === 'high') {
        this.setState({ highCheckCount: this.state.highCheckCount + 1});
      }
    } else if(targetId.currentTarget.checked === false) {
      if(targetId.currentTarget.value === 'low') {
        this.setState({ lowCheckCount: this.state.lowCheckCount - 1});
      } else if(targetId.currentTarget.value === 'high') {
        this.setState({ highCheckCount: this.state.highCheckCount - 1});
      }
    }

    // gradeをON/OFFした時のカテゴリーの制御
    const lowNumber = 2;
    const highNumber = 2;
    if (this.state.lowCheckCount === lowNumber) {
      const lowCheckAll = this.state.cate.map((c) => {
        if (c.hl === 'low' ) {
          return {
            index   : c.index,
            label   : c.label,
            hl      : c.hl,
            selected: true
          };
        } else {
          return{
            index   : c.index,
            label   : c.label,
            hl      : c.hl,
            selected: c.selected
          };
        }
      });
      this.setState({cate: lowCheckAll});
    } else {
      const lowCheckNotAll = this.state.cate.map((n) => {
        if (n.hl === 'low' ) {
          return {
            index   : n.index,
            label   : n.label,
            hl      : n.hl,
            selected: false
          };
        } else {
          return{
            index   : n.index,
            label   : n.label,
            hl      : n.hl,
            selected: n.selected
          };
        }
      });
      this.setState({cate: lowCheckNotAll});
    }
  }

  render() {
    const catelist = this.state.cate.map(cate => {
      return (
        <div key={ cate.index } className="checkbox-inline">
          <input
            id={cate.index}
            type="checkbox"
            onChange={this.categoryChangeSelection.bind(this)}
            checked={cate.selected}
            value={cate.hl}
          >{cate.label}</input>
        </div>
      );
    });
    const gradelist = this.state.grade.map(g => {
      return (
        <div key={ g.index } className="checkbox-inline">
          <input id={g.index}
            type="checkbox"
            onChange={this.gradeChangeSelection.bind(this)}
            checked={g.selected}
            value={g.hl}
          >{g.label}</input>
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
            {catelist}
            {gradelist}
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
