export function AppFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-xs text-muted-foreground">
            © All Rights Reserved {new Date().getFullYear()}
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Balochistan Information Technology Board
          </p>
        </div>
      </div>
    </footer>
  );
}
