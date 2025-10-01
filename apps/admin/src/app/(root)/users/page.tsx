import { getUsers } from "@/lib/constants";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const UsersPage = async () => {
  const users = await getUsers();

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
