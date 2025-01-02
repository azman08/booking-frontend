import BookingForm from "@/components/BookingForm";
import styles from "./booking.module.css"; 

export default function BookingPage() {
  return (
    <div className={styles.bookingPage}>
      <h2 className={styles.pageTitle}>Book a Table</h2>
      <BookingForm />
    </div>
  );
}
