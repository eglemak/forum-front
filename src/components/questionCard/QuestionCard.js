import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import trash from "../../assets/trash.svg";

const QuestionCard = ({ question, id, date }) => {

  const router = useRouter();

  const userToken = localStorage.getItem("token");
  const headers = {
    'Authorization': userToken
  }

  const deleteQuestion = async () => {
    
    console.log(userToken);
    const response = await axios.delete(`http://localhost:8081/question/${id}`, 
        {headers: headers}
    );

    console.log("response", response);
    router.reload();
  };



  return (
    <>
      <div className={styles.wrapper}>
        <Link className={styles.link} href={`/question/${id}`}>
          <div className={styles.card}>
            <h1 className={styles.text}>{question}</h1>
            <div className={styles.date}>{date}</div>
          </div>
          
        </Link>

        <button onClick={() => deleteQuestion()}>
          <img src={trash.src} title="Delete question"/>
        </button>
      </div>
      

    </>
  );
};

export default QuestionCard;