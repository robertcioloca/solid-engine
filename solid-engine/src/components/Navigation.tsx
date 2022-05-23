import * as React from 'react';
import headers from '../helpers/headers';
import { MetaDataModel, MetaDataModelChaper } from '../models/MetaData';

interface State {
  metaData: MetaDataModel;
}

export default class Navigation extends React.Component {
  state: Readonly<State> = {
    metaData: {
      title: '',
      chapters: [],
    },
  };

  async componentDidMount(): Promise<void> {
    async function loadMetaData(): Promise<MetaDataModel> {
      const resp = await fetch('./content/metadata.json', {
        headers,
      });
      const res = await resp.json();
      const chapters: MetaDataModelChaper[] = [];
      for (let i = 1; i <= res.chapters; i++) {
        chapters.push({
          current: i === 1,
          number: i,
        });
      }

      return {
        title: res.title,
        chapters,
      };
    }

    try {
      const metaData = await loadMetaData();
      this.setState({metaData});
    } catch (err: any) {
      console.error(err);
    }
  }

  render() {
    const { metaData } = this.state;
    return (
    <div className="navigation">
      <ul className="navigation-list">
        {metaData.chapters.map((ch: MetaDataModelChaper) =>
          <li>{ch.number}</li>
        )}
      </ul>
    </div>
    );
  }
}
