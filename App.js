import { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemonsearchcomponent from './components/Pokemonsearchcomponent';
import Pokemondetails from './components/Pokemondetails';
import Pagination from './components/Pagination';
import Loadingscreen from './components/Loadingscreen';
import { GiHighGrass , GiWaterSplash , GiCampfire , GiPoisonBottle , GiSteelClaws ,
  GiStoneSphere , GiDragonHead , GiFairy , GiSnowman , GiMuscleUp , GiUndergroundCave ,
   GiGhost , GiArrowWings , GiDevilMask , GiPsychicWaves , GiLadybug , GiElectric , GiAbstract039} from "react-icons/gi";



const pokemonColors = {
  grass:['rgb(34,139,34)',<GiHighGrass className='icon' style={{color:'rgb(34,139,34)'}}/>],
  water:['rgb(28,163,236)', <GiWaterSplash className='icon' style={{color:'rgb(30,144,255)'}}/> ],
  fire:['#ff4500',<GiCampfire className='icon' style={{color:'#ff4500'}}/>],
  ice:['#DBF1FD',<GiSnowman className='icon' style={{color:'#DBF1FD'}}/> ],
  electric:['#f8d030',<GiElectric className='icon' style={{color:'#f8d030'}}/>],
  normal:['#ff7f50',<GiAbstract039 className='icon' style={{color:'#ff7f50'}}/>],
  poison:['#0F5E9C',<GiPoisonBottle className='icon' style={{color:'#0F5E9C'}}/>],
  flying:['rgb(210,105,30)', <GiArrowWings className='icon' style={{color:'rgb(210,105,30)'}}/>],
  dark:['rgb(53,56,57)',<GiDevilMask className='icon' style={{color:'rgb(53,56,57)'}}/>],
  psychic:['#191970',<GiPsychicWaves className='icon' style={{color:'#191970'}}/>],
  bug:['rgb(160,82,45)',<GiLadybug className='icon' style={{color:'rgb(160,82,45)'}}/>],
  ghost:['#483D8B',<GiGhost className='icon' style={{color:'#483D8B'}}/>],
  fighting:['#c03028',<GiMuscleUp className='icon' style={{color:'#c03028'}}/>],
  steel:['#87898C',<GiSteelClaws className='icon' style={{color:'#87898C'}}/>],
  rock:['#2f4f4f',<GiStoneSphere className='icon' style={{color:'#2f4f4f'}}/>],
  ground:['#800000',<GiUndergroundCave className='icon' style={{color:'#800000'}}/>],
  fairy:['rgb(209, 194, 254)',<GiFairy className='icon' style={{color:'rgb(209, 194, 254)'}}/>],
  dragon:['#696969',<GiDragonHead className='icon' style={{color:'#696969'}}/>]
}


function App() {
  const [pokemonid,setPokemonid] = useState(1)
  const [pokemonNames, setPokemonNames] = useState([])
  const [loading, setLoading] = useState(true)
  const [pokemonDetails, setPokemonDetails] = useState({
    name: '',
    type: '',
    image: '',
    icon: '',
    color: '',
    height: 0,
    weight: 0,
    abilities: [],
    moves: []
  })
  const [searchItem, setSearchItem] = useState('')

  useEffect(() => {
    setLoading(true)
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(res => {
      let x = [];
      res.data.results.forEach(element => {
        x.push(element.name)
      });
      setPokemonNames([...x])
      setLoading(false)
    })
  },[])

  useEffect(() => {
    setLoading(true)
    console.log(pokemonid)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonid}`).then(res => {
      setLoading(false)
      setPokemonDetails({
        name: res.data.forms[0].name,
        type: res.data.types[0].type.name,
        color: pokemonColors[res.data.types[0].type.name][0],
        icon: pokemonColors[res.data.types[0].type.name][1],
        height: res.data.height,
        weight: res.data.weight,
        abilities: res.data.abilities.map(p => p.ability.name),
        moves: res.data.moves.map(p => p.move.name),
        image: (res.data.sprites.other.home.front_default) ? res.data.sprites.other.home.front_default : res.data.sprites.other.dream_world.front_default 
      })
    })
  }, [pokemonid])

  function gotoNextPage() {
    // console.log(pokemonNames)
    setPokemonid(prevCount => {
      if(prevCount > 10249){
        return 10249
      }else if(prevCount === 905){
        return 10001
      }else{
        return prevCount + 1
      }
    }) 
  }

  function gotoPrevPage() {
    setPokemonid(prevCount => {
      if(prevCount <= 1){
        return 1
      }else if(prevCount === 10001){
        return 905
      }
      else{
        return prevCount - 1
      }
    }) 
  }

  function searchBar(val){
    let x = pokemonNames.indexOf(val) + 1
    setPokemonid((x <= 905)? x : (x + 9095))
    setSearchItem('')
  }



  if (loading) return (<Loadingscreen />)
  
  return (

    <div className='container'>

        <h1 className='heading'>POKEDEX</h1>

        <Pokemonsearchcomponent 
                searchItem={ searchItem } 
                pokemonNames={pokemonNames}
                setSearchItem={setSearchItem}
                searchBar={searchBar}   />
          
        <Pokemondetails pokemonDetails={pokemonDetails} />

        <Pagination
                gotoNextPage={pokemonid < 10249 ? gotoNextPage : null}
                gotoPrevPage={pokemonid > 1 ? gotoPrevPage : null}  />    
    </div>
  );
}

export default App;