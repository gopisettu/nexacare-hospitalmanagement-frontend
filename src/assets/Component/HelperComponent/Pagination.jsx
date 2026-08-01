function Pagination({page,setPage}){
    
    return(<div className="row">
<nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item"><a className="page-link" onClick={()=>page>0?setPage(page-1):setPage(0)}>Previous</a></li>
    <li className="page-item"><a className="page-link" onClick={()=>setPage(0)}>1</a></li>
    <li className="page-item"><a className="page-link" onClick={()=>setPage(1)}>2</a></li>
    <li className="page-item"><a className="page-link" onClick={()=>setPage(2)}>3</a></li>
    <li className="page-item"><a className="page-link" onClick={()=>setPage(page+1) }>Next</a></li>
  </ul>
</nav>
</div>)
    
}
export default Pagination;