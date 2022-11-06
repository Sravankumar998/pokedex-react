const Loadingscreen = () => {
  return (
    <div>
        <div className='loading-container'>
            <img className='img' src={require('./chimmunk.gif')} alt='loading-animation' />
            <h1>LOADING...</h1>
        </div>
    </div>
  )
}

export default Loadingscreen