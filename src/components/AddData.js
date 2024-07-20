import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { Link, useNavigate } from 'react-router-dom';

function AddData() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        areaSize: '',
        contactPerson: '',
        email: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
        additionalDetails: ''
    });

    const [ranches, setRanches] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        const regnumExp = /^[0-9]{10}$/;
        const emailExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
       const stringWithSpace = /^[a-zA-Z\s]*$/;


        if (!formData.name) tempErrors.name = 'Required';
        else if (!stringWithSpace.test(formData.name)) tempErrors.name = 'Invalid name Format accept only string';

        if (!formData.description) tempErrors.description = 'Required';
        if (!formData.areaSize) tempErrors.areaSize = 'Required';
        if (!formData.contactPerson) tempErrors.contactPerson = 'Required';
        else if (!stringWithSpace.test(formData.contactPerson)) tempErrors.contactPerson = 'Invalid contactPerson Format accept only string';
        if (!formData.email) tempErrors.email = 'Required';
        else if (!emailExp.test(formData.email)) tempErrors.email = 'Invalid Email Format';
        if (!formData.phoneNumber) tempErrors.phoneNumber = 'Required';
        else if (!regnumExp.test(formData.phoneNumber)) tempErrors.phoneNumber = 'Must be a 10 digit number';
        if (!formData.city) tempErrors.city = 'Required';
        else if (!stringWithSpace.test(formData.city)) tempErrors.city = 'Invalid city Format accept only string';

        if (!formData.state) tempErrors.state = 'Required';
        if (!formData.zipCode) tempErrors.zipCode = 'Required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    const handleAddData = (e) => {
        e.preventDefault();
        if (validate()) {
            const storedData = JSON.parse(localStorage.getItem('ranchData')) || [];
            
            // Check if email already exists
            const emailExists = storedData.some(ranch => ranch.email === formData.email);
            if (emailExists) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    email: 'Email ID already registered'
                }));
                return;
            }

            const newRanch = { ...formData };
            setRanches([...ranches, newRanch]);

            // Store data in localStorage
            storedData.push(newRanch);
            localStorage.setItem('ranchData', JSON.stringify(storedData));

            // Clear form fields after submission
            setFormData({
                name: '',
                description: '',
                areaSize: '',
                contactPerson: '',
                email: '',
                phoneNumber: '',
                city: '',
                state: '',
                zipCode: '',
                additionalDetails: ''
            });

            alert('New Ranch Added Successfully!!!');
            navigate('/');
        }
    };

    // const handleAddData = (e) => {
    //     e.preventDefault();
    //     if (validate()) {
    //         const newRanch = { ...formData };

    //         setRanches([...ranches, newRanch]);

    //         // Store data in localStorage
    //         const storedData = JSON.parse(localStorage.getItem('ranchData')) || [];
    //         storedData.push(newRanch);
    //         localStorage.setItem('ranchData', JSON.stringify(storedData));

    //         // Clear form fields after submission
    //         setFormData({
    //             name: '',
    //             description: '',
    //             areaSize: '',
    //             contactPerson: '',
    //             email: '',
    //             phoneNumber: '',
    //             city: '',
    //             state: '',
    //             zipCode: '',
    //             additionalDetails: ''
    //         });

    //         alert('New Ranch Added Successfully!!!');
    //         navigate('/');
    //     }
    // };



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
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} />
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Description</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Description" name="description" value={formData.description} onChange={handleChange} />
                                    {errors.description && <span className="text-danger">{errors.description}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Area Size</label>
                                    <input type="number" className="form-control bg-color1" placeholder="Enter Area Size" name="areaSize" value={formData.areaSize} onChange={handleChange} />
                                    {errors.areaSize && <span className="text-danger">{errors.areaSize}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Contact Person Name</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
                                    {errors.contactPerson && <span className="text-danger">{errors.contactPerson}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Email</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Phone Number</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                                    {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>City</label>
                                    <input type="text" className="form-control bg-color1" placeholder="Enter City" name="city" value={formData.city} onChange={handleChange} />
                                    {errors.city && <span className="text-danger">{errors.city}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>State</label>
                                    <select className="form-control bg-color1" name="state" value={formData.state} onChange={handleChange}>
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
                                        <option>Montana</option>
                                    </select>
                                    {errors.state && <span className="text-danger">{errors.state}</span>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Zip Code</label>
                                    <input type="number" className="form-control bg-color1" placeholder="Enter Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                                    {errors.zipCode && <span className="text-danger">{errors.zipCode}</span>}
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Additional Details</label>
                                    <textarea className="form-control bg-color1" placeholder='Enter Additional Details' name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} rows="3"></textarea>
                                </div>
                                <div className="form-group col-md-12 add-ranch-btn">
                                    <button type="submit" className="btn btn-primary">Add Ranch</button>
                                    <Link to="/add-ranch">
                                        <button type="button" className="btn btn-primary mx-3">Cancel</button>
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