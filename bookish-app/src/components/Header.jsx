import React from 'react'
import { Link, useParams } from 'react-router-dom';
import pic from './Book.png';

function Header() {
  const { userId } = useParams();

  return (
    <div >
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href={`/home/${userId}`}><img src={pic} alt="" width={150}/></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto" >
      <li class="nav-item">
          <a class="nav-link text-white" style={{fontFamily:'poppins'}} href={`/home/${userId}`}>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" style={{fontFamily:'poppins'}} href={`/tracking/${userId}`}>Track</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" style={{fontFamily:'poppins'}} href={`/library/${userId}`}>Library</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" style={{fontFamily:'poppins'}} href={`/quotes/${userId}`}>Quotes</a>
        </li>
        
      </ul>
      <form class="d-flex">
        <Link to={'/'}>
        <button class="btn btn-secondary btn-sm my-2 my-sm-0" type="submit">Logout</button>
        </Link>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header