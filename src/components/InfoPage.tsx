import React,{ useState, useEffect} from 'react'
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../interface/IPokemon'
import { useLocation,Link } from 'react-router-dom'
import './infoPage.css'

const InfoPage:React.FC = () => {
  const [pokeData, setPokeData] = useState<Pokemon>();
  const location = useLocation();  

  useEffect(() =>{
    let name = location.search.replace('?','');
    if(!pokeData) fetchPokemonData(name)
  },[pokeData,location])


  const fetchPokemonData = async (request:string) => {
    const api = new PokemonClient();
    console.log(request);
    await api
      .getPokemonByName(request)
      .then((data:any) => setPokeData(data))// will output "Luxray"
      .catch((error:any) => console.error(error));
   }

  return (
    <div className="card font-zen-antique">
      <nav className="container flex flex-wrap justify-center items-center mx-auto">
        <div>
          <Link to="/dashboard" className="flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png?20161126061739" alt="Pokebola" className="mr-3 h-6 sm:h-9"/>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-orange-700">Athamov's Pokemon</span>
          </Link>
        </div>
      </nav>

      <div className="display">
        <div className="dis-content">
          <h4 className="content-title font-zen-antique">{pokeData?.name}</h4>
          <div className="card-image">
            <img src={pokeData?.sprites.other?.dream_world.front_default || pokeData?.sprites.front_default} alt={pokeData?.name} className="image"/>
          </div>
        </div>
        <div className="card-content font-zen-antique">
          <div className="content">
            <h4 className="card-des ">{pokeData?.types[0].type.name}</h4>
            <h4 className="stats-title">Stats</h4>
            <div className="card-stats">
              <ul>
                <li>height: <strong>{pokeData?.height}</strong></li> 
                <li>hp: <strong>{pokeData?.stats[0].base_stat}</strong></li>
                <li>attack: <strong>{pokeData?.stats[1].base_stat}</strong></li>
                <li>defense: <strong>{pokeData?.stats[2].base_stat}</strong></li> 
                <li>special-atack: <strong>{pokeData?.stats[3].base_stat}</strong></li>
                <li>special-defense: <strong>{pokeData?.stats[4].base_stat}</strong></li>
                <li>speed: <strong>{pokeData?.stats[5].base_stat}</strong></li>
                <li>base experience: <strong>{pokeData?.base_experience}</strong></li>
              </ul>
              <ul className="stats-list">
                <li className="flex">
                <div className="mx-4 w-3/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded" style={{"width": pokeData?.weight+"%"}}></div>
                </div>
              </li>
              <li className="flex">
              <div className="mx-4 w-3/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded" style={{"width": pokeData?.height+"%"}}></div>
                </div>
              </li>
              <li className="flex">
              <div className="mx-4 w-3/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded" style={{"width": pokeData?.stats[0].base_stat+"%"}}></div>
                </div>
              </li>
              <li className="flex">
                <div className="mx-4 w-3/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded" style={{"width": pokeData?.stats[1].base_stat+"%"}}></div>
                </div>
              </li>
              <li className="flex">
               <div className="mx-4 w-3/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded" style={{"width": pokeData?.stats[2].base_stat+"%"}}></div>
                </div>
              </li>
              <li className="flex">
                <div className="mx-4 w-3/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded" style={{"width": pokeData?.stats[3].base_stat+"%"}}></div>
                </div>
              </li>
              <li className="flex">
                <div className="mx-4 w-3/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded" style={{"width": pokeData?.stats[4].base_stat+"%"}}></div>
                </div>
              </li>
              <li className="flex">
                <div className="mx-4 w-3/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded" style={{"width": pokeData?.stats[5].base_stat+"%"}}></div>
                </div>
              </li>
              </ul>

          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default InfoPage;