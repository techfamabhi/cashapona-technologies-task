
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddData() {
    const navigate = useNavigate();

    const [ranches, setRanches] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [areaSize, setAreaSize] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        const regExp = /^[A-Za-z ]+$/;
        const regnumExp = /^[0-9]{10}$/;
        const emailExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!name) tempErrors.name = 'Required';

        if (!description) tempErrors.description = 'Required';

        if (!areaSize) tempErrors.areaSize = 'Required';

        if (!contactPerson) tempErrors.contactPerson = 'Required';

        if (!email) tempErrors.email = 'Required';
        else if (!emailExp.test(email)) tempErrors.email = 'Invalid Email Format';

        if (!phoneNumber) tempErrors.phoneNumber = 'Required';
        else if (!regnumExp.test(phoneNumber)) tempErrors.phoneNumber = 'Must be a 10 digit number';


        if (!city) tempErrors.city = 'Required';

        if (!state) tempErrors.state = 'Required';

        if (!zipCode) tempErrors.zipCode = 'Required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleAddData = (e) => {
        e.preventDefault();
        if (validate()) {
            const ranchData = {
                name,
                description,
                areaSize,
                contactPerson,
                email,
                phoneNumber,
                city,
                state,
                zipCode,
                additionalDetails,
            };

            setRanches([...ranches, ranchData]);

            // Store data in localStorage
            const storedData = JSON.parse(localStorage.getItem('ranchData')) || [];
            storedData.push(ranchData);
            localStorage.setItem('ranchData', JSON.stringify(storedData));

            // Clear form fields after submission
            setName('');
            setDescription('');
            setAreaSize('');
            setContactPerson('');
            setEmail('');
            setPhoneNumber('');
            setCity('');
            setState('');
            setZipCode('');
            setAdditionalDetails('');

           alert('New Ranch Added Successfully!!!');
            navigate('/');
        }
    };

    return (
        <div className="container-fluid">
            
            <div className="row">
                <Sidebar />
                <div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay" />
                <div className="col-md-9 col-lg-10 ml-md-auto px-0">
                    <TopNav />
                    <h2 className='heading1'>Add Ranch</h2>
                    <main className="container card main-card-data">
                        <form onSubmit={handleAddData}>
                            <section className="row card-body">
                                <div className="form-group col-md-4">
                                    <label>Name</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Description</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    {errors.description && <span className="text-danger">{errors.description}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Area Size</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Area Size" value={areaSize} onChange={(e) => setAreaSize(e.target.value)} />
                                    {errors.areaSize && <span className="text-danger">{errors.areaSize}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Contact Person</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Contact Person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                                    {errors.contactPerson && <span className="text-danger">{errors.contactPerson}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Email</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Phone Number</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>City</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                                    {errors.city && <span className="text-danger">{errors.city}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>State</label>
                                    <select className="form-control bg-color1" value={state} onChange={(e) => setState(e.target.value)}>
                                        <option>Select State</option>
                                        <option>Andhra Pradesh</option>
                                        <option>Arunachal Pradesh</option>
                                        <option>Haryana</option>
                                        <option>Assam</option>
                                        <option>Nagaland</option>
                                        <option>Himachal Pradesh</option>
                                        <option>Maharashtra</option>
                                        <option>Rajasthan</option>
                                        <option>Uttar Pradesh</option>
                                        <option>Arizona</option>
                                        <option>New Jersey</option>
                                        <option>Motena</option>
                                    </select>
                                    {errors.state && <span className="text-danger">{errors.state}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Zip Code</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                    {errors.zipCode && <span className="text-danger">{errors.zipCode}</span>}
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Additional Details</label>
                                    <textarea className="form-control bg-color1" placeholder='Enter Additional Details' value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} rows="3"></textarea>
                                </div>
                                <div className="form-group col-md-12 add-ranch-btn">
                                    <button type="submit" className="btn btn-primary">Add Ranch</button>
                                <Link to="/add-ranch">    <button type="submit" className="btn btn-primary mx-3">Cancel</button>
                                </Link>
                                </div>
                            </section>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AddData;