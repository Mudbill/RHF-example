import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  customer: z.object({
    email: z.string().email(),
    type: z.string().min(5),
  }),
});

type Schema = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((values) => {
    console.log("submitted", values);
  });

  return (
    <form onSubmit={onSubmit}>
      <label>Email:</label> <span style={{ color: "red" }}>{errors.customer?.email?.message}</span>
      <input {...register("customer.email")} />
      <label>Type:</label> <span style={{ color: "red" }}>{errors.customer?.type?.message}</span>
      <input {...register("customer.type")} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
