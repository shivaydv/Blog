import Link from "next/link";

const Notfound = () => {
  return (
    <div className="container flex h-[100dvh] w-full flex-col items-center justify-center gap-4 text-center font-mono">
      <h1 className="text-2xl font-bold text-foreground text-center">Page Not Found</h1>
      <p className="text-muted-foreground">
        Sorry, the page you requested could not be found.
      </p>
      <Link
        href={"/"}
        className="font-semibold transition-all hover:underline hover:underline-offset-4"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Notfound;
