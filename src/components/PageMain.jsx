import React from 'react';

import SearchFilterForm from './SearchFilterForm';
import CountryCard from './CountryCard';

import { filterCountries } from '../utils';

function PageMain({ data }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const filteredCountries = filterCountries(data, searchTerm, selectedRegion);

  return (
    <main className="mx-auto flex max-w-[80rem] flex-col gap-8 px-4 py-6 md:gap-12 md:px-8 md:py-12 xl:px-0">
      <h1 className="sr-only">Countries Information</h1>

      <SearchFilterForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        regions={regions}
      />

      {filteredCountries?.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-800 text-very-dark-blue-l flex items-center justify-center gap-2 text-lg dark:text-white">
            <span className="text-800">🔍</span>
            No countries found matching "{searchTerm}"
            {selectedRegion && ` in ${selectedRegion}`}
            <span className="text-2xl">🌍</span>
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            {`Try different search terms ${selectedRegion && 'or regions'}`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-(--my-grid-cols) gap-10 md:gap-[4.6875rem]">
          {filteredCountries.map((country) => {
            return <CountryCard key={country.cca3} country={country} />;
          })}
        </div>
      )}
    </main>
  );
}

export default PageMain;
