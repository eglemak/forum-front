import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const QuestionCard = ({ question, id, date }) => {
  return (
    <>
      <Link className={styles.link} href={`/question/${id}`}>
        <div className={styles.card}>
          <h1 className={styles.text}>{question}</h1>
          <div className={styles.date}>{date}</div>
        </div>
      </Link>
    </>
  );
};

export default QuestionCard;