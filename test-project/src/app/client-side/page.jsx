"use client";

import { useEffect, useState } from "react";
import { Country } from "../_components/Country";
import { NotFound } from "../_components/NotFound";
import { useRouter } from "next/navigation";

const Page = () => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const fetchData = async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/independent?status=true",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setCountries(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCountries = countries?.filter((country) => {
    return country.name.common.toLowerCase().includes(inputValue.toLowerCase());
  });

  return (
    <div className="flex flex-col">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="search country"
        className="border border-amber-600 h-10 w-100 ml-4 mt-4"
      />
      <div className="w-screen flex justify-center">
        <div className="flex flex-wrap gap-4 w-[1300px]">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    router.push(`/${country.name.official}`);
                  }}
                >
                  <Country
                    flagUrl={country.flags.png}
                    official={country.name.official}
                  />
                </div>
              );
            })
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
