"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TestComponent from "../_components/TestComponent";

const Page = () => {
  const [country, setCountry] = useState([]);
  const router = useRouter();
  const params = useParams();
  const countryName = params.CountryName;

  const fetchData = async () => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();
    setCountry(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (country.length === 0) return null;

  const currencies = country.currencies;
  console.log(Object.values(currencies)[0].symbol);

  return (
    <div
      className="bg-amber-100"
      onClick={() => {
        router.push(country.maps.googleMaps);
      }}
    >
      {country.name.common}
      <TestComponent score="asdsads" />
    </div>
  );
};

export default Page;
