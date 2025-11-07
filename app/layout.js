export const metadata = {
  title: "Investment Allocation - INR 1,50,000",
  description: "Suggested sector allocation with ETFs and crypto picks"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial',
        color: '#0f172a',
        background: '#f8fafc',
        margin: 0
      }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '28px 20px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
