import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../Header';
import './style.css';
const Home = () => {


    return (
        <>
            <Header />
            <div className='home-container'>
                <Header />
                <h1 className='home-heading'>Find The Job  That Fits Your Life</h1>
                <p className='home-paragraph'>Millions of people are searching for jobs, salary information, company reviews. Find the job that fits your abilities and potential.</p>
                <div className='button-container'>
                    <Link className="home-link" to='/jobs'>
                        <button type="button" className="home-button">Find Jobs</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Home;
