import { ChangeEvent, FormEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import List from "./components/list";
import CONSTANTS from "./constants";
import { useFetchData } from "./hooks/useFetchData";
import UploadIcon from "./icons/upload";
import CircleNotchIcon from "./icons/circle-notch";
import FileIcon from "./icons/file";

const { ADMIN_URL } = CONSTANTS;

function App() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { data, fetchData } = useFetchData(null);

  const handleSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !files.length) return;

    const file = Array.from(files)[0];

    if (file.size < 0) {
      return;
    }

    setSelectedFile(file);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsLoading(true);
    let formData = new FormData();

    formData.append("file", selectedFile);

    fetch(`${ADMIN_URL}/api/upload`, {
      method: "POST",
      body: formData,
    })
      .then(async (resp) => {
        if (!resp.ok) {
          const res = await resp.json();
          console.log(res);
          toast.error(res.message);
          setIsLoading(false);
        } else {
          fetchData();
          setSelectedFile(undefined);
          toast.success("Success.");
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("There's something wrong. Please try again later.");
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 text-gray-600">
      <form
        onSubmit={onSubmit}
        className="rounded max-w-sm mx-auto shadow-lg p-4 border-solid border border-gray-100"
      >
        <legend className="text-center mb-4 pb-2 text-lg border-gray-400 border-solid border-b">
          File Upload
        </legend>
        <fieldset className="flex flex-col gap-y-2">
          <label className="flex items-center justify-center gap-y-2 flex-col border-dashed border-gray-300 border-2 p-4 rounded hover:cursor-pointer">
            <input
              type="file"
              onChange={handleSelectFile}
              disabled={isLoading}
              className="hidden"
            />
            {!!selectedFile ? (
              <>
                <FileIcon className="text-3xl" />
                <span className="text-sm">{selectedFile.name}</span>
              </>
            ) : (
              <>
                <UploadIcon />
                <span className="text-sm">Choose file</span>
              </>
            )}
          </label>
          <div className="text-xs text-gray-400">
            <p>Only accept CSV file.</p>
            <p>Maximum upload file size: 10 MB.</p>
          </div>
          <button
            type="submit"
            disabled={isLoading || !selectedFile}
            className="py-1 px-2 rounded bg-sky-500 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex gap-x-1 items-center justify-center">
                <CircleNotchIcon className="animate-spin fill-white " />{" "}
                Processing...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </fieldset>
      </form>
      {/* <button
        onClick={() => fetchData()}
        className={`border border-solid border-gray-500 rounded py-1 px-2${
          !selectedFile ? " cursor-not-allowed opacity-50" : ""
        }`}
      >
        List data
      </button> */}
      {!!data && data.status === "success" ? (
        data.data.total > 0 ? (
          <List initialData={data} />
        ) : (
          <p>Author not found</p>
        )
      ) : (
        <></>
      )}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;
