"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { AuthFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: String }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const formSchema = AuthFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const newUser = await signUp(data)
        setUser(newUser);
      }

      if (type === "sign-in") {
      //   const response = await signIn({
      //     email: data.email,
      //     password: data.password
      //   });
      //   if (response) {
      //     router.push("/");
      //   // }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer items-center gap-1 flex'>
          <Image
            src='../icons/logo.svg'
            width={34}
            height={34}
            alt='horizon logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
            Bank App
          </h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold font-gray-900'>
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>{/* Plaid Link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type === "sign-up" ? (
                <>
                  <div className='flex gap-4'>
                    {" "}
                    <CustomInput
                      control={form.control}
                      name='firstName'
                      label='First Name'
                      placeholder='Enter your first name'
                    />
                    <CustomInput
                      control={form.control}
                      name='lastName'
                      label='Last Name'
                      placeholder='Enter your last name'
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name='address'
                    label='Address'
                    placeholder='Enter your address'
                  />
                  <CustomInput
                    control={form.control}
                    name='city'
                    label='City'
                    placeholder='Enter your address'
                  />
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='state'
                      label='State'
                      placeholder='Example: MN'
                    />
                    <CustomInput
                      control={form.control}
                      name='postalCode'
                      label='Postal Code'
                      placeholder='Example: 55123'
                    />
                  </div>
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='dateOfBirth'
                      label='Date Of Birth'
                      placeholder='MM-DD-YYYY'
                    />
                    <CustomInput
                      control={form.control}
                      name='ssn'
                      label='SSN'
                      placeholder='Ex: 1234'
                    />
                  </div>
                </>
              ) : null}
              <CustomInput
                control={form.control}
                name='email'
                label='Email'
                placeholder='Enter your email'
              />
              <CustomInput
                control={form.control}
                name='password'
                label='Password'
                placeholder='Enter your password'
              />
              <div className='flex flex-col gap-4'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className='form-link'
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
