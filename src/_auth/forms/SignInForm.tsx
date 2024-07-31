import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validation";
import { z } from "zod";
import { Link,useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@/store/useUser";
const SignInForm = () => {
  const navigate= useNavigate();
  const {setUser}=useUserStore((state)=>{
    return {
    setUser:state.setUser}
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const logIn=useMutation({
    mutationFn:async (values: z.infer<typeof SignInValidation>)=>{
      const res=await fetch("/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      }).then((res)=>res.json());
      return res;
    }
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const data= await logIn.mutateAsync(values);
    setUser(data);
    navigate("/");
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          className="bg-light-2 rounded-full"
          src="/assets/National_Institute_Of_Technology_Silchar_Logo.png"
          alt="logo"
          height={100}
          width={100}
        />
        <h3 className="h3-bold pt-2">Welcome back!</h3>
        <p className="text-light-4 small-regular md:base-regular mt-2">
          Log in to your account
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {logIn.isPending ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Do not have an account?
            <Link
              to="/sign-up"
              className="text-primary-600 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
