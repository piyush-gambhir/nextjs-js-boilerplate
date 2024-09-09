export default function RootLayout({ children }) {
  return (
    <div className="mx-4 my-8 max-w-2xl antialiased lg:mx-auto">
      <div className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
        {children}
      </div>
    </div>
  );
}
