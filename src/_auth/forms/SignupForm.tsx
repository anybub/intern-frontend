import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import { Link } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUser";
import { useMutation } from "@tanstack/react-query";
const SignupForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore((state) => {
    return {
      setUser: state.setUser,
    };
  });
  const signUp = useMutation({
    mutationFn: async (values: z.infer<typeof SignupValidation>) => {
      const res = await fetch("http://localhost:5000/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());
      return res;
    },
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      scholarId: "",
      email: "",
      password: "",
      address: "",
      branch: "cse",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    try {
      const data = await signUp.mutateAsync(values);
      setUser(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  form.watch();
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
        <h3 className="h3-bold pt-2">Create a new account</h3>
        <p className="text-light-4 small-regular md:base-regular mt-2">
          Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                    placeholder="Enter your username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scholarId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Scholar ID</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                    placeholder="2114056"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                    placeholder="abc@ece.nits.ac.in"
                  />
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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  MetaMask Address
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage about="Provide Metamask Account Address" />
                <FormDescription about="Provide Metamask Address"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Select Branch</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your Branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cse">CSE</SelectItem>
                    <SelectItem value="ece">ECE</SelectItem>
                    <SelectItem value="me">Mech</SelectItem>
                    <SelectItem value="ce">Civil</SelectItem>
                    <SelectItem value="eie">EIE</SelectItem>
                    <SelectItem value="ee">EE</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {signUp.isPending ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-600 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
