import React from "react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 sm:p-6 rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-4 sm:mx-0">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Modify Users for: address_name
        </h2>
        <div className="flex flex-col gap-y-2 justify-center">
          <div>
            <input type="checkbox" id="user1" name="user1" />
            <label className="ml-2" htmlFor="user1">
              user1
            </label>
          </div>
          <div>
            <input type="checkbox" id="user2" name="user2" />
            <label className="ml-2" htmlFor="user2">
              user2
            </label>
          </div>
          <div>
            <input type="checkbox" id="user3" name="user3" />
            <label className="ml-2" htmlFor="user3">
              user3
            </label>
          </div>
          <div>
            <input type="checkbox" id="user4" name="user4" />
            <label className="ml-2" htmlFor="user4">
              user4
            </label>
          </div>
          <div>
            <input type="checkbox" id="user5" name="user5" />
            <label className="ml-2" htmlFor="user5">
              user5
            </label>
          </div>
          <div>
            <input type="checkbox" id="user6" name="user6" />
            <label className="ml-2" htmlFor="user6">
              user6
            </label>
          </div>
          <div>
            <input type="checkbox" id="user7" name="user7" />
            <label className="ml-2" htmlFor="user7">
              user7
            </label>
          </div>
        </div>

        <div className="flex flex-col mt-2 sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto mb-2 sm:mb-0"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
