"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";

const Users = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const userJSON = await fetch("/api/users");
    const users = await userJSON.json();
    setData(users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TypographyH3>Хэрэглэгчид</TypographyH3>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Шинээр нэмэх
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable data={data} setData={setData} />
          <div className="flex justify-center p-8">
            <Button variant="outline">Load more...</Button>
          </div>
        </CardContent>
      </Card>
      <UserCreateDialog
        data={data}
        setData={setData}
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
      />
    </div>
  );
};

export default Users;
