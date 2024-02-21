import React, { useEffect, useState } from 'react';
import pic from './pic.png';
import { MDBBtn } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function First() {
    const location = useNavigate()
    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState([])

    const fetchData = async () => {
        const { data } = await axios.get('http://localhost:8000/getUsers')
        setUser(data.user)
    }
    
    const handleLogin=()=>{
        const userExists= user.find(u=>u.email===email && u.passwd===passwd);
        if(userExists){
            alert('Login Successfull')
            location(`/home/${userExists._id}`)
        }
        else{
            alert('Invalid email or password')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const buttonStyle = {
        position: 'absolute',
        top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '190px'
    };

    const modalStyle = {
        paddingTop: '100px',
        backgroundColor: 'rgb(221, 230, 200)',
        borderRadius: '10px',
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <img src={pic} alt="" style={{ width: '100%', height: '100vh' }} />
            <MDBBtn style={buttonStyle} variant="primary" onClick={handleShow}>
                Get Started
            </MDBBtn>

            <Modal show={show} onHide={handleClose} style={{ marginTop: '100px' }}>
                <div className='p-5' style={modalStyle}>
                    <h2>Login</h2>
                    <hr />
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>Email Address</Form.Label>
                                <InputGroup  value={email} onChange={(e) => setEmail(e.target.value)} hasValidation>
                                    <Form.Control
                                        type="email" style={{fontFamily:'sherif'}}
                                        placeholder="xxx@email.com"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">

                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>Password</Form.Label>
                                <InputGroup value ={passwd} onChange={(e) => setPasswd(e.target.value)} hasValidation>
                                    <Form.Control style={{fontFamily:'sherif'}}
                                        type="password"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <MDBBtn style={{ backgroundColor: 'rgb(71, 99, 74)', marginTop: '10px' }} onClick={handleLogin}>
                                Submit
                            </MDBBtn>
                            <a href="/register" className='text-dark' style={{ paddingTop: '20px' }} > New Here? </a>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}

export default First;