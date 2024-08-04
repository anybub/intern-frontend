import CandidateCard from "../../../components/shared/candidateCard";
import { useQuery } from "@tanstack/react-query";
import useUserStore, { UserType } from "@/store/useUser";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { AddVoterValidation } from "@/lib/validation";
interface Props {
    electionId: string;
}
const AddVoters = ({ electionId }: Props) => {
    const q = useQueryClient();
    const { toast } = useToast();
    const user = useUserStore((state) => state.user);
    const form = useForm<z.infer<typeof AddVoterValidation>>({
        resolver: zodResolver(AddVoterValidation),
        defaultValues: {
            startingScholarId: "",
            endingScholarId: "",
        },
    });
    const { isPending, data } = useQuery({
        queryKey: ["getVoters"],
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:5000/api/v1/election/getVoters?electionId=${electionId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            ).then((res) => res.json());
            return res.data;
        },
    });
    const addVoter = useMutation({
        mutationKey: ["addVoter"],
        mutationFn: async (values: z.infer<typeof AddVoterValidation>) => {
            const res = await fetch(
                `http://localhost:5000/api/v1/election/addVoter`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify({
                        startingScholarId: values.startingScholarId,
                        endingScholarId: values.endingScholarId,
                        electionId: electionId,
                    }),
                }
            ).then((res) => res.json());
            return res;
        },
    });
    const onSubmit = async (values: z.infer<typeof AddVoterValidation>) => {
        try {
            await addVoter.mutateAsync(values);
            await q.invalidateQueries({
                queryKey: ["getVoters"],
                exact: true,
                refetchType: "active",
            });
            form.reset();
            toast({
                title: "Voters added successfully",
                variant: "default",
                description: "Voters added successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "Something went wrong",
            });
        }
    };
    return (
        <div className="container mx-auto p-4 bg-dark-2 ">
            <div className="flex flex-col items-center justify-center m-2">
                <Form {...form}>
                    <div className="sm:w-420 flex-center flex-col">
                        <img
                            className="bg-light-2 rounded-full"
                            src="/assets/National_Institute_Of_Technology_Silchar_Logo.png"
                            alt="logo"
                            height={100}
                            width={100}
                        />
                        <h3 className="h3-bold pt-2">Add the Voters</h3>
                        <p className="text-light-4 small-regular md:base-regular mt-2">
                            Give the starting and ending scholar ID of the
                            voters you want to add
                        </p>

                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-3 w-full mt-2">
                            <FormField
                                control={form.control}
                                name="startingScholarId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="shad-form_label">
                                            Starting Scholar ID
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            Give Valid Scholar Id{" "}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endingScholarId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="shad-form_label">
                                            Ending Scholar ID
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            Give Valid ending scholar Id
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="shad-button_primary">
                                {addVoter.isPending ? (
                                    <div className="flex-center gap-2">
                                        <Loader /> Loading...
                                    </div>
                                ) : (
                                    "Add Voters"
                                )}
                            </Button>
                        </form>
                    </div>
                </Form>
            </div>
            <div className="flex flex-col mt-8">
                <h1>Already Added Voters</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-6">
                    {isPending && <p>Loading...</p>}
                    {data &&
                        data.map((e: Partial<UserType>) => (
                            <CandidateCard
                                key={e?.scholarId}
                                initial={true}
                                username={e?.username || ""}
                                branch={e?.branch || ""}
                                scholarId={e?.scholarId || ""}
                                candidateId={""}
                                electionId={electionId}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AddVoters;
