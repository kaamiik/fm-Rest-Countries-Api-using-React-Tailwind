import React from 'react';
import { Link } from 'react-router';

function CountryCard({ country }) {
  return (
    <div className="dark:bg-dark-blue relative mx-auto flex w-full max-w-[16.5rem] cursor-pointer flex-col gap-5 rounded-[5px] bg-white shadow-(--shadow-three) transition-all duration-300 hover:scale-105 has-[:focus]:ring-2 has-[:focus]:ring-blue-500 has-[:focus]:ring-offset-2">
      <img
        className="h-40 rounded-[5px]"
        src={country.flags.png}
        alt={country.flags.alt}
        loading="lazy"
      />
      <div className="flex flex-col gap-5 px-6 pb-12">
        <h2 className="text-500 font-extrabold">
          <Link
            to={`/country/${country.cca3}`}
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
          >
            {country.name.common}
          </Link>
        </h2>
        <dl className="text-300">
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
            <dt className="inline">Capital: </dt>
            <dd className="inline font-light">
              {country.capital?.[0] || 'N/A'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default CountryCard;
