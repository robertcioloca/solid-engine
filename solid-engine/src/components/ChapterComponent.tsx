import * as React from 'react';
import Chapter from '../models/Chapter';

export default class ChapterComponent extends React.Component<Chapter, {}> {
  render() {
    return (  
    <div className="chapter">
      <h3>Chapter {this.props.number}</h3>
      <p>{this.props.content}</p>
    </div>
    );
  }
}