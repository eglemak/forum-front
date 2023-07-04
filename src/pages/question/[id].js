import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageHeader from "../../components/pageHeader/PageHeader";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";

const Question = () => {
  const [question, setQuestion] = useState();
  const router = useRouter();
  const fetchQuestion = async () => {
    const response = await axios.get(
      `http://localhost:8081/question/${router.query.id}/answers`
    //   ,
    //   { userId: "1lvc0groljn42kpk" }
    );

    const { data } = response;
    setQuestion(data.response);
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
                <div className={styles.questionWrapper}>
                    <h1>{question.questionText}</h1>
                </div>
                
                <ul className={styles.answersWrapper}>
                    {Object.values(question.question_answers).map((item, idx) => (
                        <li className={styles.answerItem} key={idx}>
                            <div className={styles.likes}>
                                <img className={styles.button} src={like.src} />
                                {item.gainedLikes}
                                <img className={styles.button} src={dislike.src} />
                            </div>
                            <div className={styles.info}>
                                {item.answerText}
                                <br/>
                                {item.creationDate}
                            </div>
 
                        </li>
                    ))}
                </ul>
            </div>

        )}
        </div>
    </>
  );
};

export default Question;
