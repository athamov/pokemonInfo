import React,{ useState, useEffect} from 'react'
import { PokemonClient } from 'pokenode-ts';
import { Carousel } from 'flowbite-react'
import { Pokemon } from '../interface/IPokemon'
import { useLocation,Link } from 'react-router-dom'
import { colors } from './colors'
import './infoPage.css'

const InfoPage:React.FC = () => {
  const [pokeData, setPokeData] = useState<Pokemon>();
  const [pokeType,setPokeType] = useState<string[]>([]);
  const [typeColor,setTypeColor] = useState<string[]>([])
  const [stats,setStats] = useState<number[]>([])
  const location = useLocation();  

  useEffect(() =>{
    let name = location.search.replace('?','');
    if(!pokeData) fetchPokemonData(name)
  },[pokeData,location])

  useEffect(() =>{
    if(pokeData) {
      setPokeType(pokeData.types.map(type => type.type.name));
      setStats(pokeData.stats.map(stat => stat.base_stat));
      console.log(pokeData);
    }
  },[pokeData]);

  useEffect(() =>{
    if(pokeType) setTypeColor(colors[pokeType[0]])
  },[pokeType])

  const fetchPokemonData = async (request:string) => {
    const api = new PokemonClient();
    console.log(request);
    await api
      .getPokemonByName(request)
      .then((data:any) => setPokeData(data))// will output "Luxray"
      .catch((error) => console.error(error));
   }

  return (
    <div className="container">
      <nav className="container flex flex-wrap justify-between items-center mx-auto">
        <div>
          <Link to="dashboard" className="flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png?20161126061739" alt="Pokebola" className="mr-3 h-6 sm:h-9"/>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-orange-700">Athamov's Pokemon</span>
          </Link>
        </div>
      </nav>

      <div className={"flex justify-between border-b pb-8 px-4 m-5 x-auto " + typeColor?.[2]}>
          <h1 className="font-semibold text-2xl">{pokeData?.name}</h1>
          <h2 className="font-semibold text-2xl">{pokeType[0]}</h2>
      </div>
      <div className="w-full flex">
        <div className="px-4 w-128 h-128">
            <Carousel slideInterval={5000}>
              <img src={pokeData?.sprites.front_default} className="max-w-full max-h-full border-none rounded-full shadow-2xl align-middle mx-auto" alt={pokeData?.name}/>
              <img src={pokeData?.sprites.back_default} className="max-w-full max-h-full border-none rounded-full shadow-2xl align-middle mx-auto" alt={pokeData?.name}/>
              <img src={pokeData?.sprites.front_shiny} className="max-w-full max-h-full border-none rounded-full shadow-2xl align-middle mx-auto" alt={pokeData?.name}/>
              <img src={pokeData?.sprites.back_shiny} className="max-w-full max-h-full border-none rounded-full shadow-2xl align-middle mx-auto" alt={pokeData?.name}/>
            </Carousel>
          </div>
        <div className="px-4 w-1/2 sm:w-full text-right">
              <h2 className="w-2/3 align-center justify-center">
                Stats
              </h2>
              <p className="w-2/3">
                weight: <strong>{pokeData?.weight}</strong>
              </p>
              <p className="w-2/3">
                height: <strong>{pokeData?.height}</strong>
              </p>
              <p className="w-2/3">
                hp: <strong>{pokeData?.stats[0].base_stat}</strong>
              </p>
              <p className="w-2/3">
                attack: <strong>{pokeData?.stats[1].base_stat}</strong>
              </p>
              <p className="w-2/3">
                defense: <strong>{pokeData?.stats[2].base_stat}</strong>
              </p>
              <p className="w-2/3">
                special-atack: <strong>{pokeData?.stats[3].base_stat}</strong>
              </p>
              <p className="w-2/3">
                special-defense: <strong>{pokeData?.stats[4].base_stat}</strong>
              </p>
              <p className="w-2/3">
                speed: <strong>{pokeData?.stats[5].base_stat}</strong>
              </p>
              <p className="w-2/3">
                base experience: <strong>{pokeData?.base_experience}</strong>
              </p>
        </div>
      </div>
    </div>
  )
}

export default InfoPage