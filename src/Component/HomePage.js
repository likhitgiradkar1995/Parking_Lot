import React, { useState } from 'react';
import { NavItem, Button, Navbar } from 'react-bootstrap';
import styles from '../Css/styles.module.css';


function HomePage(props) {
    const [parking_space, setparking_space] = useState(0);
    let [parking_slot, setparking_slot] = useState(0);

    const allocateParking = () => {
        props.history.push({ pathname: '/Parking_Main',parkingSpace:parking_space,parkingSlot:parking_slot });
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" ></Navbar.Brand>
                <NavItem className="mr-auto">
                    <h3 style={{ color: 'white' }} variant="outline-info">Welcome to Car Parking Lot</h3>
                </NavItem>
            </Navbar>
            <br />

            <form className={styles.authinner} onSubmit={allocateParking}>
                <h3>Parking Lot</h3>

                <div className="form-group">
                    <label>Parking Space</label>
                    <input type="number" className="form-control" min="1" placeholder="Enter parking spaces"
                        value={parking_space} onChange={e => setparking_space(parseInt(e.target.value))} />
                </div>

                <div className="form-group">
                    <label>Parking slots</label>
                    <input type="number" className="form-control" placeholder="Enter parking slots"
                        value={parking_slot} onChange={e => setparking_slot(parseInt(e.target.value))} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    )
}

export default HomePage



