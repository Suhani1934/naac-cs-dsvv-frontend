import { useEffect, useState } from "react";
import axios from "axios";
import CriterionCard from "../components/CriterionCard";
import "./Home.css";

export default function Home() {
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/criteria`)
      .then((res) => setCriteria(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="home-heading">CS Department NAAC Criteria</h1>
        <p className="text-muted">Click on a criterion to explore its details</p>
      </div>

      <div className="row justify-content-center">
        {criteria.map((criterion, index) => (
          <CriterionCard
            key={criterion.criterionNumber}
            number={criterion.criterionNumber}
            name={criterion.name} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
