import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
  useState,
} from "react";
import "./App.css";

function App() {
  const [selectedFiles, setSelectedFiles] = useState<File | undefined>(
    undefined
  );

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

    await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((resp) => {
        setSelectedFiles(undefined);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
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
    </div>
  );
}

export default App;
