import React, { useEffect } from "react";
import {
  useGetUsersQuery,
  useGetUsersByHomeQuery,
  useUpdateUsersMutation,
} from "../redux/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  toggleUser,
  setSelectedUsers,
  clearSelectedUsers,
} from "../redux/features/userSlice";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  homeId: number;
  homeStreetAddress: string;
  onSaveComplete: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  homeId,
  homeStreetAddress,
  onSaveComplete,
}) => {
  const dispatch = useAppDispatch();
  // get the checked/selected users from redux store
  const selectedUsers = useAppSelector((state) => state.user.selectedUsers);

  // fetch all users for dropdown
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetUsersQuery();

  // fetch related users for the selected home in the modal
  const {
    data: relatedUsers,
    isLoading: isLoadingRelatedUsers,
    isError: isErrorRelatedUsers,
    refetch: refetchRelatedUsers,
  } = useGetUsersByHomeQuery(homeId);

  const [updateUsers, { isLoading: isUpdating }] = useUpdateUsersMutation();

  useEffect(() => {
    // for every related user that is checked, set the selectedUsers in the redux store
    if (relatedUsers) {
      dispatch(setSelectedUsers(relatedUsers.map((user) => user.userId)));
    }
    // clear selected users when component unmounts
    return () => {
      dispatch(clearSelectedUsers());
    };
  }, [relatedUsers, dispatch]);

  const handleToggleUser = (userId: number) => {
    dispatch(toggleUser(userId));
  };

  const handleSave = async () => {
    // get the selected users from the redux store and convert them to an array of userIds
    const selectedUserIds = Object.entries(selectedUsers)
      .filter(([, isSelected]) => isSelected)
      .map(([userId]) => parseInt(userId));

    try {
      // update the users for the selected home and refetch the related users
      await updateUsers({ homeId, userIds: selectedUserIds }).unwrap();
      onSaveComplete();
      onClose();
      refetchRelatedUsers();
    } catch (error) {
      console.error("Error updating users:", error);
    }
  };

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

  const isSaveDisabled = Object.values(selectedUsers).every(
    (isSelected) => !isSelected
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 sm:p-6 rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-4 sm:mx-0">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Modify Users for: {homeStreetAddress}
        </h2>
        <div className="flex flex-col gap-y-2 justify-center">
          {/* CHECKBOXES */}
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
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto mb-2 sm:mb-0"
            disabled={isUpdating || isSaveDisabled}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
        {/* when no users are selected, show error */}
        {isSaveDisabled && (
          <p className="text-red-500 mt-2">
            At least one user must be selected.
          </p>
        )}
      </div>
    </div>
  );
};

export default EditUserModal;
