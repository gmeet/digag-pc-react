/**
 * Created by Yuicon on 2017/7/5.
 * https://github.com/Yuicon
 */
import React, { Component } from 'react';
import './Index.css';
import {findAllEntriesAction, likeEntryAction} from '../../redux/action/entries';
import {connect} from "react-redux";
import {Tabs} from "element-react";
import Entry from "../../components/Index/Entry";

@connect(
  (state) => {
    return ({
      entries: state.entries.get('entries'),
      error: state.entries.get('error'),
    });
  },
  {findAllEntriesAction, likeEntryAction}
)
export default class Index extends Component {

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.page = 0;
  }

  componentWillMount() {
    console.log('componentDidMount');
    this.props.findAllEntriesAction();
    window.addEventListener('scroll', this.throttle(this.onScroll, 500, 1000), { passive: true });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener('scroll', this.throttle(this.onScroll, 500, 1000), { passive: true });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.entries !== this.props.entries;
  }

  throttle = (func, wait, mustRun) => {
    let timeout, startTime = new Date();

    return () => {
      let args = arguments, curTime = new Date();
      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if(curTime - startTime >= mustRun){
        func.apply(this,args);
        startTime = curTime;
        // 没达到触发间隔，重新设定定时器
      }else{
        timeout = setTimeout(func, wait);
      }
    };
  };

  onScroll() {
    console.log('onScroll');
    if ((window.pageYOffset + window.innerHeight + 1) > document.body.scrollHeight) {
      console.log('onScroll 到底');
      this.page++;
      this.props.findAllEntriesAction(this.page);
    }
  };

  onScrollCapture = () => {
    console.log('onScrollCapture');
  };

  render(){
    return(
      <div className="App" onScroll={Index.onScroll} onScrollCapture={this.onScrollCapture}>
        <div className="App-body">
          <div className="welcome-view">
            {/*<div className="category-nav">*/}
              {/*<div>1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd</div>*/}
            {/*</div>*/}
            <div className="main">
              <Tabs activeName="最新" onTabClick={ (tab) => console.log(tab.props.name) }>
                <Tabs.Pane label={'热门'} name={'热门'} key={'热门'}>
                  {

                  }
                </Tabs.Pane>
                <Tabs.Pane label={'最新'} name={'最新'} key={'最新'}>
                  {
                    this.props.entries.toList().map(entry => {
                      return <Entry key={entry.id} entry={entry} onClick={this.props.likeEntryAction}/>
                    })
                  }
                </Tabs.Pane>
                <Tabs.Pane label={'评论'} name={'评论'} key={'评论'}>
                  {

                  }
                </Tabs.Pane>
              </Tabs>
            </div>
            <div className="sidebar">
              31adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd1adasdasdasdasdasd
            </div>
          </div>
        </div>
      </div>
    )
  }

}
