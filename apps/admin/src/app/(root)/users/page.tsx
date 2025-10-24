import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getUsers } from "@/lib/actions/user.action";
import { User } from "@clerk/nextjs/server";

const UsersPage = async () => {
  const res = await getUsers();
  const users: User[] = res?.data || [];

  console.log({ users }, "<--userPage");

  return (
    <div className="b-sky-500 page pb-20">
      {/* Header */}
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersPage;
