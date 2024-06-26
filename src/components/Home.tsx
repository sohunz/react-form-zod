import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import Loading from "./Loading";

const schema = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(8).trim(),
    fistName: z.string().min(1),
    lastName: z.string().min(1),
});

type InputFields = z.infer<typeof schema>;

const Home = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<InputFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<InputFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-900 p-10 rounded-2xl shadow-lg"
        >
            <p className="text-center font-semibold text-xl mb-10">Sign Up</p>
            <div className="mb-5 w-[550px]">
                <div className="w-full flex flex-row justify-between gap-4">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="First Name"
                            {...register("fistName")}
                            className="w-full border border-gray-600 py-3  px-4 outline-none rounded-md bg-gray-900"
                        />
                        {errors.fistName && (
                            <div className="text-red-600 text-[14px] mt-2">
                                {errors.fistName.message}
                            </div>
                        )}
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Last Name"
                            {...register("lastName")}
                            className="w-full border border-gray-600 py-3  px-4 outline-none rounded-md bg-gray-900"
                        />
                        {errors.lastName && (
                            <div className="text-red-600 text-[14px] mt-2">
                                {errors.lastName.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mb-5 w-[550px]">
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full border border-gray-600 py-3  px-4 outline-none rounded-md bg-gray-900"
                />
                {errors.email && (
                    <div className="text-red-600 text-[14px] mt-2">
                        {errors.email.message}
                    </div>
                )}
            </div>
            <div className="mb-5">
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className="w-full border border-gray-600 py-3  px-4 outline-none rounded-md bg-gray-900"
                />
                {errors.password && (
                    <div className="text-red-600 text-[14px] mt-2">
                        {errors.password.message}
                    </div>
                )}
            </div>

            <button
                disabled={isSubmitting}
                type="submit"
                className="py-2 px-4 bg-violet-700 text-blue rounded-md"
            >
                {isSubmitting ? <Loading /> : "Submit"}
            </button>
        </form>
    );
};

export default Home;
