export default function Pagination({ gotoNextPage , gotoPrevPage }) {
  return (
    <div className='buttons'>
      {gotoPrevPage && <button className="btn btn1" onClick={gotoPrevPage}>PREVIUS</button>}
      {gotoNextPage && <button className="btn btn2" onClick={gotoNextPage}>NEXT</button>}
    </div>
    
  )
}