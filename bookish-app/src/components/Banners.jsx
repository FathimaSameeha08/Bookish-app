import React from 'react'
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import ban2 from './banner2.png'
import { MDBBtn } from 'mdb-react-ui-kit';

import './starrating.css'; // Create a CSS file for styling

function Banners() {
  
  return (
    <div>
      <MDBCarousel showControls showIndicators fade>

      <MDBCarouselItem itemId={1}>

      <img src={ban2} className="d-block w-100"  />
          <MDBCarouselCaption>
            <div className="text-white text-center">
              <h2 style={{marginTop:'-360px',color:'black',fontFamily:'cookie,cursive',fontSize:'70px', color:'brown'}}> Track Your Reading Journey</h2>
              <h6 style={{marginLeft:'180px',marginRight:'180px'}}> Seamlessly monitor your reading progress, set reading goals, and celebrate your achievements. Our intuitive tracking system ensures that you stay motivated and engaged with every book you delve into.</h6>
              <a href="/tracking/:userId">
              <MDBBtn style={{backgroundColor:'brown',boxShadow:'none',border:'none',marginTop:'20px'}}>Track Now</MDBBtn>
              </a>
            </div>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
        <img src={ban2} className="d-block w-100"  />
          <MDBCarouselCaption>
            <div className="text-white text-center">
              <h2 style={{marginTop:'-360px',color:'black',fontFamily:'cookie,cursive',fontSize:'70px',color:'brown'}}> Discover Your Next Read</h2>
              <h6 style={{marginLeft:'180px',marginRight:'180px'}}>  Explore a vast collection of books curated just for you. From timeless classics to contemporary gems, our database caters to diverse tastes and interests. Discover hidden literary treasures and broaden your reading horizons effortlessly.</h6>
              <a href="/library/:userId">
              <MDBBtn style={{backgroundColor:'brown',boxShadow:'none',border:'none',marginTop:'20px'}}>Find Book</MDBBtn>
              </a>
            </div>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src={ban2} className="d-block w-100"  />
          <MDBCarouselCaption>
            <div className="text-white text-center">
              <h2 style={{marginTop:'-360px',color:'black',fontFamily:'cookie,cursive',fontSize:'70px',color:'brown'}}>Capture Your Favorite Quotes</h2>
              <h6 style={{marginLeft:'180px',marginRight:'180px'}}>Uncover the power of words by saving and sharing your favorite book quotes. Whether it's a line that resonates with you or a thought-provoking passage, cherish and revisit these literary gems at any time.</h6>
              <a href="/quotes/:userId">
              <MDBBtn style={{backgroundColor:'brown',boxShadow:'none',border:'none',marginTop:'20px'}}> Quotes</MDBBtn>
              </a>
            </div>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>



    </div>
  )
}

export default Banners