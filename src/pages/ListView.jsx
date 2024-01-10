import { useSelector } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from "react-paginate";
import { useState } from "react";



const ListView =({openModal})=>{
    const state = useSelector((store) =>store)
    //gösterilecek ilk eleman
    const [itemOffset, setItemOffset] = useState(0);
// sayfa başına gösterilecek eleman sayısı
    const itemsPerPage =10
    //gösterilecek son eleman
    const endOffset = itemOffset + itemsPerPage;
 //elimizdeki aralığa göre verileri kes
  const currentItems = state.flights.slice(itemOffset, endOffset);

  //toplam sayfa sayısı
  const pageCount = Math.ceil(state.flights.length / itemsPerPage);

 //her sayfa değiştiğinde çalışır
  const handlePageClick = (event) => {
    //gösterilecek ilk eleman
    const newOffset = (event.selected * itemsPerPage) 
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
//state i günceller
    setItemOffset(newOffset);
  };
    return (
        <div className="p-4">
            <table className="table table-dark table-hover mt-5 table-responsive">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Kuyruk Kodu</th>
                        <th>Enlem</th>
                        <th>Boylam</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((i)=> ( 
                             <tr>
                            <td>{i.id}</td>
                            <td>{i.code}</td>
                            <td>{i.lat}</td>
                            <td>{i.lng}</td>
                            <td>
                                <button onClick={()=>openModal(i.id)}>Detay</button>
                            </td>
                            
                        </tr>
                        ))}

                </tbody>
            </table>
            <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        className="pagination"
       
      />
        </div>
    )

}
export default ListView