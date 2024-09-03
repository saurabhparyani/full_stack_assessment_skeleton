import React, { useEffect } from "react";
import { useGetUsersQuery, useGetUsersByHomeQuery } from "../redux/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  toggleUser,
  setSelectedUsers,
  clearSelectedUsers,
} from "../redux/features/userSlice";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  homeId: number;
  homeStreetAddress: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  homeId,
  homeStreetAddress,
}) => {
  const dispatch = useAppDispatch();
  const selectedUsers = useAppSelector((state) => state.user.selectedUsers);

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetUsersQuery();

  const {
    data: relatedUsers,
    isLoading: isLoadingRelatedUsers,
    isError: isErrorRelatedUsers,
  } = useGetUsersByHomeQuery(homeId);

  useEffect(() => {
    if (relatedUsers) {
      dispatch(setSelectedUsers(relatedUsers.map((user) => user.userId)));
    }
    return () => {
      dispatch(clearSelectedUsers());
    };
  }, [relatedUsers, dispatch]);

  if (!isOpen) return null;

  if (isLoadingUsers || isLoadingRelatedUsers) {
    return <div className="pt-5 flex items-center">Loading...</div>;
  }

  if (isErrorUsers || isErrorRelatedUsers) {
    return (
      <div className="pt-5 flex items-center">
        Error loading data. Please try again later.
      </div>
    );
  }

  const handleToggleUser = (userId: number) => {
    dispatch(toggleUser(userId));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50">
      <div className="bg-white p-4 sm:p-6 rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-4 sm:mx-0">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Modify Users for: {homeStreetAddress}
        </h2>
        <div className="flex flex-col gap-y-2 justify-center">
          {users?.map((user) => (
            <div key={user.userId}>
              <input
                type="checkbox"
                id={user.username}
                name={user.username}
                checked={selectedUsers[user.userId] || false}
                onChange={() => handleToggleUser(user.userId)}
              />
              <label className="ml-2" htmlFor={user.username}>
                {user.username}
              </label>
            </div>
          ))}
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
