"use client";

import { useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState({
    movieName: '',
    imgUrl: '',
    tier: 'S'
  });

  let a = 10
  a = '10'

  const handleMovieData = (event) => {
    const { name, value } = event.target

    if (name === 'movieName') {
      setMovieData({ ...movieData, movieName: value })
    }

    if (name === 'imgUrl') {
      setMovieData({ ...movieData, imgUrl: value })
    }

    if (name === 'tier') {
      setMovieData({ ...movieData, tier: value })
    }
  }

  const addMovie = () => {
    setMovies([...movies, movieData])
  }

  return (
    <div>
      <input placeholder="movie name" value={movieData.movieName} name='movieName' onChange={(e) => handleMovieData(e)} />
      <input placeholder="movie image url" value={movieData.imgUrl} name='imgUrl' onChange={(e) => handleMovieData(e)} />
      <select name="tier" value={movieData.tier} onChange={(e) => handleMovieData(e)}>
        <option value="S">S</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
      <button onClick={addMovie}>add</button>
      {
        ['S', "A", "B", "C"].map((tier) => {
          const filteredMovies = movies.filter((movie) => movie.tier === tier)
          return (
            <div key={filteredMovies.movieName}>
              <div>
                {tier}
              </div>
              {
                filteredMovies.map((movie, index) => {
                  return (
                    <div key={index} className="flex gap-2">
                      <div>
                        {movie.movieName}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  );
}
