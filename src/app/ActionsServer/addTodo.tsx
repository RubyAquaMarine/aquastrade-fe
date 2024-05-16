"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "YOUR_SPB_URL";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey ?? "");

export default async function addTodo(formData: FormData) {
  //  "use server";// only required here if this is a function within a client component. since this is a function that is exported to a new file, we only need to say this at the tope of the file.
  const todoItem = formData.get("todo");
  if (!todoItem) {
    return;
  }
  // Save todo item to supabase database
  const { data, error } = await supabase.from("todos").insert({
    todo: todoItem,
    created_at: new Date().toISOString(),
  });

  revalidatePath("/test2");
}
