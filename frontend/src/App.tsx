import { useState } from "react";
import EditUserModal from "./components/EditUserModal";
import { useGetUsersQuery, useGetHomesByUserQuery } from "./redux/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedHome, setSelectedHome] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHomeStreetAddress, setSelectedHomeStreetAddress] =
    useState("");

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetUsersQuery();
  const {
    data: homesData,
    isLoading: isLoadingHomes,
    isError: isErrorHomes,
    refetch: refetchHomes,
  } = useGetHomesByUserQuery(
    { userId: selectedUser ?? 0, page: currentPage },
    { skip: selectedUser === null }
  );

  const handleOpenModal = (homeId: number) => {
    const selectedHome = homesData?.homes.find(
      (home) => home.homeId === homeId
    );
    setSelectedHome(homeId);
    setSelectedHomeStreetAddress(selectedHome?.street_address || "");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveComplete = () => {
    refetchHomes();
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value);
    setSelectedUser(isNaN(userId) ? null : userId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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

  return (
    <>
      <div className="flex min-h-screen flex-col pt-5 py-5">
        <div className="flex items-center font-semibold justify-end px-8 mb-5">
          <div>Select user: </div>
          {isLoadingUsers ? (
            <Skeleton width={200} height={30} />
          ) : (
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
          )}
        </div>
        <div className="px-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 flex-grow">
          {selectedUser === null ? (
            <div className="col-span-full flex justify-center items-center h-full">
              nothing to show
            </div>
          ) : isLoadingHomes ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="shadow-lg p-4">
                <Skeleton height={30} width="80%" />
                <Skeleton count={6} />
                <Skeleton height={40} width="50%" className="mt-3" />
              </div>
            ))
          ) : isErrorHomes ? (
            <div className="col-span-full flex justify-center items-center h-full">
              Error loading homes. Please try again later.
            </div>
          ) : homesData && homesData.homes.length > 0 ? (
            <>
              {homesData.homes.map((home) => (
                <div key={home.homeId} className="shadow-lg p-4">
                  <div className="flex flex-col w-3/4 text-sm gap-y-1">
                    <h1 className="text-2xl font-bold">
                      {home.street_address}
                    </h1>
                    <p>List Price: ${home.list_price?.toLocaleString()}</p>
                    <p>State: {home.state}</p>
                    <p>Zip: {home.zip}</p>
                    <p>Sqft: {home.sqft}</p>
                    <p>Beds: {home.beds}</p>
                    <p>Baths: {home.baths}</p>
                    <button
                      onClick={() => handleOpenModal(home.homeId)}
                      className="p-2 mt-3 w-1/2 font-semibold text-white bg-blue-500 rounded-md"
                    >
                      Edit Users
                    </button>
                  </div>
                </div>
              ))}
              <div className="col-span-full flex justify-center items-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span className="mx-2">
                  Page {currentPage} of {homesData.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === homesData.totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="col-span-full flex justify-center items-center h-full">
              No homes found for this user.
            </div>
          )}
        </div>
      </div>
      {isModalOpen && selectedHome !== null && (
        <EditUserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSaveComplete={handleSaveComplete}
          homeId={selectedHome}
          homeStreetAddress={selectedHomeStreetAddress}
        />
      )}
    </>
  );
}

export default App;
