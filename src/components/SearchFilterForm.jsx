import SearchInput from './SearchInput';
import RegionSelect from './RegionSelect';

import { useSearchParams } from 'react-router';

function SearchFilterForm({ regions }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('countrySearch') || '';
  const selectedRegion = searchParams.get('regionFilter') || '';

  const handleSearch = (event) => {
    setSearchParams((params) => {
      event.target.value
        ? params.set('countrySearch', event.target.value)
        : params.delete('countrySearch');

      return params;
    });
  };

  const handleRegion = (region) => {
    setSearchParams((params) => {
      region
        ? params.set('regionFilter', region)
        : params.delete('regionFilter');
      return params;
    });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
    >
      <SearchInput
        value={searchTerm}
        onChange={handleSearch}
        className="text-200 md:text-300 dark:bg-dark-blue w-full max-w-[30rem] rounded-[5px] bg-white py-4 ps-20 pe-4 shadow-(--shadow-two) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 md:py-5 dark:placeholder:text-white"
      />

      <RegionSelect
        selectedKey={selectedRegion}
        onSelectionChange={handleRegion}
        regions={regions}
      />
    </form>
  );
}

export default SearchFilterForm;
