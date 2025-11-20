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

export const UserCreateDialog = ({
  createModalOpen,
  setCreateModalOpen,
  data,
  setData,
}) => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleUserData = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    if (inputName === "firstname") {
      setUserData({ ...userData, firstname: inputValue });
    }
    if (inputName === "lastname") {
      setUserData({ ...userData, lastname: inputValue });
    }
    if (inputName === "email") {
      setUserData({ ...userData, email: inputValue });
    }
  };

  const createUser = async () => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
      }),
    });

    // setData([...data, userData]);
    const userJSON = await fetch("/api/users");
    const users = await userJSON.json();
    setData(users);
    setCreateModalOpen(false);
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">Firstname</Label>
            <Input
              id="firstname"
              placeholder="firstname"
              name="firstname"
              value={userData.firstname}
              onChange={(e) => handleUserData(e)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Lastname</Label>
            <Input
              id="lastname"
              placeholder="lastname"
              name="lastname"
              value={userData.lastname}
              onChange={(e) => handleUserData(e)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email"
              name="email"
              value={userData.email}
              onChange={(e) => handleUserData(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onClose(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={() => createUser()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
