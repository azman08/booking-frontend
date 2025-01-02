"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./BookingForm.module.css";

export default function BookingForm() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch available time slots for the selected date
  const fetchAvailableSlots = async (selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings?date=${formattedDate}`
        );
        const allSlots = [
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
        ];
        const bookedSlots = response.data.map((booking) => booking.time);
        const slots = allSlots.filter((slot) => !bookedSlots.includes(slot));
        setAvailableSlots(slots);
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    }
  };

  // Update available slots whenever the date changes
  useEffect(() => {
    fetchAvailableSlots(date);
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      date: date.toISOString().split("T")[0],
      time,
      guests,
      name,
      contact,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
        bookingData
      );

      // Show success alert
      const confirmBooking = window.confirm(
        "Booking created successfully! Would you like to see the summary?"
      );
      if (confirmBooking) {
        // Redirect to the Summary page with booking data as query parameters
        const query = new URLSearchParams(bookingData).toString();
        router.push(`/summary?${query}`);
      }

      // Clear the form
      setDate(new Date());
      setTime("");
      setGuests(1);
      setName("");
      setContact("");
      setAvailableSlots([]);
    } catch (error) {
      console.error("Error booking table:", error);
      alert("Error booking table. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.bookingForm}>
      <div>
        <label className={styles.formLabel}>Date:</label>
        <div className={styles.calendarContainer}>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
      <div>
        <label className={styles.formLabel}>Time:</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className={styles.timeSelect}
        >
          <option value="">Select a time slot</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={styles.formLabel}>Number of Guests:</label>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          required
          className={styles.guestInput}
        />
      </div>
      <div>
        <label className={styles.formLabel}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.nameInput}
        />
      </div>
      <div>
        <label className={styles.formLabel}>Contact:</label>
        <input
          type="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className={styles.contactInput}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Book Table
      </button>
    </form>
  );
}
