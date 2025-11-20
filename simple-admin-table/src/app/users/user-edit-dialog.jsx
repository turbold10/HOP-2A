import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const EditUserDialog = ({
  isEditDialogOpen,
  handleEditDiaglog,
  selectedUser,
  setData,
}) => {
  const [inputValues, setInputValues] = useState({
    firstname: selectedUser.firstname,
    lastname: selectedUser.lastname,
    email: selectedUser.email,
  });

  const handleInputValues = (event) => {
    const { name, value } = event.target;

    if (name === "firstname") {
      setInputValues({ ...inputValues, firstname: value });
    }
    if (name === "email") {
      setInputValues({ ...inputValues, email: value });
    }
    if (name === "lastname") {
      setInputValues({ ...inputValues, lastname: value });
    }
  };

  const editUser = async () => {
    await fetch(`/api/users/${selectedUser.id}`, {
      method: "PUT",
      body: JSON.stringify(inputValues),
    });

    const userJSON = await fetch("/api/users", { method: "GET" });
    const users = await userJSON.json();

    setData(users);

    handleEditDiaglog();
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={handleEditDiaglog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">Firstname</Label>
            <Input
              id="firstname"
              value={inputValues.firstname}
              name="firstname"
              onChange={(e) => handleInputValues(e)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Lastname</Label>
            <Input
              id="lastname"
              name="lastname"
              value={inputValues.lastname}
              onChange={(e) => handleInputValues(e)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={inputValues.email}
              onChange={(e) => handleInputValues(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={handleEditDiaglog}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => editUser()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
