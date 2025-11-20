import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { PostType } from "../page";
import { Input } from "@/components/ui/input";

type EditPostDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedPost: PostType;
};

export const EditPostDialog = ({
  isOpen,
  setIsOpen,
  selectedPost,
}: EditPostDialogProps) => {
  const [caption, setCaption] = useState(selectedPost.caption);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <Input value={caption} onChange={(e) => setCaption(e.target.value)} />
          <DialogDescription>{selectedPost.likes.length}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>cancel</Button>
          <Button>edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
