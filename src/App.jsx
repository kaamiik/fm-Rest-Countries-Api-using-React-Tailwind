import React from 'react';
import useSWR from 'swr';

import Spinner from './components/Spinner';

import PageHeader from './components/PageHeader';
import PageMain from './components/PageMain';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch country');
  }

  return json;
}

function App() {
  const { data, error, isLoading, mutate } = useSWR(
    'https://restcountries.com/v3.1/all',
    fetcher
  );

  if (isLoading)
    return (
      <div className="bg-very-light-gray dark:bg-very-dark-blue flex min-h-screen flex-col justify-center">
        <PageHeader />
        <Spinner size={56} />
      </div>
    );

  if (error)
    return (
      <div className="text-400 bg-very-light-gray dark:bg-very-dark-blue text-very-dark-blue-l min-h-screen font-sans font-semibold dark:text-white">
        <PageHeader />
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-4 text-red-600 dark:text-red-400">
          <div className="text-6xl">😢</div>
          <div className="text-center">
            <p className="text-xl font-bold">Oops! Something went wrong</p>
            <p className="mt-2 text-lg">{error.message}</p>
          </div>
          <button
            onClick={() => mutate()}
            className="mt-4 cursor-pointer rounded bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="text-400 bg-very-light-gray dark:bg-very-dark-blue text-very-dark-blue-l min-h-screen font-sans font-semibold dark:text-white">
      <PageHeader />
      <PageMain data={data} />
    </div>
  );
}

export default App;
