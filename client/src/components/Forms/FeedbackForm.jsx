import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { handleAxiosError } from "@/utils/handlerAxiosError";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

function FeedbackForm({ setIsOpen }) {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "bug-report",
    }
  });

  const handleFeedbackSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/users/feedback`,
        data,
        { withCredentials: true }
      );
      
      if (res.data.success) {
        toast.success("Feedback sent successfully");
      } else {
        if (typeof res.data.data.error === "string") {
          toast.error(res.data.data.error)
        } else {
          console.log(res.data.data.error)
          toast.error("Failed to send feedback");
        }
      }

    } catch (error) {
      handleAxiosError(error, navigate);
    } finally {
      setLoading(false);
      setIsOpen(false)
    }
  };

  return (
    <div className="dark:text-white flex flex-col w-full sm:max-w-96 justify-center items-center space-y-3">
      <form
        className="h-4/5 flex flex-col space-y-4 w-full justify-center items-center"
        onSubmit={handleSubmit(handleFeedbackSubmit)}
      >

        <Controller
          name="type"
          control={control}
          rules={{ required: "Please select a type" }}
          render={({ field: { onChange, value } }) => (
            <Select defaultValue="bug-report" value={value} onValueChange={onChange}>
              <SelectTrigger className="sm:max-w-96 text-zinc-800 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 border-zinc-800">
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent
                className="dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
              >
                <SelectGroup>
                  <SelectItem value="bug-report">Report a bug</SelectItem>
                  <SelectItem value="suggest-feature">Suggest a new feature</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <Input
          id="title"
          type="text"
          placeholder="Enter title"
          {...register("title", { required: "Title is required" })}
        />

        <Textarea
          id="description"
          placeholder="Enter description"
          {...register("description", {
            required: "Description is required",
          })}
        />

        {loading ? (
          <Button
            disabled
            className="dark:bg-zinc-300 bg-zinc-900 dark:text-zinc-950 text-zinc-200 hover:bg-zinc-800 dark:hover:bg-zinc-400/90 font-semibold w-full cursor-wait"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin dark:text-white" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="dark:bg-zinc-300 bg-zinc-900 dark:text-zinc-950 text-zinc-200 hover:bg-zinc-800 dark:hover:bg-zinc-400/90 font-semibold w-full"
          >
            Submit feedback
          </Button>
        )}
      </form>
    </div>
  )
}

export default FeedbackForm