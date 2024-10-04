export default function SchoolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <div></div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
