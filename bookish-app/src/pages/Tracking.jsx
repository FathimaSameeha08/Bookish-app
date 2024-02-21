import React from 'react'
import Header from '../components/Header'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './try.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TrackCard from '../components/TrackCard';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import Footer from '../components/Footer';

function Tracking() {
  const location = useNavigate()

  const { userId } = useParams();

  const [bookName, setBookName] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [genre, setGenre] = useState('')
  const [totalPages, setTotalPages] = useState('')
  const [pagesRead, setPagesRead] = useState(0)
  const [quote, setQuote] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState('')

  const [startingDate, setStartingDate] = useState('')
  const [finishedDate, setFinishedDate] = useState(null)
  const [status,setStatus] = useState('reading')
  const [searchTracking, setSearchTracking] = useState('')
  const [searchStatus, setSearchStatus] = useState('')

  const [bookStatus,setBookStatus]=useState(false)

  const handleAddBook = async (e) => {
    const body = { userId, bookName, authorName, genre, totalPages,quote,review,rating, pagesRead, startingDate,finishedDate,status }
    const today = new Date();
    const selectedStartDate = new Date(startingDate);
    if (bookName === '' || totalPages === '' || startingDate === '') {
      // alert("Fill all the feilds correctly ")
      toast.error("Fill all the fields correctly");

    }
    else if (selectedStartDate > today) {
      toast.error("Starting date cannot be in the future");}
    else {
      await axios.post('http://localhost:8000/addBook', body).then((response) => {
        // console.log(response);
        toast.success(response.data.message)
        setBookStatus(true)
        handleClose()
        setPagesRead(0)
        // location(`/tracking/${userId}`); 

      }
      ).catch((error) => {
        toast.error('Entered book may have been already added.')
      })
      // console.log("kkk",userId, bookName, authorName, genre, totalPages, pagesRead, startingDate,status);
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <body style={{  minHeight: '720px',backgroundColor: "rgb(237, 249, 233)" }}>
      <Header />
      <div style={{display:'flex',justifyContent:'space-between' }}>
      <button onClick={handleShow} type="button" class="btn btn-secondary m-3">Start Reading</button>
      <p className='fs-2 mt-3 ms-5 ps-5' style={{marginBottom:'-20px'}}> Track Your Reading </p>

      <div style={{display:'flex'}}>
      <input style={{ width: '200px',height:'40px' }} class="form-control me-sm-3 mt-4" type="search" placeholder="Search" onChange={(e) => setSearchTracking(e.target.value)}/>
      <MDBDropdown>
      <MDBDropdownToggle style={{ width: '135px',height:'37px',marginTop:'25px',boxShadow:'none',marginRight:'20px' }} >{searchStatus===''? 'All' : searchStatus}</MDBDropdownToggle>
      <MDBDropdownMenu style={{padding:'20px', cursor:'pointer'}}>
      <MDBDropdownItem onClick={() => setSearchStatus('')}>All</MDBDropdownItem>
        <MDBDropdownItem onClick={() => setSearchStatus('completed')}>Completed</MDBDropdownItem>
        <MDBDropdownItem onClick={() => setSearchStatus('reading')}>Reading</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
      </div>


      </div>
      <div style={{ display: 'flex', justifyContent: 'center',marginTop:'20px' }}>
        <TrackCard bookStatus={bookStatus} setBookStatus={setBookStatus} searchTracking={searchTracking} setSearchTracking={setSearchTracking} setSearchStatus={setSearchStatus}  searchStatus={searchStatus}/></div>

      <Modal show={show} onHide={handleClose} >
        <main style={{ display: 'flex' }}>
          <div class="book">
            <div class="book-cover ">
              <div>
                <h1 className='track-my-reading text-dark'>Track My Reading</h1>
                <div class="separator"></div>
                {/* <h2>by Virginia Woolf</h2> */}
              </div>
            </div>
            <div class="book-content  text-dark">
              <h3>Fill the Form</h3>
              <div noValidate className='bookinput w-100 text-dark' validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3  text-dark">
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className='text-dark' >What Are You Reading ?</Form.Label>
                    <Form.Control onChange={(e) => setBookName(e.target.value)}
                      required
                      type="text"
                      placeholder="Book Name"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="8" controlId="validationCustom04">
                    <Form.Label className='text-dark'>Who is the author? </Form.Label>
                    <Form.Control onChange={(e) => setAuthorName(e.target.value)} type="text" required />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label className='text-dark'>Genre </Form.Label>
                    <Form.Control onChange={(e) => setGenre(e.target.value)} type="text" required />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label className='text-dark' >Total Pages </Form.Label>
                    <Form.Control onChange={(e) => setTotalPages(e.target.value)} type="number" required />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label className='text-dark'> Pages Read</Form.Label>
                    <Form.Control
                      onChange={(e) => setPagesRead(e.target.value)}
                      type="number"
                      defaultValue={0} 
                      value={pagesRead}                       
                      required
                    />                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="validationCustom04">
                    <Form.Label className='text-dark'>When did you start reading ? </Form.Label>
                    <Form.Control type="date" onChange={(e) => setStartingDate(e.target.value)} required />
                  </Form.Group>

                </Row>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                  <Button style={{ backgroundColor: '#915454',boxShadow:'none',border:'none' }} onClick={(e) => handleAddBook(e)} type="submit">Submit form</Button>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                </div>

              </div>

            </div>
          </div>
          {/* <img src="https://i.pinimg.com/originals/28/13/75/2813756882e19ee9b7a90cea40170f19.jpg" alt="" /> */}

        </main>
      </Modal>
      <Footer/>
      <ToastContainer />
    </body>
  )
}

export default Tracking