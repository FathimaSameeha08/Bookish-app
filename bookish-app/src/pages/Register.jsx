import regpic from './regpic.png';
import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

function Register() {
    const location=useNavigate() 
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [passwd,setPasswd]=useState('')

    const handleAdd=async(e)=>{
        const body ={name,email,passwd}
        if(name==='' || email==='' || passwd==='' ){  
            alert("Fill all the feilds ")
        }
        // else if(email.slice(-10,-11)!='i'){
        //     alert("Fill email correctly")
        // }
        else{
            await axios.post('http://localhost:8000/addUser',body).then((response)=>{
                console.log(response);
                alert(response.data.message)
                location('/')
            }
        ).catch((error)=>{
            alert('User already registered')
        })
        console.log(name,email,passwd);
        }
    }
    

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };


    const containerStyle = {
        backgroundImage: `url(${regpic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '690px',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
    };
    return (
        <div style={containerStyle}>
            <Row style={{padding:'130px'}}>
                <Col></Col>
                <Col >
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <h2 className='text-dark'>Register here  </h2>
                <a href="/"  className='pt-3'>Go back</a>
                </div>
                <div noValidate validated={validated} onSubmit={handleSubmit} >
                <Row className="mb-3">
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Name</Form.Label>
                        <InputGroup onChange={(e)=>setName(e.target.value)} hasValidation>
                            <Form.Control style={{fontFamily:'sherif'}}
                                type="text"
                                placeholder="Enter Name"
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
                        <Form.Label>Email Address</Form.Label>
                        <InputGroup  onChange={(e)=>setEmail(e.target.value)} hasValidation>
                            <Form.Control style={{fontFamily:'sherif'}}
                                type="email"
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
                        <InputGroup  onChange={(e)=>setPasswd(e.target.value)} hasValidation>
                            <Form.Control
                                type="password" style={{fontFamily:'sherif'}}
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <MDBBtn type="submit" onClick={(e)=>handleAdd(e)} style={{ backgroundColor: 'rgb(71, 99, 74)', marginTop: '10px' }} >
                        I'm in 
                    </MDBBtn>   

                </div>
            </div>
                </Col>
            </Row>
        </div>
    )
}

export default Register