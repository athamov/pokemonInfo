import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PokemonClient } from 'pokenode-ts';
import { NamedAPIResource } from '../interface/NamedAPIResource'
import InfoCard from './InfoCard'

const Dashboard = ()=> {
  const [pokeList, setPokeList] = useState<NamedAPIResource[]>([]);
  const [input,setInput] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [pageNumber,setPageNumber] = useState<number>(20);

  useEffect(() =>{
    if(isFetching) {
    const api = new PokemonClient();
    api
      .getPokemonByName(`?offset=${pageNumber}`)
      .then((data:any) => {
        setPokeList(pokeList =>[...pokeList,...data.results]);
        setPageNumber(precState=>precState+20)
      })
      .catch((error) => console.error(error)) 
      .finally(() =>{
        setIsFetching(false);
      })
    }
  },[isFetching])

  const onScroll=(e:any)=>{
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop+window.innerHeight) < 100){
      setIsFetching(true)
    }
  }

  useEffect(() =>{
    document.addEventListener('scroll', onScroll)
    return ()=>document.removeEventListener('scroll', onScroll)
  })

   const handleChange = (even:any) => {
    setInput(even.target.value);
  };

  return (
    <>
    <div className="container my-12 mx-auto px-4 md:px-12" id="pokelist">
      <form id="search">   
        <label htmlFor="defaultSearch" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="defaultSearch" className="input" placeholder="search pokemons ex:ditto" required value={input} onChange={handleChange}
          />
          <Link to={{
            pathname:'/info', 
            search: `${input}`
            }} 
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            > Search 
            </Link>
        </div>
      </form> 
      <ul className="flex flex-wrap -mx-1 lg:-mx-3">
      {pokeList?.map(( pokemon ) => <li key={pokemon.name} className="my-1 px-1 w-full md:justify-center md:w-96 lg:my-4 lg:px-4 lg:w-1/2"> <InfoCard pokemon={pokemon.name}/> </li> )}
    </ul>
    </div>
    </>
  )
}

export default Dashboard;