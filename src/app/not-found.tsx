import Image from "next/image";
import Link from "next/link";

const Notfound = () => {
  return (
    <div className="flex h-[100dvh] w-full flex-col md:flex-row">
      <div className="flex h-full w-full items-center justify-center px-4 py-12 sm:px-6 md:w-1/2 lg:px-8">
        <div className="max-w-md space-y-4">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Error 404: Page Not Found
          </h2>
          <p className="text-center text-muted-foreground">
            Sorry, the page you requested could not be found.
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-primary/80"
              prefetch={false}
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-muted max-md:hidden md:w-1/2">
        <Image
          src="/error.svg"
          width={500}
          height={500}
          alt="Sign in illustration"
          className="max-w-[300px] lg:max-w-[450px]"
        />
      </div>
    </div>
  );
};

export default Notfound;

<div className="container flex h-[100dvh] w-full flex-col items-center justify-center gap-4 text-center">
  <h1 className="text-center text-2xl font-bold text-foreground">
    Page Not Found
  </h1>
  <p className="text-muted-foreground">
    Sorry, the page you requested could not be found.
  </p>
  <Link
    href={"/"}
    className="font-semibold transition-all hover:underline hover:underline-offset-4"
  >
    Go Home
  </Link>
</div>;
