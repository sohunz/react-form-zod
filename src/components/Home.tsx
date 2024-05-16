import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";

const schema = z.object({
    email: z.string().email().email().toLowerCase(),
    password: z.string().min(8),
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
            className="bg-gray-900 p-10 rounded-2xl"
        >
            <div className="mb-5 w-[500px]">
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full border border-gray-600 py-3  px-4 outline-none rounded-md bg-gray-900"
                />
                {errors.email && (
                    <div className="text-red-600">{errors.email.message}</div>
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
                    <div className="text-red-600">
                        {errors.password.message}
                    </div>
                )}
            </div>

            <button
                disabled={isSubmitting}
                type="submit"
                className="py-2 px-4 bg-violet-700 text-white rounded-md"
            >
                {isSubmitting ? "Loading..." : "Submit"}
            </button>
        </form>
    );
};

export default Home;
