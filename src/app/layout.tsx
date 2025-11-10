export const metadata = {
  title: "Finances",
  description: "Um bom jeito de organizar suas finanças.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
