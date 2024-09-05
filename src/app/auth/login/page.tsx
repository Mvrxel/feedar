// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { signIn } from "next-auth/react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Icons } from "@/components/ui/icons";
// import { useSearchParams } from "next/navigation";

// function LoginPage() {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isError, setIsError] = useState<boolean>(false);
//   const [email, setEmail] = useState<string>("");

//   const searchParams = useSearchParams();

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);
//     try {
//       await signIn("email", { email });
//       setIsError(false);
//     } catch (error) {
//       console.error(error);
//       setIsError(true);
//     }
//     setIsLoading(false);
//   }

//   return (
//     <Card className="z-10 mx-auto w-[500px] bg-zinc-950 py-4">
//       <CardHeader>
//         <CardTitle className="text-xl">Create an account</CardTitle>
//         <CardDescription>
//           Enter your email below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {searchParams.get("callbackUrl") == "/auth/verify" ? (
//           <Alert className="mb-4">
//             <AlertTitle>Email has been sent</AlertTitle>
//             <AlertDescription>
//               Check your inbox, we have sent you an email with a link to login!
//               If you dont see it, check your spam folder.
//             </AlertDescription>
//           </Alert>
//         ) : null}
//         <form onSubmit={onSubmit}>
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="john.deo@example.com"
//                 required
//                 autoCapitalize="none"
//                 autoComplete="email"
//                 autoCorrect="off"
//                 disabled={isLoading}
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value)}
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               {isLoading && (
//                 <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//               )}
//               Continue with Email
//             </Button>
//             <Separator></Separator>
//             <Button variant="outline" className="w-full">
//               Sign up with Gmail
//             </Button>
//             <div>
//               {isError ? (
//                 <Alert>
//                   <AlertTitle>Email not white-listed</AlertTitle>
//                   <AlertDescription>
//                     We are sorry, but the email you entered is not white-listed.
//                     Please contact marcel.bilski@anzuro.com if you want to test
//                     Replio in beta.
//                   </AlertDescription>
//                 </Alert>
//               ) : null}
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

// export default LoginPage;
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/ui/icons";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const searchParams = useSearchParams();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signIn("email", { email });
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
    setIsLoading(false);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950">
      {/* Left side - Image and Quote */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-12 lg:flex lg:w-1/2">
        <div className="text-white">
          <Image src="/logo-dark.png" alt="Logo" width={200} height={200} />
        </div>
        <div className="text-white">
          <h1 className="mb-4 text-6xl font-bold leading-tight">
            Get Everything You Want
          </h1>
          <p className="text-xl">
            You can get everything you want if you work hard, trust the process,
            and stick to the plan.
          </p>
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="flex w-full items-center justify-center p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Hello!
            </h2>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email or connect with Google to access your account
          </p>
          {searchParams.get("callbackUrl") == "/auth/verify" ? (
            <Alert className="mb-4">
              <AlertTitle>Email has been sent</AlertTitle>
              <AlertDescription>
                Check your inbox, we have sent you an email with a link to
                login! If you dont see it, check your spam folder.
              </AlertDescription>
            </Alert>
          ) : null}
          <form className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 dark:bg-zinc-900 dark:text-white"
                disabled={isLoading}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <Button
              className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
              disabled={isLoading}
              onClick={onSubmit}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}{" "}
              Continue with email
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <div className="relative">
            <Separator className="my-4" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500 dark:bg-zinc-950">
              or
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full dark:bg-white dark:text-black"
            disabled={true}
          >
            <Mail className="mr-2 h-4 w-4" />
            Sign In with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
