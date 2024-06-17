// components/AddItemForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const AddItemForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.from('items').insert([{ name: formData.get('name') as string }]);
    if (error) {
      setError(error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center border w-2/3 m-4 p-5">
    <form onSubmit={handleSubmit} >
      <Input name="name" placeholder="Item's name" className=" my-4" />
      <Button type="submit" className="">Add Item</Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
    </div>
  );
};

export default AddItemForm;