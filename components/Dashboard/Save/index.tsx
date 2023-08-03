import MainBtn from "@/components/utils/main-btn";
import "./style.css";
import Loading from "@/components/utils/loading";
export default function Save({
  show,
  reset,
  save,
  isLoading,
}: {
  show: boolean;
  reset: () => any;
  save: () => any;
  isLoading: boolean;
}) {
  return (
    <>
      <div
        className={
          "rounded-md bg-dc p-5 flex justify-between sticky drop-shadow-xl duration-500 save-tr items-center " +
          (show ? "bottom-7 opacity-100" : "bottom-[-100%] opacity-0")
        }
      >
        <h1>Do you want to save these changes ?</h1>
        <div className="flex gap-5 items-center">
          <h1 onClick={reset} className="cursor-pointer">
            Reset
          </h1>
          <div onClick={save}>
            {isLoading && (
              <>
                <div className="h-[30px] overflow-hidden relative">
                  <Loading />
                </div>
              </>
            )}
            {!isLoading && <MainBtn disabled={isLoading}>Save</MainBtn>}
          </div>
        </div>
      </div>
    </>
  );
}
