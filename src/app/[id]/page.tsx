import axios from "axios";
import { Pokemon } from "@/types/pokemontypes";
import Image from "next/image";
import { notFound } from "next/navigation";

const fetchPokemonData = async (id: string): Promise<Pokemon | null> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/pokemons/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};

const PokemonDetailPage = async ({ params }: { params: { id: string } }) => {
  const pokemon = await fetchPokemonData(params.id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className=" flex items-center justify-center text-3xl font-bold mb-4">
        {pokemon.korean_name}
      </h1>
      <div className="grid gap-4">
        <div className="flex items-center justify-center">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={96}
            height={96}
          />
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">기본 정보</h2>
          <p>ID: {pokemon.id}</p>
          <p>키: {pokemon.height}</p>
          <p>몸무게: {pokemon.weight}</p>
          <h2 className="text-xl font-bold mt-4 mb-2">타입</h2>
          <ul>
            {pokemon.types.map((type) => (
              <li key={type.type.name}>{type.type.korean_name}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4 mb-2">능력</h2>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.korean_name}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4 mb-2">기술</h2>
          <ul className="flex flex-wrap gap-2">
            {pokemon.moves.map((move) => (
              <li key={move.move.name}>{move.move.korean_name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <a href="/" className="text-blue-500 underline">
          돌아가기
        </a>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
