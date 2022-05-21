import * as React from 'react';
import Chapter from '../models/Chapter';
import ChapterComponent from './ChapterComponent';

interface State {
  chapters: Chapter[];
}

export default class ChaptersComponent extends React.Component {
  state: Readonly<State> = {
    chapters: [],
  };

  async componentDidMount(): Promise<void> {
    async function getChapters(): Promise<Chapter> {
      const resp = await fetch('../content/book1.json', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      const res = await resp.json();
      return res.chapters.map((el: string, index: number): Chapter => ({
        number: index + 1,
        content: el,
      }));
    };

    try {
      const chapters = await getChapters();
      this.setState({chapters});
    } catch (err: any) {
      console.error(err);
    }
  }

  render() {
    const { chapters } = this.state;
    return (
      <div className="chapters">
        {chapters.map((ch: Chapter) =>
          <ChapterComponent
            key={ch.number}
            number={ch.number}
            content={ch.content}
          />
        )}
      </div>
    );
  }
}