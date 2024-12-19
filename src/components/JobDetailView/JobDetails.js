import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import JobCard from "../Jobcard/JobCard";
import Header from "../Header";
import "./style.css";
const JobDetails = () => {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);



    useEffect(() => {

        const fetchJobDetails = async () => {
            const jwtToken = Cookies.get('jwt_token');
            const url = `https://apis.ccbp.in/jobs/${id}`;
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
                    console.log("fecthed job details", data);
                    setJobDetails(data);

                } else {
                    setError('Failed to fetch the job details');
                }
                setIsLoading(false);
            } catch (error) {
                setError(" Error occured while fetching the job details");
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobDetails();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;

    }
    if (!jobDetails) {
        return <p>Job Details Not Found</p>;
    }

    const { job_details, similar_jobs } = jobDetails;
    console.log("Job Details:", job_details);
    console.log("Similar Jobs:", similar_jobs);

    return (
        <>
            <Header />
            <div className="job-details-container" >
                <JobCard job={job_details} viewType="detail" />
                <div className="skils">

                    <h1 className="skills-heading">Skills</h1>

                    <ul className="skills-list">
                        {job_details.skills.map((skill, index) => (
                            <li className="skill-item" key={index}>
                                <img src={skill.image_url} alt={skill.name} className="skill-img" />
                                <h1>{skill.name}</h1>
                            </li>
                        ))}
                    </ul>

                    <h1 className="life_at_company_heading">Life at company</h1>
                    <div className="life-at-company" >

                        <p>{job_details.life_at_company.description}</p>
                        <img src={job_details.life_at_company.image_url} alt="life at company" className="life-at-company-img" />
                    </div>

                </div>
            </div>

            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <div className="similar-jobs">
                {similar_jobs.map((similarJob, index) => (
                    <div className="similar-job-item">
                        <JobCard job={similarJob} viewType="similar" key={index} />
                    </div>
                ))}

            </div>


        </>
    );
};
export default JobDetails;