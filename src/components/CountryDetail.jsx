import { useParams, Link, useNavigate } from 'react-router';
import useSWR from 'swr';
import Spinner from './Spinner';

import PageHeader from './PageHeader';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch country');
  }

  return json;
}

function CountryDetail() {
  const { cca3 } = useParams();
  const { data, error, isLoading, mutate } = useSWR(
    `https://restcountries.com/v3.1/alpha/${cca3}`,
    fetcher
  );

  const navigate = useNavigate();

  const { data: borderCountries, isLoading: bordersLoading } = useSWR(
    () =>
      data?.[0]?.borders?.length > 0
        ? `https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(',')}`
        : null,
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

  const country = data[0];

  return (
    <div className="text-300 md:text-400 bg-very-light-gray dark:bg-very-dark-blue text-very-dark-blue-l min-h-screen font-sans font-semibold dark:text-white">
      <PageHeader />

      <main className="mx-auto max-w-[80rem] px-8 py-10 md:py-12 xl:px-0">
        <button
          onClick={() => navigate(-1)}
          className="dark:bg-dark-blue cursor-pointer rounded-[2px] bg-white px-6 py-1.5 shadow-(--shadow-three) transition-shadow duration-300 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
        >
          ← Back
        </button>
        <div className="mt-16 grid gap-11 md:mt-20 lg:grid-cols-2 lg:items-center lg:gap-36">
          <img
            src={country.flags.png}
            alt={country.flags.alt}
            className="mx-auto max-h-[300px] w-full max-w-[35rem] self-start justify-self-start rounded-[10px] object-fill md:h-[400px] lg:mx-0"
          />
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="text-700 md:text-900 font-extrabold">
              {country.name.common}
            </h1>

            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <dl className="text-300 md:text-400 flex flex-col gap-2">
                <div>
                  <dt className="inline">Native Name: </dt>
                  <dd className="inline font-light">
                    {Object.values(country.name.nativeName)[0].common}
                  </dd>
                </div>
                <div>
                  <dt className="inline">Population: </dt>
                  <dd className="inline font-light">
                    {new Intl.NumberFormat().format(country.population)}
                  </dd>
                </div>
                <div>
                  <dt className="inline">Region: </dt>
                  <dd className="inline font-light">{country.region}</dd>
                </div>
                <div>
                  <dt className="inline">Sub Region: </dt>
                  <dd className="inline font-light">{country.subregion}</dd>
                </div>
                <div>
                  <dt className="inline">Capital: </dt>
                  <dd className="inline font-light">
                    {country.capital?.[0] || 'N/A'}
                  </dd>
                </div>
              </dl>
              <dl className="text-300 md:text-400 flex flex-col gap-2">
                <div>
                  <dt className="inline">Top Level Domain: </dt>
                  <dd className="inline font-light">{country.tld[0]}</dd>
                </div>
                <div>
                  <dt className="inline">Currencies: </dt>
                  <dd className="inline font-light">
                    {Object.values(country.currencies)[0].name}
                  </dd>
                </div>
                <div>
                  <dt className="inline">Languages: </dt>
                  <dd className="inline font-light">
                    {Object.values(country.languages).sort().join(', ')}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-8 flex flex-col gap-4 lg:flex-row">
              <p className="text-400">Border Countries:</p>
              <div className="flex flex-1 flex-row flex-wrap items-center gap-2.5">
                {bordersLoading && country.borders?.length > 0 && (
                  <Spinner size={24} />
                )}

                {!country.borders?.length && (
                  <p className="text-gray-500 italic dark:text-gray-300">
                    This country has no bordering countries
                  </p>
                )}

                {borderCountries?.map((borderCountry) => (
                  <Link
                    key={borderCountry.cca3}
                    to={`/country/${borderCountry.cca3}`}
                    className="text-very-dark-blue-l text-200 md:text-300 dark:bg-dark-blue rounded-[2px] bg-white px-4 py-1.5 text-center font-light shadow-(--shadow-four) transition-shadow duration-300 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 dark:text-white"
                  >
                    {borderCountry.name.common}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CountryDetail;
