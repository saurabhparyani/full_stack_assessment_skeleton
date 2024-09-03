import { useState } from "react";
import EditUserModal from "./components/EditUserModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div className="flex min-h-screen flex-col pt-5">
        <div className="flex items-center justify-end px-8 mb-5">
          <div>Select user: </div>
          <select
            name="users"
            id="users"
            className="border border-gray-200 rounded-md mx-4 px-2 py-1"
          >
            {/* TODO: Add options here */}
            <option value="0">None</option>
            <option value="1">user1</option>
            <option value="2">user2</option>
            <option value="3">user3</option>
            <option value="4">user4</option>
            <option value="5">user5</option>
            <option value="6">user6</option>
            <option value="7">user7</option>
          </select>
        </div>
        <div className="px-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="shadow-lg p-4">
              <div className="flex flex-col w-full gap-y-1">
                <h1 className="text-2xl font-bold">Very very long address</h1>
                <p>List Price: $47246123868453</p>
                <p>State: Arizona</p>
                <p>Zip: 05378</p>
                <p>Sqft: 2945.89</p>
                <p>Beds: 1</p>
                <p>Baths: 3</p>
                <button
                  onClick={handleOpenModal}
                  className="p-2 mt-3 font-semibold text-white bg-blue-500 rounded-md"
                >
                  Edit Users
                </button>
              </div>
            </div>
          ))}
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
