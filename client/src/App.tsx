import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import List from "./components/list";
import CONSTANTS from "./constants";
import { useFetchData } from "./hooks/useFetchData";

const { ADMIN_URL } = CONSTANTS;

function App() {
  const [selectedFiles, setSelectedFiles] = useState<File | undefined>(
    undefined
  );

  const { data, fetchData } = useFetchData(null);

  const handleSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files || !files.length) return;

    const file = Array.from(files)[0];

    if (file.size < 0) {
      return;
    }

    setSelectedFiles(file);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFiles) return;
    let formData = new FormData();

    formData.append("file", selectedFiles);

    fetch(`${ADMIN_URL}/api/upload`, {
      method: "POST",
      body: formData,
    })
      .then(async (resp) => {
        if (!resp.ok) {
          const res = await resp.json()
          console.log(res)
        }
        return resp
      })
      .then(resp => {
        fetchData();
        setSelectedFiles(undefined);
      }) 
      .catch((e) => {
        console.log(e)
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleSelectFile} />
        <button
          type="submit"
          className={`border border-solid border-gray-500 rounded py-1 px-2${
            !selectedFiles ? " cursor-not-allowed opacity-50" : ""
          }`}
        >
          Submit
        </button>
      </form>
      <button
        onClick={() => fetchData()}
        className={`border border-solid border-gray-500 rounded py-1 px-2${
          !selectedFiles ? " cursor-not-allowed opacity-50" : ""
        }`}
      >
        List data
      </button>
      {!!data && data.status === "success" ? (
        data.data.total > 0 ? (
          <List initialData={data} />
        ) : (
          <p>Author not found</p>
        )
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
