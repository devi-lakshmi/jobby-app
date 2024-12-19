import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Navigate } from "react-router-dom";
import Header from '../Header';
import JobCard from '../Jobcard/JobCard';

import { Link } from 'react-router-dom';
import './style.css';

const Jobs = () => {
    const jwtToken = Cookies.get("jwt_token");
    const [searchInput, setSearchInput] = useState('');
    const [employementType, setEmployementType] = useState([]);
    const [salaryRange, setSalaryRange] = useState('');
    const [allJobs, setAllJobs] = useState([])
    const [jobsList, setJobsList] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [noJobsFound, setNoJobsFound] = useState(false);

    useEffect(() => {
        const fectchProfile = async () => {
            const url = "https://apis.ccbp.in/profile";
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },

            };
            try {
                const response = await fetch(url, options);
                if (response.ok === true) {
                    const data = await response.json();

                    setProfileData(data.profile_details);

                } else {
                    console.error('Error:', response);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fectchProfile();

    }, [jwtToken]);

    //fetch jobs based on fillters
    const fetchJObs = async () => {
        setIsLoading(true);

        const employmentTypeString = employementType.join(",");
        const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${salaryRange}`;

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                setAllJobs(data.jobs);
                setJobsList(data.jobs);

                setIsLoading(false);
                if (data.jobs.length === 0) {
                    setNoJobsFound(true);
                } else {
                    setNoJobsFound(false);
                }
            } else {
                console.error('Error fetching jobs:', response);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }

    };
    // Fetch jobs when component mounts
    useEffect(() => {
        if (jwtToken) {
            fetchJObs();//fetch jobs whenever filters change
        }

    }, [jwtToken],);


    useEffect(() => {
        if (searchInput === '') {
            setJobsList(allJobs);

            setNoJobsFound(allJobs.length === 0);
        } else {
            const fillteredJobs = allJobs.filter(job => job.title.toLowerCase().includes(searchInput.toLowerCase()));
            setJobsList(fillteredJobs);
            setNoJobsFound(fillteredJobs.length === 0);

        }


    }, [searchInput, allJobs]);

    // Handle search input change
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);

    };
    // Handle search submit
    const handleSearchSubmit = (event) => {
        event.preventDefault();


        if (event.key === 'Enter') {
            fetchJObs();
        }
    };
    // Clear search input
    const clearSearchInput = () => {
        setSearchInput('');
    };

    // Handle employment type change
    const handleEmploymentTypeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setEmployementType((preTypes) => [...preTypes, value]);
        } else {
            setEmployementType((preTypes) =>
                preTypes.filter((type) => type !== value));
        }
    };
    // Handle salary range change
    const handleSalaryRangeChange = (event) => {
        setSalaryRange(event.target.value);



    };

    if (jwtToken === undefined) {
        return <Navigate to="/login" />;

    }
    if (profileData === null) {
        return <p>Loading profile ...</p>;
    }
    return (
        <>
            <Header />
            <div className='main-container'>
                <div className='search-container'>
                    <input
                        type='search'
                        className='search-input'
                        placeholder='Search'
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />

                    <FaSearch className='search-icon' onClick={handleSearchSubmit} />
                    {searchInput && (
                        <FaTimes className='clear-icon' onClick={clearSearchInput} />
                    )}
                </div>

                <div className='sidebar'>
                    <div className='profile-card'>
                        <div className='avatar'>
                            <img src={profileData.profile_image_url} alt='profile' className='profile-image' />
                        </div>
                        <h3>{profileData.name}</h3>
                        <p>{profileData.short_bio}</p>

                    </div>

                    <div className='filtters'>

                        <div className='profile-line'></div>
                        <h4>Type of Employement</h4>
                        <ul>
                            <li><input type="checkbox" value="FULLTIME" onChange={handleEmploymentTypeChange} />Full Time</li>
                            <li><input type="checkbox" value="PARTTIME" onChange={handleEmploymentTypeChange} />Part Time</li>
                            <li><input type="checkbox" value="FREELANCE" onChange={handleEmploymentTypeChange} />Freelance</li>
                            <li><input type="checkbox" value="INTERNSHIP" onChange={handleEmploymentTypeChange} />Internship</li>
                        </ul>
                        <div className='profile-line'></div>
                        <h4 className='salary-heading'>Salary Range</h4>
                        <ul className='salary-range'>
                            <li><input type="radio" name="salary" value="1000000" onChange={handleSalaryRangeChange} />10 LPA and above</li>
                            <li><input type="radio" name="salary" value="2000000" onChange={handleSalaryRangeChange} />20 LPA and above</li>
                            <li><input type="radio" name="salary" value="3000000" onChange={handleSalaryRangeChange} />30 LPA and above</li>
                            <li><input type="radio" name="salary" value="4000000" onChange={handleSalaryRangeChange} />40 LPA and above</li>
                        </ul>

                    </div>

                </div>
                <div className='jobs-container'>

                    <div className='jobs-list'>
                        {isLoading ? (
                            <p>Loading jobs...</p>
                        ) : noJobsFound ? (
                            <div className="no-jobs">
                                <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="No jobs found" className="no-jobs-image" />
                                <h2>No Jobs Found</h2>
                                <p> We could not find any jobs. Try other filters</p>
                            </div>
                        ) : (
                            jobsList.map((job) => (
                                <Link to={`/jobs/${job.id}`} key={job.id}>
                                    <JobCard job={job} viewType="list" />
                                </Link>
                            ))


                        )}
                    </div>
                </div>
            </div >

        </>
    );
}

export default Jobs;