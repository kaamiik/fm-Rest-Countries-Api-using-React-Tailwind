function SearchInput({ value, onChange, ...delegated }) {
  return (
    <div className="relative flex-1">
      <label htmlFor="country-search" className="sr-only">
        Search countries
      </label>
      <input
        type="text"
        placeholder="Search for a country..."
        id="country-search"
        name="countrySearch"
        value={value}
        onChange={onChange}
        {...delegated}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-search absolute top-1/2 left-8 -translate-y-1/2 text-gray-500 dark:text-white"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );
}

export default SearchInput;
