"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/ui/icons";
import { useSearchParams } from "next/navigation";

function LoginPage() {
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

  return (
    <Card className="z-10 mx-auto w-[500px] bg-zinc-950 py-4">
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {searchParams.get("callbackUrl") == "/auth/verify" ? (
          <Alert className="mb-4">
            <AlertTitle>Email has been sent</AlertTitle>
            <AlertDescription>
              Check your inbox, we have sent you an email with a link to login!
              If you dont see it, check your spam folder.
            </AlertDescription>
          </Alert>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.deo@example.com"
                required
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue with Email
            </Button>
            <Separator></Separator>
            <Button variant="outline" className="w-full">
              Sign up with Gmail
            </Button>
            <div>
              {isError ? (
                <Alert>
                  <AlertTitle>Email not white-listed</AlertTitle>
                  <AlertDescription>
                    We are sorry, but the email you entered is not white-listed.
                    Please contact marcel.bilski@anzuro.com if you want to test
                    Replio in beta.
                  </AlertDescription>
                </Alert>
              ) : null}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
