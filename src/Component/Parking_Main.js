
import React, { useEffect, useState } from 'react';
import { NavItem, Button, Navbar, Toast, Alert } from 'react-bootstrap';
import styles from '../Css/styles.module.css';

function Parking_Main() {
    const [parking_space, setparking_space] = useState(0);
    let [parking_slot, setparking_slot] = useState(0);
    const [parkingData, setparkingData] = useState([]);
    const [updateFlag, setupdateFlag] = useState(false);
    const [filter, setfilter] = useState('');
    const [pListVisible, setpListVisible] = useState(false);
    const [show, setshow] = useState(false);
    const [noSlotAlert, setnoSlotAlert] = useState(false);
    const [exitSlotAlert, setexitSlotAlert] = useState(false);


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
            setpListVisible(true);
        } else {
            setnoSlotAlert(true);
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
        setexitSlotAlert(true);
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
                setshow(true);
                setnoSlotAlert(false);
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
                    setshow(true);
                    setnoSlotAlert(false);
                } else {
                    setshow(false);
                    setnoSlotAlert(true);
                }
            }
            setupdateFlag(true);
        } else {
            setshow(false);
            setnoSlotAlert(true);
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

            <Alert show={noSlotAlert} variant="danger" className={styles.alert_width}>
                <Alert.Heading>No Slots!</Alert.Heading>
                <p> No slots available for parking!</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setnoSlotAlert(false)} variant="outline-danger"> Close </Button>
                </div>
            </Alert>

            <Alert show={exitSlotAlert} variant="success" className={styles.alert_width}>
                <Alert.Heading>Exit success!</Alert.Heading>
                <p>Exit from parking Successfully!</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setexitSlotAlert(false)} variant="outline-success"> Close </Button>
                </div>
            </Alert>

            {pListVisible ? null :
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
            }

            {pListVisible ?
                <div>
                    Search  <input value={filter} onChange={(e) => setfilter(e.target.value)} />
                    <Alert show={show} variant="success" className={styles.alert_width}>
                        <Alert.Heading>Success!</Alert.Heading>
                        <p> New Parking Added successfully!</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setshow(false)} variant="outline-success"> Close </Button>
                        </div>
                    </Alert>
                    <div className={styles.tableparking}>
                        <div className={styles.header}>
                            <h4 className={styles.parkingSpace_Size}>Total Parking Spaces : {parking_space}</h4>
                            <h2 className={styles.header_width}>Parking List</h2>
                            <Button className={styles.btn_width} variant="success" onClick={e => AddNewParkingSlot(e)}>Add Parking</Button>
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
                                                <td><Button variant="warning" onClick={e => RemoveParkingSlot(e, pd.slotNo)}>Exit</Button></td>
                                            </tr>)
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div> : null}

            <Toast onClose={() => setshow(false)} show={show} delay={2000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Success!</strong>
                </Toast.Header>
                <Toast.Body>New Parking added successfully!</Toast.Body>
            </Toast>
        </div>
    )
}

export default Parking_Main
