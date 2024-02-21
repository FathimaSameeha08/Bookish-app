import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';

function QuoteCard(item) {
    console.log(item.bookName);
    const { userId } = useParams();

    const [quote, setQuote] = useState('')
    const [book, setBook] = useState('')
    const [author, setAuthor] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdd = async (e) => {
        setBook(item.bookName)
        setAuthor(item.authorName)
        const body = { userId, quote, book, author }
        if (quote === '') {
            toast.warning(" Enter quote ")
        }
        else {

            await axios.post('http://localhost:8000/addQuotes', body).then((response) => {
                console.log(response);
                toast.success(response.data.message)
                handleClose()

            }
            ).catch((error) => {
                toast.warning('Quote already added')
            })
        }
    }
    return (
        <div>
            <Card style={{ width: '300px', height: '90px', marginTop: '3px', marginBottom: '10px', overflowY: 'auto' }}>
                <Card.Body>
                    <Card.Text onClick={handleShow}>
                        Add your favorite quote from the book .
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal style={{ marginTop: '350px', marginLeft: '250px' }} show={show} onHide={handleClose}>

                <div className='d-flex'>
                    <Modal.Body className='mt-2'>    
                        <MDBInput onChange={(e) => setQuote(e.target.value)}  label='Enter Quote' id='form1' type='text' />
                    </Modal.Body>

                    <Button style={{ height: '40px', margin: '20px' }} variant="secondary" onClick={(e) => handleAdd(e)} >
                        ok
                    </Button>
                </div>

            </Modal>
            <ToastContainer />

        </div>
    )
}

export default QuoteCard