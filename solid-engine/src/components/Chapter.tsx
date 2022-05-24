import * as React from 'react';
import ChapterModel from '../models/Chapter';

export default class Chapter extends React.Component<ChapterModel, {}> {
  render() {
    return (  
    <div className="chapter">
      <h3>Chapter {this.props.number}</h3>
      <p>{this.props.content}</p>
    </div>
    );
  }
}