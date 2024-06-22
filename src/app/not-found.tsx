import Image from "next/image";
import Link from "next/link";

const Notfound = () => {
  return (
    <div className="flex flex-col h-[100dvh] w-full md:flex-row ">
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full md:w-1/2 h-full">
          
        <div className="space-y-4 max-w-md">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Error 404: Page Not Found
          </h2>
        <p className="text-muted-foreground text-center">
              Sorry, the page you requested could not be found.
            </p>
          <div className="flex justify-center">
              <Link href="/" className="text-sm font-medium text-primary hover:text-primary/80" prefetch={false}>
                Go Home
              </Link>
            </div>
        </div>
      
    </div>
    <div className="flex items-center justify-center w-full max-md:hidden md:w-1/2 bg-muted">
      <Image src="/error.svg" width={500} height={500} alt="Sign in illustration" className="max-w-[300px] lg:max-w-[450px]" />
    </div>
  </div>
  );
};

export default Notfound;

<div className="container flex h-[100dvh] w-full flex-col items-center justify-center gap-4 text-center ">
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