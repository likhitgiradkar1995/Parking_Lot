import React, { useEffect, useState } from 'react';
import { NavItem, Button, Navbar } from 'react-bootstrap';
import styles from '../Css/styles.module.css';
import parkingList from './parkingList';

function Parking_Main() {
    const [parking_space, setparking_space] = useState(0);
    let [parking_slot, setparking_slot] = useState(0);
    const [parkingData, setparkingData] = useState([]);
    const [updateFlag, setupdateFlag] = useState(false);
    const [filter, setfilter] = useState('');
    

    useEffect(() => {
        console.log("useeffect called");
        setupdateFlag(false);
    }, [updateFlag])

    const allocateParking = (e) => {
        e.preventDefault();
        if (parking_slot <= parking_space) {
            for (let i = 1; i <= parking_slot; i++) {
                let slotObj = {
                    regNo: generateRandomRegNumber(),
                    color: generateRandom(false, false, true),
                    slotNo: i
                }
                console.log("slot obj", slotObj);
                parkingData.push(slotObj);
            }
            console.log("parking data >>> ", parkingData);
            setupdateFlag(true);
        } else {
            alert('No parking slots are available');
        }

    }
    const generateRandomRegNumber = () => {
        let regNumber = 'MH-' + generateRandom(true, false, false) + '-' + generateRandomAlphaCode() + '-' + generateRandom(false, true, false);
        return regNumber;
    }
    const generateRandomAlphaCode = () => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < 2; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const generateRandom = (twoDigitFlag, fourDigitFlag, colorFlag) => {
        if (twoDigitFlag) {
            const randomTwoDigit = Math.floor(Math.random() * 90 + 10);
            return randomTwoDigit;
        } else if (fourDigitFlag) {
            const randomFourDigit = Math.floor(Math.random() * 9000 + 1000);
            return randomFourDigit;
        } else if (colorFlag) {
            const random = Math.floor(Math.random() * 4 + 1)
            console.log("random", random);
            let color = '';
            switch (random) {
                case 1:
                    color = 'Black';
                    break;
                case 2:
                    color = 'White';
                    break;
                case 3:
                    color = 'Blue';
                    break;
                case 4:
                    color = 'Red';
                    break;
                default:
                    color = 'no color selected';
                    break;
            }
            return color;
        }
    }

    const RemoveParkingSlot = (e, slotNum) => {
        e.preventDefault();
        for (let j = 0; j < parkingData.length; j++) {
            if (parkingData[j].slotNo === slotNum) {
                parkingData[j].regNo = '';
                parkingData[j].color = '';
                break;
            }
        }
        setupdateFlag(true);
    }

    const AddNewParkingSlot = (e) => {
        e.preventDefault();
        if (parking_slot <= parking_space) {
            let found = false;
            for (let k = 0; k < parkingData.length; k++) {
                if (parkingData[k].regNo === '' && parkingData[k].color === '') {
                    parkingData[k].regNo = generateRandomRegNumber();
                    parkingData[k].color = generateRandom(false, false, true);
                    found = true;
                    break;
                }
            }
            if (!found) {
                let x = parking_slot;

                let slotObj = {
                    regNo: generateRandomRegNumber(),
                    color: generateRandom(false, false, true),
                    slotNo: ++x
                }
                if (x <= parking_space) {
                    setparking_slot(x);
                    parkingData.push(slotObj);
                } else {
                    alert('No parking slots are available');
                }
            }
            setupdateFlag(true);
        } else {
            alert('No parking slots are available');
        }
    }

    const lowercasedFilter = filter.toLowerCase();
    const filteredData = parkingData.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(lowercasedFilter)
        );
    });

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" ></Navbar.Brand>
                <NavItem className="mr-auto">
                    <h3 style={{ color: 'white' }} variant="outline-info">Welcome to Car Parking Lot</h3>
                </NavItem>
            </Navbar>
            <br />

            <form onSubmit={allocateParking}>
                <div>
                    Enter parking space: <input type='number' placeholder='enter no. of parking spaces' value={parking_space} onChange={e => setparking_space(parseInt(e.target.value))} />
                </div>
                <div>
                    Enter parking slots: <input type='number' placeholder='enter parking slots' value={parking_slot} onChange={e => setparking_slot(parseInt(e.target.value))} />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <button onClick={e => AddNewParkingSlot(e)}>Add parking slot</button>

            <div><input value={filter} onChange={e => setfilter(e.target.value)} /></div>
           
           {/* <div>
               <parkingList filterData={filteredData}/>
           </div> */}
            <div className={styles.tableparking}>
                <div className={styles.header}>
                    <h2 className={styles.header_width}>Parking List</h2>
                    <Button className={styles.btn_width} variant="success">Add Parking</Button>
                </div>
                <table>
                    <thead>
                        {
                            filteredData.length > 0 ? (
                                <tr>
                                    <th style={{ fontWeight: 'bold' }}>Registration Number</th>
                                    <th style={{ fontWeight: 'bold' }}>Colour</th>
                                    <th style={{ fontWeight: 'bold' }}>Slot No</th>
                                    <th style={{ fontWeight: 'bold' }}>Exit from parking</th>
                                </tr>
                            ) : (null)
                        }
                    </thead>
                    <tbody>
                        {
                            filteredData.map(pd => {
                                if (pd.regNo.length > 0 && pd.color.length > 0) {
                                    return (<tr>
                                        <td>{pd.regNo}</td>
                                        <td>{pd.color}</td>
                                        <td>{pd.slotNo}</td>
                                        <td><button onClick={e => RemoveParkingSlot(e, pd.slotNo)}>Exit</button></td>
                                    </tr>)
                                }

                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Parking_Main
