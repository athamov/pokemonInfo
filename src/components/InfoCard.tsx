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
      <div className="relative w-48 h-48 mx-auto">
        <img className=" w-48 h-48 shadow-sm" src={pokeData?.sprites.other?.dream_world.front_default} alt={pokeData?.name} />
        <div className={"absolute top-0 right-0 h-6 w-6 my-1 border-4 border-white rounded-full z-2 " + typeColor?.[0]}></div>
      </div>
      <div className={"rounded-t-lg " + typeColor?.[0]}>
      <Link to={{
          pathname:'/info', 
          search: `${pokeData?.name}`
        }}>
        <header className={"items-center justify-between leading-tight p-2 md:p-4 drop-shadow-md hover:drop-shadow-xl " + typeColor?.[1] + typeColor?.[2]}>
          <h5 className="text-lg mb-3 text-center">{pokeData?.name}</h5>
          <div className="text-gray-darker flex flex-1">
          <p className="text-grey-darker text-sm text-left w-1/3">
            hp: <strong>{stats[0]}</strong>
            <br />
            xp: <strong>{stats[1]}</strong>
            <br />
            defense: <strong>{stats[2]}</strong>
          </p>
          <p className="text-grey-darker text-sm text-right w-2/3">
            special-attack: <strong>{stats[3]}</strong>
            <br />
            special-defense:<strong>{stats[4]}</strong>
            <br />
            speed: <strong>{stats[5]}</strong>
          </p>
          </div>
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