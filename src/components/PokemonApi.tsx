import React, { useState, useEffect } from 'react'
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../interface/IPokemon'

function PokemonApi() {
  const [data, setData ] = useState<Pokemon|undefined>();

  useEffect(() =>{
   const getData = async () => {
    const api = new PokemonClient();
  
    await api
      .getPokemonByName('luxray')
      .then((data:any) => setData(data)) // will output "Luxray"
      .catch((error) => console.error(error));
   }
   getData();
    console.log(data)
  },[])
  return (
    <div>Pokemon</div>
  )
}

export default PokemonApi;