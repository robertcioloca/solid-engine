import * as React from "react";
import Chapter from './Chapter'
export default class ChapterComponent extends React.Component<Chapter, {}> {
  render() {
    return (  
    <div>
      <h1>Chapter {this.props.number}</h1>
      <p>{this.props.content}</p>
    </div>
    );
  }
}