// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Restaurant Table Booking</title>
        <link rel="stylesheet" href="../styles/globals.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
