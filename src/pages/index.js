import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/pageHeader/PageHeader";
import styles from "./styles.module.css";
import QuestionCard from "@/components/questionCard/QuestionCard";

const MainPage = () => {
  const [questions, setQuestions] = useState();

  const fetchAllQuestions = async () => {
    const response = await axios.get("http://localhost:8081/questions");
    console.log("resp1", response);
    const { data } = response;
    console.log("resp2", response);
    console.log(data.question);
    setQuestions(data.question);
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);
  
  return (
    <>
    <PageHeader/>

    <div className={styles.contentWrapper}>
    
      <div className={styles.cardsWrapper}>
        {questions && questions.map((question) => (
          <div key={question.id}>
            <QuestionCard
              id={question.id}
              question={question.questionText}
              date={question.creationDate}
            />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MainPage;
