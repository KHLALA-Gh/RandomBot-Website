import { faD, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DeleteGameProps {
  onDelete: () => any;
  onCancel: () => any;
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export default function DeleteGame({
  onCancel,
  onDelete,
  isLoading,
  error,
  isError,
}: DeleteGameProps) {
  return (
    <>
      <div className="full-page-shadow" onClick={onCancel}></div>
      <div className="rounded-md bg-dc absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 text-white z-[10000]">
        <h1 className="text-center text-xl">
          Are you sure, you want to delete this game ?
        </h1>
        {isError && (
          <p className="text-red-600 text-center">
            error : {error.slice(0, 200)}
            {error.length > 201 ? " ..." : ""}
          </p>
        )}
        <div className="flex gap-5 justify-center mt-5">
          <button
            className={
              "ps-5 pr-5 pt-2 pb-2 text-white rounded-md " +
              (isLoading ? "bg-red-950" : "bg-red-600")
            }
            onClick={onDelete}
            disabled={isLoading}
          >
            {!isLoading && "Delete"}
            {isLoading && <FontAwesomeIcon icon={faSpinner} spinPulse />}
          </button>
          <button
            className="ps-5 pr-5 pt-2 pb-2 border-2 border-white text-white rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
