import { useState } from "react";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const [loading, setLoading] = useState(false);
  console.log(`request to delete : ${item}`)

  const onDelete = async () => {
    try {
      setLoading(true);
      let itemType;
      switch (item) {
        case "product":
          itemType = "products";
          break;
        case "collections":
          itemType = "collections";
          break;
        case "categories":
          itemType = "categories";
          break;
        case "limitedoffer":
          itemType = "LimitedOffers";
          break;
        case "specialoffer":
          itemType = "SpecialOffers";
          break;
        default:
          throw new Error("Unsupported item type");
      }
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });

      console.log("delete product : ")
      console.log(res)
      if (res.ok) {
        console.log("res okay")
        setLoading(false);
        window.location.href = `/${itemType}`;
        toast.success(`${item} deleted`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-1 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
