import '@/assets/styles/globals.css';

export const metadata = {
  title: "PropertiesPulse",
  description: "Find your dream property"
}

function layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default layout;
