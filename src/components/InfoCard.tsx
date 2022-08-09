import React, {useState, useEffect} from 'react'
import { PokemonClient } from 'pokenode-ts';
import { Link } from 'react-router-dom'
import { Pokemon } from '../interface/IPokemon'
import { colors } from './colors'

type IProps = {
  pokemon:string
}



const InfoCard:React.FC<IProps> = ( props:IProps ) =>{
  const [pokeData,setPokeData] = useState<Pokemon>();
  const [pokeType,setPokeType] = useState<string[]>([]);
  const [typeColor,setTypeColor] = useState<string[]>([])
  const [stats,setStats] = useState<number[]>([])

  useEffect(() =>{
    fetchPokemonData(props.pokemon)
  },[])

  useEffect(() =>{
    if(pokeData) { 
      setPokeType(pokeData.types.map(type => type.type.name));
      setStats(pokeData.stats.map(stat => stat.base_stat));
      console.log(pokeData)
    }
  },[pokeData])

  useEffect(() =>{
    if(pokeType) setTypeColor(colors[pokeType[0]])
  },[pokeType])
  
  async function fetchPokemonData(request: string) {
    const api = new PokemonClient();

    await api
      .getPokemonByName(request)
      .then((data: any) => setPokeData(data)) // will output "Luxray"
      .catch((error) => console.error(error));
  }

  return (
    <article className="overflow-hidden rounded-lg shadow-lg">
      <div className="relative w-24 h-24 mx-auto">
        <img className="rounded-full border border-gray-100 shadow-sm" src={pokeData?.sprites.front_shiny} alt={pokeData?.name} />
        <div className={"absolute top-0 right-0 h-6 w-6 my-1 border-4 border-white rounded-full z-2 " + typeColor?.[0]}></div>
      </div>
      <div className={"rounded-t-lg " + typeColor?.[0]}>
      <Link to={{
          pathname:'/info', 
          search: `${pokeData?.name}`
        }}>
        <header className={"items-center justify-between leading-tight p-2 md:p-4 drop-shadow-md hover:drop-shadow-xl " + typeColor?.[1] + typeColor?.[2]}>
          <h5 className="text-lg mb-3 text-center">{pokeData?.name}</h5>
          <p className="text-grey-darker text-sm text-right">
            hp/attack/defense/special-attack/special-defense/speed
          </p>
          <p className="text-grey-darker text-sm text-right">
            {stats[0]+" / "+stats[1]+" / "+stats[2]+" / "+stats[3]+" / "+stats[4]+" / "+stats[5]}
          </p>
        </header>
          <div className="flex items-center justify-between leading-none p-2 md:p-4 drop-shadow-md">
            <span className="ml-2 text-sm text-white">{pokeType[0]}</span>
          </div>
        </Link>
        </div>
</article>
  )
}

export default InfoCard

{/* <div>
    <img src={pokeData?.sprites.front_default} alt={pokeData?.name}/>
    <Link to={{
      pathname:'info', 
      search: `${pokeData?.name}`
    }}> go to info of {pokeData?.name}</Link>
    </div> */}

    // <div className="flex items-center mt-2.5 mb-5">
    //     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    //     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    //     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    //     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    //     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    //         <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
    //     </div>