import { useState } from "react";
import EditUserModal from "./components/EditUserModal";
import { useGetUsersQuery, useGetHomesByUserQuery } from "./redux/api";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetUsersQuery();
  const {
    data: homes,
    isLoading: isLoadingHomes,
    isError: isErrorHomes,
  } = useGetHomesByUserQuery(selectedUser ?? 0, {
    skip: selectedUser === null,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    // TODO: Handle On save
    setIsModalOpen(false);
  };

  if (isLoadingUsers) {
    return <div className="pt-5 flex items-center">Loading users...</div>;
  }

  if (isErrorUsers) {
    return (
      <div className="pt-5 flex items-center">
        Error loading users. Please try again later.
      </div>
    );
  }

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value);
    setSelectedUser(isNaN(userId) ? null : userId);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col pt-5">
        <div className="flex items-center font-semibold justify-end px-8 mb-5">
          <div>Select user: </div>
          <select
            name="users"
            id="users"
            className="border border-gray-200 rounded-md mx-4 px-2 py-1"
            onChange={handleUserChange}
            value={selectedUser ?? ""}
          >
            <option value="">None</option>
            {users?.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="px-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 flex-grow">
          {selectedUser === null ? (
            <div className="col-span-full flex justify-center items-center h-full">
              nothing to show
            </div>
          ) : isLoadingHomes ? (
            <div className="col-span-full flex justify-center items-center h-full">
              Loading homes...
            </div>
          ) : isErrorHomes ? (
            <div className="col-span-full flex justify-center items-center h-full">
              Error loading homes. Please try again later.
            </div>
          ) : homes && homes.length > 0 ? (
            homes.map((home) => (
              <div key={home.homeId} className="shadow-lg p-4">
                <div className="flex flex-col w-3/4 text-sm gap-y-1">
                  <h1 className="text-2xl font-bold">{home.street_address}</h1>
                  <p>List Price: ${home.list_price?.toLocaleString()}</p>
                  <p>State: {home.state}</p>
                  <p>Zip: {home.zip}</p>
                  <p>Sqft: {home.sqft}</p>
                  <p>Beds: {home.beds}</p>
                  <p>Baths: {home.baths}</p>
                  <button
                    onClick={handleOpenModal}
                    className="p-2 mt-3 w-1/2 font-semibold text-white bg-blue-500 rounded-md"
                  >
                    Edit Users
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-full">
              No homes found for this user.
            </div>
          )}
        </div>
      </div>
      <EditUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
      />
    </>
  );
}

export default App;
