

function Pokemondetails({ pokemonDetails }) {
  return (
    <div className='pokemon-details'> 
            <div className='card' style={{borderColor: 'black' }}>          
                <span className="poke-name">{pokemonDetails.name.toUpperCase()}</span>
                <span className='type'>TYPE</span>
                <span className='type-name'>{pokemonDetails.type.toUpperCase()}</span>
                <span className='height'>HEIGHT</span>
                <span className='height-value'>{(pokemonDetails.height * 0.1).toFixed(2)} m</span>
                <span className='weight'>WEIGHT</span>
                <span className='weight-value'>{(pokemonDetails.weight * 0.1).toFixed(2)} kgs</span>
                <div className='abilities'>ABILITIES</div>
                <div className='move-names'>
                {pokemonDetails.abilities.map((val , key) => {
                  return (<li key={key}>{val.toUpperCase()}</li>)
                })}</div>
                {pokemonDetails.icon}
            </div>
            <div className='image-container' style={{borderColor: pokemonDetails.color }}>
                  <img className='img' src={pokemonDetails.image} alt='pokemon_image'/>
                  {pokemonDetails.icon}
            </div>         
        </div>
  )
}

export default Pokemondetails