import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar as CalenderIcon} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { ElectionValidation } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
interface CreateElectionProps {
  setElectionId: (id: string) => void;
}
const CreateElection = ({setElectionId}:CreateElectionProps) => {
  const {toast} = useToast();
  const form = useForm<z.infer<typeof ElectionValidation>>({
    resolver: zodResolver(ElectionValidation),
    defaultValues: {
      name: "",
      post: "GS",
      startTime: new Date(),
      desp: "",
    },
  });
  const makeElection = useMutation({
    mutationFn: async (values: z.infer<typeof ElectionValidation>) => {
      const res = await fetch("http://localhost:5000/api/v1/election", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());
      return res;
    },
  });
  async function onSubmit(values: z.infer<typeof ElectionValidation>) {
    try{
      const data= await makeElection.mutateAsync(values);
      toast({
        title: "Election Created",
        description: "Election has been created successfully",
      });
      setElectionId(data.data._id);
    }catch{
      toast({
        title: "Election Creation Failed",
        description: "Failed to create election",
        variant: "destructive",
      });
    }
  }
  form.watch();
  return (
    <div className="flex items-center justify-center bg-dark-2 p-2 h-[100%]">
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img
            className="bg-light-2 rounded-full"
            src="/assets/National_Institute_Of_Technology_Silchar_Logo.png"
            alt="logo"
            height={100}
            width={100}
          />
          <h3 className="h3-bold pt-2">Create Election</h3>
          <p className="text-light-4 small-regular md:base-regular mt-2">
            Make election using your Metamask Address
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Name Of Election
                  </FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Despcription of Election
                  </FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="post"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Select Branch
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select The Post" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GS">GS</SelectItem>
                      <SelectItem value="VP">Vp</SelectItem>
                      <SelectItem value="TS">TS</SelectItem>
                      <SelectItem value="CR">CR</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="shad-form_label">Start Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalenderIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Election will start at 12:00 AM on the selected date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="shad-button_primary"
              disabled={makeElection.isPending}
            >
              {makeElection.isPending
                ? "Creating Election..."
                : "Create Election"}
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default CreateElection;
