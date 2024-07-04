"use client";

import { Pokemon } from "@/types/pokemontypes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("/api/pokemons");
        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 flex items-center justify-center">
        포켓몬 도감
      </h1>
      <ul className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-black rounded-lg shadow-md overflow-hidden border-2 hover:border-gray-700"
          >
            <Link href={`/${pokemon.id}`}>
              <div className="flex items-center justify-center">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {pokemon.korean_name}
                </h2>
                <p className="text-gray-300">도감번호: {pokemon.id}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PokemonList;
