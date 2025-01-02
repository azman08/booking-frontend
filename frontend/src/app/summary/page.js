"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./summary.module.css"; 
export default function Summary() {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookingData = {
      date: params.get("date"),
      time: params.get("time"),
      guests: params.get("guests"),
      name: params.get("name"),
      contact: params.get("contact"),
    };
    setBookingDetails(bookingData);
  }, []);

  return (
    <div className={styles.summaryContainer}>
      <h1 className={styles.summaryTitle}>Booking Summary</h1>
      <div className={styles.summaryCard}>
        <p className={styles.summaryDetail}>
          <span className="font-bold">Date:</span> {bookingDetails.date}
        </p>
        <p className={styles.summaryDetail}>
          <span className="font-bold">Time:</span> {bookingDetails.time}
        </p>
        <p className={styles.summaryDetail}>
          <span className="font-bold">Number of Guests:</span>{" "}
          {bookingDetails.guests}
        </p>
        <p className={styles.summaryDetail}>
          <span className="font-bold">Name:</span> {bookingDetails.name}
        </p>
        <p className={styles.summaryDetail}>
          <span className="font-bold">Contact:</span> {bookingDetails.contact}
        </p>
      </div>
      <button onClick={() => router.back()} className={styles.backButton}>
        Back to Booking
      </button>
    </div>
  );
}
