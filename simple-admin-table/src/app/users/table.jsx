"use client";

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Settings } from "lucide-react";
import { EditUserDialog } from "./user-edit-dialog";
import { useState } from "react";

export function UsersTable(props) {
  const { data, setData } = props;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditDiaglog = () => {
    setIsEditDialogOpen((prev) => !prev);
  };

  const editUser = (user) => {
    setSelectedUser(user);
    handleEditDiaglog();
  };

  const deleteUser = async (userId) => {
    await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    const newUsers = data.filter((user) => user.id !== userId);
    setData(newUsers);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input placeholder="Нэрээр хайх..." className="max-w-sm" />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1">#</TableHead>
              <TableHead className="w-1">Зураг</TableHead>
              <TableHead className="w-1">Овог</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>И-Мэйл</TableHead>
              <TableHead className="w-1">
                <Settings />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableHead>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.imageUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableHead>
                <TableHead>{user.lastname}</TableHead>
                <TableHead>{user.firstname}</TableHead>
                <TableHead>{user.email}</TableHead>
                <TableHead className="w-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText("temkanibno@gmail.com")
                        }
                      >
                        Copy Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => editUser(user)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteUser(user.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedUser ? (
        <EditUserDialog
          setData={setData}
          isEditDialogOpen={isEditDialogOpen}
          selectedUser={selectedUser}
          handleEditDiaglog={handleEditDiaglog}
        />
      ) : null}
    </div>
  );
}
