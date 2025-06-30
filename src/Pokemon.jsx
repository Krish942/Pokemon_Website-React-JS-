import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Filtering by name
  const filteredBySearch = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  // Filter by Type
  const filteredByType =
    selectedType === "all"
      ? filteredBySearch
      : filteredBySearch.filter((curPokemon) =>
          curPokemon.types.some((t) => t.type.name === selectedType)
        );

  // Sort Pokémon
  const sortedPokemon = [...filteredByType].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedPokemon.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedPokemon.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return <h1>Loading...2222hsshsh.</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  // Extract unique types
  const allTypes = [
    ...new Set(
      pokemon.flatMap((p) => p.types.map((t) => t.type.name))
    ),
  ];

  return (
    <section className="container">
      <header>
        <h1> hey I am Pokeimon</h1>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort A - 888</option>
          <option value="desc">Sort Z - A</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <ul className="cards">
        {currentItems.map((curPokemon) => (
          <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
        ))}
      </ul>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Pokemon;
