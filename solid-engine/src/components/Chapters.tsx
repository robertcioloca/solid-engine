import * as React from 'react';
import Chapter from './Chapter';
import headers from '../helpers/headers';
import ChapterModel from '../models/Chapter';

interface State {
  chapters: ChapterModel[];
}

export default class Chapters extends React.Component {
  state: Readonly<State> = {
    chapters: [],
  };

  async componentDidMount(): Promise<void> {
    // done until ch 15.
    async function getChapters(): Promise<Chapter> {
      const resp = await fetch('../content/book1.json', {
        headers,
      });
      const res = await resp.json();
      return res.chapters.map((el: string, index: number): ChapterModel => ({
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
        {chapters.map((ch: ChapterModel) =>
          <Chapter
            key={ch.number}
            number={ch.number}
            content={ch.content}
          />
        )}
      </div>
    );
  }
}