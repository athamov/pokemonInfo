import { NamedAPIResource } from './NamedAPIResource'
import { PokemonHeldItemVersion } from './PokemonHeldItemVersion'

export interface PokemonHeldItem {
  /** The item the referenced Pokémon holds */
  item: NamedAPIResource;
  /** The details of the different versions in which the item is held */
  version_details: PokemonHeldItemVersion[];
}