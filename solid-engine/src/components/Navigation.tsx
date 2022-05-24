import * as React from 'react';
import headers from '../helpers/headers';
import { MetaDataModel, MetaDataModelChaper } from '../models/MetaData';

interface State {
  metaData: MetaDataModel;
  toggled: boolean;
}

export default class Navigation extends React.Component {
  state: Readonly<State> = {
    metaData: {
      title: '',
      chapters: [],
    },
    toggled: false,
  };

  constructor(props: any) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
  }

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
      this.setState({ metaData });
    } catch (err: any) {
      console.error(err);
    }
  }

  private toggleNav(): void {
    this.setState((prevState: Readonly<State>) => ({
      toggled: !prevState.toggled,
    }));
    console.log(this.state.toggled);
  }

  render() {
    const { metaData } = this.state;
    return (
    <div className="navigation">
      <button
        type="button"
        className={this.state.toggled ? 'navigation-toggle-button show': 'navigation-toggle-button'}
        onClick={this.toggleNav}
      >
        <span>&#xab;</span>
      </button>
      <div className={this.state.toggled ? 'navigation-list-container show': 'navigation-list-container'}>
        <ul className="navigation-list">
          {metaData.chapters.map((ch: MetaDataModelChaper) =>
            <li key={ch.number}>{ch.number}</li>
          )}
        </ul>
      </div>
    </div>
    );
  }
}
