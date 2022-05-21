import React, { useEffect } from 'react';
import Chapter from './Chapter'
import logo from './logo.svg';
import ChapterComponent from './ChapterComponent';
import './App.css';

function App() {
  let chapters: Chapter[] = [];
  useEffect(() => {
    async function getRawData() {
      const res = await(await fetch('./content/book1.json')).json();
      chapters = res.chapters.map((el: string, index: number): Chapter => ({
        number: index + 1,
        content: el,
      }));
    };
    if (chapters.length === 0) {
      getRawData();
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>  
      </header>
      <div>
        {chapters.map((ch: Chapter): any =>
          <ChapterComponent number={ch.number} content={ch.content} />
        )}
      </div>
    </div>
  );
}

export default App;
