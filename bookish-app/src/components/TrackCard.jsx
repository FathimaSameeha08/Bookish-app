import React, { useEffect, useState, useRef } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { FiEdit3 } from "react-icons/fi";
import { MdEditDocument } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from 'react-bootstrap/ProgressBar';
import StarRating from './StarRating';
import nobook from '../pages/nobook.png';
import QuoteCard from './QuoteCard';


function TrackCard({ setBookStatus, bookStatus, props, searchTracking, setSearchTracking, searchStatus, setSearchStatus }) {
    const [book, setBook] = useState([])
    const fetchId = useParams()
    const [show, setShow] = useState(false);
    const del = <Tooltip>Delete</Tooltip>;
    const ed = <Tooltip>Edit</Tooltip>;
    const prog = <Tooltip>Progress</Tooltip>;
    const comp = <Tooltip>Completed</Tooltip>;
    const au = <Tooltip >Author</Tooltip>;
    const rev = <Tooltip >Add Review</Tooltip>;
    const sdate = <Tooltip >Started on</Tooltip>;
    const pg_ed = <Tooltip >Update</Tooltip>;
    const [delStatus, setDelStatus] = useState(null)
    const modalRef = useRef(null);

    // edit pages read modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // #######################################completed modal#####################################################3
    const [showCompleted, setShowCompleted] = useState(false);
    const handleCloseCompleted = () => setShowCompleted(false);
    const handleShowCompleted = (item) => {
        const { _id, bookName, genre, authorName, pagesRead, notes, totalPages, startingDate, status } = item
        setEditGenre(genre)
        setBookId(_id)
        setEditName(bookName)
        setEditAuthor(authorName)
        setEditPagesRead(totalPages)
        setEditTotalPages(totalPages)
        setEditNotes(notes)
        const formattedDate = new Date(startingDate).toISOString().split('T')[0];
        setEditStartingDate(formattedDate);
        setShowCompleted(true);

    }

    // #################################### edit book modal ###########################################################
    const [bookId, setBookId] = useState('')
    const [editName, setEditName] = useState('')
    const [editGenre, setEditGenre] = useState('')
    const [editAuthor, setEditAuthor] = useState('')
    const [editPagesRead, setEditPagesRead] = useState('')
    const [editTotalPages, setEditTotalPages] = useState('')
    const [editNotes, setEditNotes] = useState('')
    const [editReview, setEditReview] = useState('')
    const [editRating, setEditRating] = useState(0)
    const handleRatingChange = (newRating) => {
        setEditRating(newRating);
    };
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<span key={i} className={i <= rating ? 'filled-star' : 'empty-star'}>&#9733;</span>);
        }
        return stars;
    };
    const [editStartingDate, setEditStartingDate] = useState('')
    const [editFinishedDate, setEditFinishedDate] = useState('')

    const [editStatus, setEditStatus] = useState('')
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const [showEditBook, setShowEditBook] = useState(false);
    const handleCloseEditBook = () => setShowEditBook(false);
    const handleShowEditBook = (item) => {
        const { _id, bookName, genre, authorName, pagesRead, notes, totalPages, startingDate, rating, review, status } = item
        setShowEditBook(true);
        setEditGenre(genre)
        setBookId(_id)
        setEditName(bookName)
        setEditAuthor(authorName)
        setEditPagesRead(pagesRead)
        setEditNotes(notes)
        setEditReview(review)
        setEditRating(rating)
        setEditTotalPages(totalPages)

        const formattedDate = new Date(startingDate).toISOString().split('T')[0];
        setEditStartingDate(formattedDate);
    }
    console.log(editStartingDate);

    // ######################### add review modal #############################################

    const [showRev, setShowRev] = useState(false);
    const handleCloseRev = () => setShowRev(false);
    const handleShowRev = (item) => {
        if (item.status === 'completed') {
            setShowRev(true);
            const { _id, bookName, genre, authorName, pagesRead, notes, totalPages, startingDate, rating, review, status } = item;
            setEditGenre(genre);
            setBookId(_id);
            setEditName(bookName);
            setEditAuthor(authorName);
            setEditPagesRead(pagesRead);
            setEditNotes(notes);
            setEditTotalPages(totalPages);
            const formattedDate = new Date(startingDate).toISOString().split('T')[0];
            setEditStartingDate(formattedDate);
        } else {
            toast.warning("You can only edit reviews for completed books.");
        }
    };

    // ######################### submiting edit #############################################

    const handleUpdate = async (e) => {
        const body = { _id: bookId, bookName: editName, authorName: editAuthor, genre: editGenre, totalPages: editTotalPages, pagesRead: editPagesRead, notes: editNotes, review: editReview, rating: editRating, startingDate: editStartingDate, finishedDate: editFinishedDate, status: editStatus }
        if (parseInt(editPagesRead) === parseInt(editTotalPages)) {
            body.status = "completed";
            body.finishedDate = new Date()
        }
        else {
            body.status = "reading"
        }
        try {
            const result = await axios.post(`http://localhost:8000/editTracking/${bookId}`, body);
            if (body.status === 'completed') {
                showModal();
            }
            handleCloseEditBook();
            handleClose()
            handleCloseRev()
            handleCloseCompleted()
            fetchData()
        } catch (error) {
            console.error(error);
            toast.error("Failed to update data");
        }
    }
    const handleUpdateReview = async (e) => {
        const body = { _id: bookId, bookName: editName, authorName: editAuthor, genre: editGenre, totalPages: editTotalPages, pagesRead: editPagesRead, notes: editNotes, review: editReview, rating: editRating, startingDate: editStartingDate, finishedDate: editFinishedDate, status: editStatus }
        if (parseInt(editPagesRead) === parseInt(editTotalPages)) {
            body.status = "completed";
            body.finishedDate = new Date()
        }
        else {
            body.status = "reading"
        }
        try {
            const result = await axios.post(`http://localhost:8000/editTracking/${bookId}`, body);
            handleCloseRev()
            fetchData()
        } catch (error) {
            console.error(error);
            toast.error("Failed to update data");
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete('http://localhost:8000/deleteTrackingBook/' + id);
            toast.success(response.data.message);
            await fetchData();
            setDelStatus(id);

        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    const fetchData = async () => {
        const { data } = await axios.get('http://localhost:8000/getTrackCard')
        // data.track.map(id=>console.log(id.userId));
        const filteredData = data.track.filter(id => id.userId === fetchId.userId);
        if (filteredData.length >= 0) {
            setBook(filteredData);
        }
    }


    useEffect(() => {
        setDelStatus(null)
        setBookStatus(false)
        fetchData()
    }, [bookStatus, delStatus])

    const editPagesReadModal = (item) => {
        const { _id, bookName, genre, authorName, pagesRead, notes, totalPages, startingDate, status } = item
        setEditGenre(genre)
        setBookId(_id)
        setEditName(bookName)
        setEditAuthor(authorName)
        setEditPagesRead(pagesRead)
        setEditNotes(notes)
        setEditTotalPages(totalPages)
        // setEditStartingDate(new Date(startingDate).toLocaleDateString())
        const formattedDate = new Date(startingDate).toISOString().split('T')[0];
        setEditStartingDate(formattedDate);
        handleShow()
    }
    const [notes, setnotes] = useState('')
    

    const modal = document.querySelector("#modal");
    const openModal = document.querySelector("#openModal");
    const closeModal = document.querySelector("#closeModal");
    const overlay = document.querySelector("#overlay");
    const showModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
            overlay.style.display = "block"; // Show the overlay when the modal is opened
            setTimeout(() => {
                closeModalFn();
            }, 2000);
        }
    };
    const closeModalFn = () => {
        if (modalRef.current) {
            modalRef.current.close();
            overlay.style.display = "none";
        }
    };
    if (modal) {
        openModal && openModal.addEventListener("click", () => {
            modal.showModal();
            overlay.style.display = "block"; // Show the overlay when the modal is opened
        });

        closeModal && closeModal.addEventListener("click", () => {
            modal.close();
            overlay.style.display = "none"; // Hide the overlay when the modal is closed
        });

        // Close modal when clicking outside of it
        window.addEventListener("click", (event) => {
            if (event.target === overlay) {
                modal.close();
                overlay.style.display = "none"; // Hide the overlay when the modal is closed
            }
        });
    }
    const overlayStyles = {
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0)',
        zIndex: 1000,
        'backdrop-filter': 'blur(5px)',
    };

    const reading = book.filter((item) => item.status === 'reading').length
    const completed = book.filter((item) => item.status === 'completed').length


    return (
        <div className='mb-5'>

            {book.length > 0 ? <div className='d-flex'>
                <h6 className='me-4'>Completed : {completed} </h6>
                <h6>Reading : {reading} </h6>
            </div> : ''}

            {book.filter((item) => {
                return searchTracking.toLowerCase() === '' && searchStatus === '' ? item
                    : item.bookName.toLowerCase().includes(searchTracking) && item.status.includes(searchStatus)
            }).length > 0 ?
                book.filter((item) => {
                    return searchTracking.toLowerCase() === '' && searchStatus === '' ? item
                        : item.bookName.toLowerCase().includes(searchTracking) && item.status.includes(searchStatus)
                })
                    .map((item) => (
                        <div key={item._id} style={{ display: 'flex' }}><Card style={{ width: '900px', marginBottom: '20px' }}>
                            <Card.Body >
                                <Card.Title className='text-dark fs-2 ms-4 my-2 ' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>{item.bookName}
                                        <h5 ><OverlayTrigger placement="bottom" overlay={au}><i class="fa-solid fa-pen-nib me-1 mt-2" style={{ color: '#89AB89' }}></i></OverlayTrigger>{item.authorName && item.authorName.charAt(0).toUpperCase() + item.authorName.slice(1)} </h5>
                                    </div>
                                    <div ><OverlayTrigger placement="top" overlay={sdate}><p className='pt-2 me-1'><i class="fa-solid fa-calendar-days "></i> {new Date(item.startingDate).toLocaleDateString()}</p></OverlayTrigger></div>
                                </Card.Title>
                                <Card.Text style={{marginTop:'20px'}}>
                                    <h6>Genre : {item.genre}</h6>
                                    <div style={{ display: 'flex' }}>
                                        <h6 className='me-1'>Total pages : {item.totalPages}</h6>
                                        <div style={{ height: '30px', width: '440px', marginRight: '25px', marginLeft: '25px', }}>
                                            {item.status === 'completed' ? (
                                                <div>
                                                    <h6 className='text-center ' style={{ fontFamily: 'cookie', fontSize: '50px', marginTop: '-25px', color: '#915454' }}>  Done Reading !</h6>
                                                    <h6 className='text-center' style={{ fontSize: '14px', color: '#575757', marginTop: '40px' }}>Completed on : {new Date(item.finishedDate).toLocaleDateString()}</h6>
                                                </div>
                                            ) : (
                                                <div >
                                                    <OverlayTrigger placement="top" overlay={prog}>
                                                        <ProgressBar now={item.pagesRead * 100 / item.totalPages} label={`${(item.pagesRead * 100 / item.totalPages).toFixed(2)}%`} />
                                                    </OverlayTrigger>
                                                </div>
                                            )}
                                        </div>
                                        <h6 >Pages read : {item.pagesRead}
                                            <OverlayTrigger placement="top" overlay={pg_ed}><button onClick={() => editPagesReadModal(item)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                                <FiEdit3 />
                                            </button></OverlayTrigger></h6>
                                    </div>
                                </Card.Text>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '30px' }}>
                                    <div >
                                        {item.status === 'reading' ?
                                            <OverlayTrigger placement="top" overlay={comp}><Button variant="primary" style={{ boxShadow: 'none' }} className='me-2' onClick={() => handleShowCompleted(item)}> <i class="fa-solid fa-circle-check mt-1  " style={{ fontSize: '20px' }} ></i></Button></OverlayTrigger> :
                                            <OverlayTrigger placement="top" overlay={comp}><Button variant="primary" style={{ boxShadow: 'none' }} className='me-2' onClick={() => handleShowCompleted(item)} disabled> <i class="fa-solid fa-circle-check mt-1  " style={{ fontSize: '20px' }} ></i></Button></OverlayTrigger>

                                        }
                                    </div>
                                    <div className="d-flex me-4">
                                        <OverlayTrigger placement="top" overlay={rev}><Button variant="secondary" className='me-2' onClick={() => handleShowRev(item)}> <MdEditDocument style={{ fontSize: '20px' }} /></Button></OverlayTrigger>
                                        {item.status === 'reading' ?
                                            <OverlayTrigger placement="top" overlay={ed}><Button variant="secondary" onClick={() => handleShowEditBook(item)} className='me-2'><i class="fa-solid fa-pen-to-square"></i></Button></OverlayTrigger>
                                            :
                                            <OverlayTrigger placement="top" overlay={ed}><Button variant="secondary" onClick={() => handleShowEditBook(item)} disabled className='me-2'><i class="fa-solid fa-pen-to-square"></i></Button></OverlayTrigger>

                                        }
                                        <OverlayTrigger placement="top" overlay={del}><Button variant="danger" style={{ boxShadow: 'none' }} onClick={() => handleDelete(item._id)}><BsTrash3Fill /></Button></OverlayTrigger>

                                    </div>
                                    <div id="overlay" style={overlayStyles}></div>
                                    <dialog id="modal" ref={modalRef} style={{ background: 'transparent', border: 'none', backgroundImage: 'url(https://i.gifer.com/6k2.gif)', backgroundSize: 'cover', height: '200px' }}>
                                        <h1 id='completed'>You've completed a Book!</h1>
                                    </dialog>
                                </div>
                            </Card.Body>
                        </Card>
                            <div style={{ marginLeft: '20px' }}>
                                <Card style={{ height: '260px', width: '250px' ,overflowY:'auto'}}>
                                    {item.status === 'completed' ?
                                        <Card.Body>
                                            <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }} className='mt-2 mb-4'>
                                                <div>
                                                    Review
                                                </div>
                                                <div>
                                                    {renderStars(item.rating)}
                                                </div>
                                            </Card.Title>
                                            <Card.Text style={{ marginLeft: '-30px' }}>
                                                <h6> {item.review === '' ? 'No review added' : item.review}</h6>

                                            </Card.Text>
                                        </Card.Body> :
                                        <Card.Body>
                                            <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }} className='mt-2 mb-4'>
                                                <div>
                                                    Review
                                                </div>

                                            </Card.Title>
                                            <Card.Text style={{ color: 'grey', textAlign: 'center', paddingTop: '20px' }}>
                                                <h6 >Complete Reading the book to add review</h6>
                                            </Card.Text>
                                        </Card.Body>}
                                </Card>
                                {/* <QuoteCard item={item}/> */}
                                
                            </div>
                        </div>

                    )) : <img src={nobook} style={{ marginLeft: '-30px' }} alt="" width={500} />
            }
            {/* ########################### edit pages read modal ################################3 */}
            <Modal {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={show} onHide={handleClose} animation={false}>
                <Modal.Body style={{ width: '350px' }}>
                    <Row>
                        <Col md={1} className='pt-1 ' style={{ width: '120px' }}>Pages read:</Col>
                        <Col ><InputGroup  >
                            {
                                <Form.Control className='text-black' type='number' min='0' max={editTotalPages} value={editPagesRead}
                                    onChange={(e) => setEditPagesRead(e.target.value)}
                                    aria-describedby="inputGroup-sizing"
                                />
                            }
                        </InputGroup>
                        </Col>
                        <Col>
                            <button className='btn btn-primary btn-sm mt-1' style={{ boxShadow: 'none' }} onClick={(e) => handleUpdate(e)}>ok</button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            {/*  #################################### edit book modal ########################################################### */}

            <Modal
                backdrop="static"
                keyboard={false} show={showEditBook} onHide={handleCloseEditBook}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Reading Details</Modal.Title>
                </Modal.Header>
                <Modal.Body> <div noValidate className='bookinput w-100 text-dark' validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3  text-dark">
                        <Form.Group controlId="validationCustom01">
                            <Form.Label className='text-dark' >Book Name</Form.Label>
                            <Form.Control value={editName} onChange={(e) => setEditName(e.target.value)}
                                className='text-dark'
                                required
                                type="text"
                                placeholder="Book Name"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8" controlId="validationCustom04">
                            <Form.Label className='text-dark'>Author </Form.Label>
                            <Form.Control className='text-dark' value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} type="text" required />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label className='text-dark'>Genre </Form.Label>
                            <Form.Control className='text-dark' value={editGenre} onChange={(e) => setEditGenre(e.target.value)} type="text" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label className='text-dark' >Total Pages </Form.Label>
                            <Form.Control className='text-dark' value={editTotalPages} onChange={(e) => setEditTotalPages(e.target.value)} type="number" required />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label className='text-dark'> Pages Read</Form.Label>
                            <Form.Control className='text-dark'
                                onChange={(e) => setEditPagesRead(e.target.value)}
                                type="number"
                                defaultValue={0} min='0' max={editTotalPages}
                                value={editPagesRead}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="validationCustom04">
                            <Form.Label className='text-dark'>Starting Date </Form.Label>
                            <Form.Control type='date' value={editStartingDate}
                                onChange={(e) => setEditStartingDate(e.target.value)} required />
                        </Form.Group>
                    </Row>


                </div></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ################################# completed modal #######################################3 */}

            <Modal {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={showCompleted} onHide={handleCloseCompleted} animation={false}>
                <Modal.Body style={{ width: '740px' }}>
                    <Row>
                        <Col className='pt-1 ' style={{ width: '120px' }}>Did you complete reading the book ? </Col>
                        <Col >
                            <button className='btn btn-primary btn-sm  me-3' style={{ boxShadow: 'none' }} onClick={(e) => handleUpdate(e)} > Yes</button>
                            <button className='btn btn-danger btn-sm' style={{ boxShadow: 'none' }} onClick={handleCloseCompleted} > NO</button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            {/* ################################# review adding modal #######################################3 */}

            <Modal style={{ marginTop: '100px' }}
                show={showRev}
                onHide={handleCloseRev}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Review </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup >
                        <Form.Control onChange={(e) => setEditReview(e.target.value)} placeholder='Write Your Review . . .' as="textarea" style={{ minHeight: '100px', backgroundColor: 'beige' }} aria-label="With textarea" />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer >
                    <div style={{ position: 'absolute', left: '0%', fontSize: '20px', marginLeft: '20px' }}>
                        <InputGroup >
                            <StarRating onRatingChange={handleRatingChange} />
                        </InputGroup>
                    </div>
                    <Button className='btn-sm' style={{ boxShadow: 'none' }} onClick={(e) => handleUpdateReview(e)} variant="primary">Submit</Button>

                </Modal.Footer>
            </Modal>

            <ToastContainer />

        </div>
    )
}

export default TrackCard