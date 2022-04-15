import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import Card from './components/card';
import { getSearchResults, getNextPageSearchResults } from './services/search';
import { debounceFunction } from "./utils/debounce";

function App() {
  const [videoList, setVideoList] = useState([])
  const loader = useRef(null);
  const isFirstRender = useRef(true);
  const inputRef = useRef(null);
  const [page, setPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState('');

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isFirstRender.current) {
      setPage(prev => prev + 1)
    }
  }, []);

  const handleApiCall = async (inputValue) => {
    const results = await getSearchResults(inputValue)
    console.log('testset')

    setVideoList(results.data.items)
    setNextPageToken(results.data.nextPageToken)
    isFirstRender.current = false
  }

  useEffect(() => {
    const handleNextPageApiCall = async () => {
      const results = await getNextPageSearchResults(inputRef.current.value, nextPageToken)
      console.log('testset')

      setNextPageToken(results.data.nextPageToken)
      setVideoList(prev => [...prev, ...results.data.items])
    }

    if (!isFirstRender.current) {
      isFirstRender.current = false
      handleNextPageApiCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "40px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const debounceDropDown = debounceFunction((nextValue) => handleApiCall(nextValue), 1000)

  const handleChange = (e) => {
    debounceDropDown(e.target.value);
  }

  return (
    <div className="App">
      <div>
        <input
          data-testid="searchInput"
          type="text"
          placeholder='Search youtube videos'
          id="search"
          ref={inputRef}
          onChange={handleChange}
        />
      </div>
      <div data-testid="videoList" className='mainContentDiv'>
        {videoList.map((item) => {
          return <Card key={item.id.videoId} videoDetails={item} />
        })}
      </div>
      <div ref={loader} />
    </div>
  );
}

export default App;
