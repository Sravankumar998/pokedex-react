

function Pokemonsearchcomponent({pokemonNames , searchItem , searchBar , setSearchItem}) {
  return (
    <div className='search-component'>
            <input className='search-bar' type='search' placeholder='Search...' onChange={event => {setSearchItem(event.target.value)}} />
            <div className='search-list'>
                { pokemonNames.filter((val) => {
                  if(searchItem === ''){
                    return ''
                  }else if(val.toLowerCase().includes(searchItem.toLowerCase())){
                    return val
                  }else {return ''}
                  })
                .map((val , key) => {
                  return (
                    <span onClick={() => {searchBar(val)}} className='search-name' key={key}>{val.toUpperCase()}</span>
                  )
                })}
            </div>
        </div>
  )
}

export default Pokemonsearchcomponent