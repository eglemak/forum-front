import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageHeader from "../../components/pageHeader/PageHeader";

const Question = () => {
  const [question, setQuestion] = useState();
  const router = useRouter();
  const fetchQuestion = async () => {
    const response = await axios.get(
      `http://localhost:8081/question/${router.query.id}/answers`,
      { userId: "1lvc0groljn42kpk" }
    );

    const { data } = response;
    setQuestion(data.question);
    console.log("response", response);
  };

  useEffect(() => {
    router.query.id && fetchQuestion();
  }, [router.query.id]);

  return (
    <>
    <PageHeader/>
    <div className={styles.pageWrapper}>
      {question && (
          
          <div className={styles.contentWrapper}>
            <h1>{question.questionText}</h1>
            <h3>{question.creationDate}</h3>
          </div>
      )}
    </div>
    </>
  );
};

export default Question;
