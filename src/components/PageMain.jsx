import React from 'react';

import SearchInput from './SearchInput';
import RegionSelect from './RegionSelect';
import CountryCard from './CountryCard';

function PageMain({ data }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const filteredCountries = data?.filter((country) => {
    const searchTermLower = searchTerm.trim().toLowerCase();

    const nameMatch =
      country.name.common.toLowerCase().includes(searchTermLower) ||
      country.cca2.toLowerCase().includes(searchTermLower) ||
      country.cca3.toLowerCase().includes(searchTermLower);

    const regionMatch = selectedRegion
      ? country.region === selectedRegion
      : true;

    return nameMatch && regionMatch;
  });

  return (
    <main className="mx-auto flex max-w-[80rem] flex-col gap-8 px-4 py-6 md:gap-12 md:px-8 md:py-12 xl:px-0">
      <h1 className="sr-only">Countries Information</h1>
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
      >
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="text-200 md:text-300 dark:bg-dark-blue w-full max-w-[30rem] rounded-[5px] bg-white py-4 ps-20 pe-4 shadow-(--shadow-two) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 md:py-5 dark:placeholder:text-white"
        />

        <RegionSelect
          selectedKey={selectedRegion}
          onSelectionChange={setSelectedRegion}
          regions={regions}
        />
      </form>
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
