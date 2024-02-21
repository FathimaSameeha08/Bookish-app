import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from 'react-bootstrap/Card';
import { MDBInput } from 'mdb-react-ui-kit';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function Quotes() {
    const base_url = 'https://example-data.draftbit.com/books?_limit=50'
    const [products, setProducts] = useState([]); // Fetched data in the products state
    const fetchData = async () => {
        try {
            const response = await fetch(base_url); // Each content goes to response
            const data = await response.json(); // Object to array
            if (Array.isArray(data) && data.every(item => typeof item === 'object')) {
                setProducts(data); // Array of products
            } else {
                console.error('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    // ########################################## adding quotes #######################################3
    const [quote, setQuote] = useState('')
    const [book, setBook] = useState('')
    const [author, setAuthor] = useState('')
    const handleAdd = async (e) => {
        const body = { userId, quote, book, author }
        if (quote === '') {
            toast.warning(" Enter quote ")
        }
        else {
            await axios.post('http://localhost:8000/addQuotes', body).then((response) => {
                setBook('')
                setQuote('')
                setAuthor('')
                toast.success(response.data.message)
                fetchQuotes();

            }
            ).catch((error) => {
                toast.warning('Quote already added')
            })
        }
    }
    // ########################################## get quotes #######################################3
    const { userId } = useParams();
    const [quotes, setQuotes] = useState([])
    const fetchQuotes = async () => {
        const { data } = await axios.get('http://localhost:8000/getQuotes')
        const filteredData = data.quote.filter(id => id.userId === userId);
        if (filteredData.length >= 0) {
            setQuotes(filteredData);
        }
    }
    // ########################################## remove quotes #######################################3

    const handleRemove = async (_id) => {
        try {
            const response = await axios.delete('http://localhost:8000/deleteQuotes/' + _id);
            toast.success(response.data.message);
            fetchQuotes();

        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    useEffect(() => {
        fetchData()
        fetchQuotes()
    }, [])
    return (
        <body style={{ backgroundColor: '#edf9e9' ,minHeight:'110vh'}}>
            <Header />
            <Row style={{ backgroundColor: '#edf9e9' }}>
                <p className='fs-1 mt-4 text-center' style={{ marginBottom: '-18px' }} > Quotes </p>
                <div class="Marquee">
                    <div class="Marquee-content ">
                        <div class="Marquee-tag">
                            {
                                products.map((item) => (

                                    <Card id="quote_card" style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title id='quote_font'> {item.Quote1}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">-{item.authors}</Card.Subtitle>
                                            <Card.Text style={{ fontSize: '15px' }}>
                                                {item.title}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                ))
                            }
                        </div>
                    </div>
                </div>
            </Row>

            {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
            <div >
                <p className='fs-4 mt-4 '>Add Your Favourite Quotes . . .</p>
                <Row className='p-5' style={{ marginTop: '-40px' }}>
                    <Col md={6}><MDBInput onChange={(e) => setQuote(e.target.value)} label='Quote' id='form1' type='text' required /></Col>
                    <Col><MDBInput onChange={(e) => setBook(e.target.value)} label='Book Name' id='form1' type='text' /></Col>
                    <Col><MDBInput onChange={(e) => setAuthor(e.target.value)} label='Author' id='form1' type='text' /></Col>
                    <Col><button onClick={(e) => handleAdd(e)} class="btn btn-secondary btn-sm my-2 my-sm-0" type="submit">Submit</button></Col>

                </Row>
                <Row style={{ marginTop: '-40px' , marginBottom:'60px'}}>
                    {
                        quotes.map((item) => (
                            <Col >
                                <div class="paper" >
                                    <div class="pin">
                                        <div class="shadow"></div>
                                        <div class="metal"></div>
                                        <div class="bottom-circle"></div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px',marginTop:'20px' }} >

                                        <p id='quote_font'>"{item.quote}"</p>
                                        <p>- {item.author}</p>

                                        <p>Book : {item.book}</p>
                                        <i
                                            className="fa-regular fa-trash-can fa-lg"
                                            onClick={() => handleRemove(item._id)}
                                            style={{ color: 'black', cursor: 'pointer', position: 'absolute', bottom: '0', right: '0', marginBottom: '20px', marginRight: '10px' }}
                                        ></i>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>

            </div>

            <Footer/>
            <ToastContainer />

        </body>
    )
}

export default Quotes