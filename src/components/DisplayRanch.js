import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import DataTable from 'react-data-table-component';

function DisplayRanch() {
    const [ranchData, setRanchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of records per page

    const customStyles = {
        table: {
            style: {
                border: '1px solid #ddd'
            }
        },
        headRow: {
            style: {
                backgroundColor: 'white',
                color: 'black',
                borderBottom: '1px solid #ddd'
            }
        },
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'uppercase',
                borderBottom: '1px solid #ddd'
            }
        },
        cells: {
            style: {
                fontSize: '15px',
                borderBottom: '1px solid #ddd'
            }
        }
    };

    const columns = [
        {
            name: 'Ranch Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Contact Name',
            selector: row => row.contactPerson,
            sortable: true
        },
        {
            name: 'Contact Number',
            selector: row => row.phoneNumber
        },
        {
            name: 'Contact Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true
        },
        {
            name: 'State',
            selector: row => row.state,
            sortable: true
        }
    ];

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('ranchData')) || [];
        setRanchData(storedData);
       // console.log(storedData)
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    console.log('indexOfLastItem',indexOfLastItem); //4
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    console.log('indexOfFirstItem',indexOfFirstItem); //0
    const currentItems = ranchData.slice(indexOfFirstItem, indexOfLastItem);  //4
console.log('currentItems',currentItems);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay" />
                    <div className="col-md-9 col-lg-10 ml-md-auto px-0">
                        <TopNav />
                        <div className="row d-flex justify-content-between align-items-center button-left-right">
                            <h2 className="heading1"><span className='color1'>Demo</span>Book Dashboard</h2>
                            <Link to="/add-ranch" className="btn button-color">Add Ranch</Link>
                        </div>
                        <main className="container">
                            <section className="row mt-4">
                                <DataTable
                                    columns={columns}
                                    data={currentItems}
                                    customStyles={customStyles}
                                   
                                />
                            </section>
                            <div className="row mt-4">
                                <div className="col-sm-6">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, ranchData.length)} of {ranchData.length} entries
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