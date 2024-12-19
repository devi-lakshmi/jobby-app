import React from 'react';
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './style.css';



const JobCard = ({ job, viewType = "list" }) => {
    const isDetailView = viewType === "detail"
    const isListView = viewType === "list";
    const isSimilarView = viewType === "similar";

    return (



        <div className='job-card-conatiner'>

            <div className={`job-card ${isDetailView ? 'job-card-detail' : 'job-card-list'}`}>

                <div className='job-card-header'>

                    <img src={job.company_logo_url} alt='company logo' className='company-logo' />
                    <div className='job-rating job-similar'>
                        <h1>{job.title}</h1>
                        <FaStar className='star-icon' /><span>{job.rating}</span>

                    </div>
                </div>
                {(isDetailView || isListView) && (
                    <div className='job-card-body'>
                        <div className='job-details'>
                            <p className='job-detail'><FaMapMarkerAlt className='icon' />{job.location}</p>
                            <p className='job-detail'><FaBriefcase className='icon' />{job.employment_type}</p>
                        </div>

                        <div>
                            <p className='job-package'>{job.package_per_annum}</p>
                        </div>

                    </div>
                )}
                {(isDetailView || isListView) && (

                    <div className='job-line job-similarline' ></div>
                )}


                <div className='job-description job-similar'>
                    <h1>Description</h1>

                    {isDetailView && (

                        <Link to={job.life_at_company.image_url} className='job-visit'>Visit
                            <FaExternalLinkAlt className='visit-icon' />  </Link>
                    )}

                </div>
                <p className='job-description-para  job-similar-para'>{job.job_description}</p>
                {isSimilarView && (
                    <div className='job-details job-similar'>
                        <p className='job-detail job-similar'><FaMapMarkerAlt className='icon' />{job.location}</p>
                        <p className='job-detail job-similar- emp-type'><FaBriefcase className='icon' />{job.employment_type}</p>
                    </div>
                )}

            </div>




        </div>
    );
};
export default JobCard;