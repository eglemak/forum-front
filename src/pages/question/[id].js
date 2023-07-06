import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageHeader from "../../components/pageHeader/PageHeader";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import Link from "next/link";
import trash from "../../assets/trash.svg";

const Question = () => {
  const [question, setQuestion] = useState();
  const router = useRouter();
  const questionData = router.query;

  const fetchQuestion = async () => {
    const response = await axios.get(
      `http://localhost:8081/question/${router.query.id}/answers`
    );

    const { data } = response;
    setQuestion(data.response);
    console.log("response", response);
  };



const deleteAnswer = async (id, answerId) => {

    const userToken = localStorage.getItem("token");
    const headers = {
  'Authorization': userToken
}
    console.log("id", id);
    console.log("answerId", answerId);
    console.log(userToken);
    const response = await axios.delete(`http://localhost:8081/question/${id}/answer/${answerId}`, 
        {headers: headers}
    );

    console.log("response", response);
    
    router.reload();
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
                    <Link className={styles.link} href={{
                        pathname: "/newAnswer",
                        query: questionData
                        }}>
                        Add answer
                    </Link>
                </div>
                
                <ul className={styles.answersWrapper}>
                    {Object.values(question.question_answers).map((item, idx) => (
                        <li className={styles.answerItem} key={idx}>
                            <div className={styles.mainInfo}>
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
                            </div>
                            <button className={styles.trashButton} onClick={() => deleteAnswer(question.id, item.id)}>
                                <img src={trash.src} title="Delete answer"/>
                            </button>
                
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
