import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/pageHeader/PageHeader";
import PageFooter from "../components/pageFooter/PageFooter";
import styles from "./styles.module.css";
import QuestionCard from "@/components/questionCard/QuestionCard";

const MainPage = () => {
  const [questions, setQuestions] = useState();
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const defaultFilter = "all";

  const fetchAllQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8081/questions");
      console.log("resp1", response);
      const { data } = response;
      console.log("resp2", response);
      console.log(data.question);
      setQuestions(data.question);
    } catch (err) {
      console.log("Error fetching questions:", err);
    }};

    const handleFilter = (filterType) => {
      switch (filterType) {
        case "all":
          setFilteredQuestions(questions);
          break;
        case "answered":
          setFilteredQuestions(questions.filter((question) => question.answersId.length > 0));
          break;
        case "unanswered":
          setFilteredQuestions(questions.filter((question) => question.answersId.length === 0));
          break;
        default:
          setFilteredQuestions(questions);
          break;
      }
    };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    handleFilter(defaultFilter);
  }, [questions]);
  
  return (
    <>
    <PageHeader/>

    <div className={styles.contentWrapper}>

    <div className={styles.filterOptions}>
          <label>
            <input
              type="radio"
              name="filter"
              value="all"
              checked={!filteredQuestions || filteredQuestions === questions}
              onChange={() => handleFilter("all")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="answered"
              checked={filteredQuestions && filteredQuestions !== questions && filteredQuestions.every((question) => question.answersId.length > 0)}
              onChange={() => handleFilter("answered")}
            />
            Answered
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="unanswered"
              checked={filteredQuestions && filteredQuestions !== questions && filteredQuestions.every((question) => question.answersId.length === 0)}
              onChange={() => handleFilter("unanswered")}
            />
            Unanswered
          </label>
        </div>
    
      <div className={styles.cardsWrapper}>
        {filteredQuestions && filteredQuestions.map((question) => (
          <div key={question.id}>
            <QuestionCard
              id={question.id}
              question={question.questionText}
              date={question.creationDate}
              hasAnswers={question.answersId.length > 0}
            />
          </div>
        ))}
      </div>
    </div>
    <PageFooter/>
    </>
  );
};

export default MainPage;
