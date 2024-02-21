import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './try.css'
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios'
import nobook from './nobook.png';
import empty from './empty.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

function Library() {
  const bkm = <Tooltip > To Read</Tooltip>;
  const rem = <Tooltip > Remove</Tooltip>;
  const list = <Tooltip > To Read List</Tooltip>;


  const { userId } = useParams();
  const [show, setShow] = useState(false);
  const [toReadList, setToReadList] = useState([])
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchLib, setSearchLib] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };
  const handleRemove = async (id) => {
    try {
        const response = await axios.delete('http://localhost:8000/deleteToRead/' + id);
        toast.success(response.data.message);
        await fetchToRead();

    } catch (error) {
        console.error('Error deleting book:', error);
    }
}
  const base_url = 'https://example-data.draftbit.com/books?_limit=50'
  //state creation
  const [products, setProducts] = useState([]); // Fetched data in the products state

  // Function creation
  const fetchData = async () => {
    try {
      const response = await fetch(base_url); // Each content goes to response
      const data = await response.json(); // Object to array

      // Check if the data is an array of objects before setting the state
      if (Array.isArray(data) && data.every(item => typeof item === 'object')) {
        setProducts(data); // Array of products
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchToRead = async () => {
    const { data } = await axios.get('http://localhost:8000/getToRead')
    const filteredData = data.toread.filter(id => id.userId === userId);
    if (filteredData.length >= 0) {
      setToReadList(filteredData);
    }
  }
  console.log(toReadList);

  const handleToAdd = async (item) => {
    console.log(item.id);
    const body = { userId: userId, id: item.id, title: item.title, image_url: item.image_url, genres: item.genres, authors: item.authors,description:item.description, rating: item.rating }
    await axios.post('http://localhost:8000/addToRead', body).then((response) => {
      console.log(response);
      toast.success(response.data.message)
      fetchToRead()

    }
    ).catch((error) => {
      toast.warning('Book may have been already added.')
    })
  }
  useEffect(() => {
    fetchData()
    fetchToRead()
  }, [])// [] to avoid repeatition
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    <body style={{ backgroundColor: "rgb(237, 249, 233)" }}>
      <Header />
      <div >
        <Row style={{ margin: '20px' }}>
          <Col md={5}></Col>
          <Col>
          {/* <h4 style={{ fontSize: '55px' }}>Library</h4> */}
          <p className='fs-1 mt-3 ' style={{marginBottom:'-20px'}}> Library </p>

          </Col>
          <Col md={3} ><form class="d-flex">
            <input style={{ width: '200px', marginLeft: '70px' }} class="form-control me-sm-3 mt-3" type="search" placeholder="Search" onChange={(e) => setSearchLib(e.target.value)} />
            {/* <i class="fa-solid fa-bookmark fa-xl ms-2" style={{ marginTop: '35px', color: '#961414' }}></i> */}
            <OverlayTrigger placement="top" overlay={list}><button type="button" class="icon-button mt-2 " onClick={handleShow2}>
              <span class="material-icons"> <i class="text-secondary fa-solid fa-bookmark fa-xl" ></i></span>
              <span class="icon-button__badge">{toReadList.length}</span>
            </button></OverlayTrigger> 

          </form></Col>
        </Row>


      </div>

      <div className='cardContainer  m-3' style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }} >
        {
          products.filter((item) => { return searchLib.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchLib) }).length > 0 ? products.filter((item) => { return searchLib.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchLib) }).map(item => (
            //cardformat
            <MDBCard id='hovercard' style={{ width: 250, margin: 10, marginBottom:'20px' }} onMouseEnter={(e) => {
              // Change the color of the icon on card hover
              e.currentTarget.querySelector('.fa-eye').style.color = 'red';
            }}
              onMouseLeave={(e) => {
                // Reset the color when the mouse leaves the card
                e.currentTarget.querySelector('.fa-eye').style.color = 'black';
              }}>
              <MDBRipple onClick={() => handleShow(item)}  rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <div  style={{ height: '300px' }} >
                  <MDBCardImage style={{ height:'300px'}}  src={item.image_url} fluid alt='...' width={250}  />
                </div>
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
              <MDBCardBody>

                <MDBCardTitle onClick={() => handleShow(item)}> {item.title && (
                  <p style={{ color: 'black', fontFamily: 'Cookie, cursive', fontSize: '35px', textAlign: 'center', marginLeft: '-20px', marginRight: '-20px' }}>
                    {item.title.length > 30
                      ? `${item.title.substring(0, 30)}...`
                      : item.title}
                  </p>
                )}</MDBCardTitle>
                <MDBCardText onClick={() => handleShow(item)} style={{ height: '100px' }}>
                  <h6 style={{ margin: '-20px', textAlign: 'start' }}> {item.description.substring(0, 70)}. . .</h6>
                </MDBCardText>
                <OverlayTrigger placement="top" overlay={bkm}><i class="fa-regular fa-bookmark ms-2" style={{ position: 'absolute', bottom: '20px', cursor: 'pointer' }} onClick={() => handleToAdd(item)}></i></OverlayTrigger>
                <i style={{ position: 'absolute', bottom: '0', margin: '20px', cursor: 'pointer', left: '70%' }} onClick={() => handleShow(item)} className='fa-solid fa-eye'></i>
              </MDBCardBody>
            </MDBCard>
          )) : <img src={nobook} style={{marginLeft:'-30px'}} alt="" width={500}/>

        }
      </div>
      <Modal size="lg" show={show} onHide={handleClose} >
        <Row >
          <Col ><img src={selectedItem && selectedItem.image_url} alt="" style={{ height: '100%', width: '100%' }} /></Col>
          <Col >  <Modal.Header >
            <Modal.Title>
              <div>{selectedItem && selectedItem.title}</div>
              <div style={{ fontSize: '14px', color: '#595858' }}>{selectedItem && selectedItem.genres}</div>
              <div style={{ fontSize: '19px' }}><i class="fa-solid fa-pen-nib me-1" style={{ color: '#89AB89' }}></i>{selectedItem && selectedItem.authors}</div>
            </Modal.Title>
          </Modal.Header>
            <Modal.Body style={{ height: '430px', overflowY: 'auto' }} >
              <h6 style={{ fontFamily: ' serif', fontSize: '20px' }}>{selectedItem && selectedItem.description}</h6>
            </Modal.Body>
            <Modal.Footer>
              <div style={{ position: 'absolute', left: '50%', fontSize: '20px', marginTop: '7px', marginLeft: '20px' }}><i className='fa-solid fa-star me-2' style={{ color: '#e1c62c' }}></i>{selectedItem && selectedItem.rating}</div>
              <div onClick={handleClose} style={{ cursor: 'pointer' }}>Close</div>
              {/* <Button variant="primary" >
          Add to cart
        </Button> */}
            </Modal.Footer>
          </Col>

        </Row>
      </Modal>
      <Offcanvas style={{ width: '40%',backgroundColor:'rgb(237, 249, 233)' }} show={show2} onHide={handleClose2} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>To Read List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row className='ms-3 '>

            {
              toReadList.length > 0 ? toReadList.map((item) => (
                <Col className='mb-4 mx-auto' md={6} style={{ textAlign: 'center' }}>
                <Card  style={{ width: '16rem' }}>
                    <Card.Img onClick={() => handleShow(item)}  variant="top" src={item.image_url} height={300} />
                    <Card.Body>
                      <Card.Title style={{height:'100px'}}><p style={{ color: 'black', fontFamily: 'Cookie, cursive', fontSize: '35px', textAlign: 'center', marginLeft: '-20px', marginRight: '-20px' }}>
                      {item.title.length > 30
                      ? `${item.title.substring(0, 30)}...`
                      : item.title}</p></Card.Title>
                      <Card.Text style={{margin:'-30px',marginBottom:'1px'}}>
                        <div style={{display:'flex',justifyContent:'space-between', height:'20px'}}>
                        <h6><i class="fa-solid fa-pen-nib me-1" style={{ color: '#89AB89' }}></i>{item.authors}</h6>
                        <OverlayTrigger placement="top" overlay={rem}><i class="fa-regular fa-trash-can fa-lg mt-2" onClick={() => handleRemove(item.id)} style={{ color: '#89AB89',cursor:'pointer' }}></i></OverlayTrigger>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

              )) : <img src={empty} style={{marginLeft:'-30px'}} alt="" width={500}/>
              
            }
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
      <Footer/>
      <ToastContainer />

    </body>
  )
}

export default Library