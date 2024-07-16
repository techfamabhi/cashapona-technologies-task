import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

function DisplayRanch() {
    const [ranchData, setRanchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of records per page

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('ranchData')) || [];
        setRanchData(storedData);
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ranchData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay" />
                    <div className="col-md-9 col-lg-10 ml-md-auto px-0">
                        <TopNav />
                        <div class="row d-flex justify-content-between align-items-center button-left-right">
  <h2 class="heading1"><span className='color1'>Demo</span>Book Dashboard</h2>
<b>  <Link to="/add-ranch" class="btn button-color">Add Ranch</Link>
</b>
</div>
                        <main className="container">
                            <section className="row mt-4">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ranch name</th>
                                            <th scope="col">Contact Name</th>
                                            <th scope="col">Contact Number</th>
                                            <th scope="col">Contact Email</th>
                                            <th scope="col">City</th>
                                            <th scope="col">State</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       

                                        {currentItems.map((ranch, index) => (
                                            <tr key={index}>
                                                <td>{ranch.name}</td>
                                                <td>{ranch.contactPerson}</td>
                                                <td>{ranch.phoneNumber}</td>
                                                <td>{ranch.email}</td>
                                                <td>{ranch.city}</td>
                                                <td>{ranch.state}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                            <div className="row mt-4">
                                <div className="col-sm-6">
                                 <b>   Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, ranchData.length)} of {ranchData.length} entries
                                 </b>
                                </div>
                                <div className="col-sm-6">
                                <ul className="pagination justify-content-end">
                                        {Array(Math.ceil(ranchData.length / itemsPerPage)).fill().map((_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DisplayRanch;
