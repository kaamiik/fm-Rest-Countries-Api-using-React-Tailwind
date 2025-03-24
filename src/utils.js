export function filterCountries(data, searchTerm, selectedRegion) {
  const searchTermLower = searchTerm.trim().toLowerCase();

  return data?.filter((country) => {
    const nameMatch =
      country.name.common.toLowerCase().includes(searchTermLower) ||
      country.cca2.toLowerCase().includes(searchTermLower) ||
      country.cca3.toLowerCase().includes(searchTermLower);

    const regionMatch = selectedRegion
      ? country.region === selectedRegion
      : true;

    return nameMatch && regionMatch;
  });
}
