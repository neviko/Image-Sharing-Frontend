import "./App.css";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { fileTypes } from "./constants/file-types";
import { TextField, Button, CircularProgress } from "@mui/material";
import http from "./common/http";
import { ErrorMessages } from "./common/enums/error-messages";
import ErrorMessage from "./components/ErrorMessages";
import CopyToClipboard from "./components/CopyToClipboard";

const App = () => {
  const [image, setImage] = useState<File | null>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [shareableLink, setShareableLink] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorMessages[]>([]);

  const handleImageChange = (image: any) => {
    setImage(image);
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    console.log(value);
    setExpirationDate(value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShareableLink(undefined);
    setErrors([]);
    if (!expirationDate) {
      setErrors((errors) => [...errors, ErrorMessages.EmptyDate]);
      return;
    }

    const now = new Date();
    if (new Date(expirationDate) <= now) {
      setErrors((errors) => [...errors, ErrorMessages.PastDate]);
      return;
    }

    if (!image) {
      setErrors((errors) => [...errors, ErrorMessages.NoImage]);
      return;
    }

    const formData = new FormData();
    formData.append("myImage", image as any);
    try {
      setLoading(true);
      const { data } = await http({
        data: formData,
        url: "/v1/file",
        method: "post",
        headers: {
          expiration_ts: expirationDate,
        },
      });
      setShareableLink(data.url);
    } catch (e: any) {
      console.log(e);
      setErrors(e.response.data.errors.map((err: any) => err.msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2 style={styles.header}>Image Sharing</h2>
      <form onSubmit={handleSubmit} style={styles.formStyle}>
        <FileUploader
          handleChange={handleImageChange}
          name="file"
          types={fileTypes}
          multiple={false}
        />

        <TextField
          label="Expiration Date"
          name="expiration"
          value={expirationDate}
          onChange={handleDateChange}
          margin="normal"
          fullWidth
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
        />
        {!loading ? (
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        ) : (
          <CircularProgress
            size={30}
            color="secondary"
            style={{ position: "absolute" }}
          />
        )}
        <ErrorMessage errors={errors} />
        {shareableLink && <CopyToClipboard text={shareableLink} />}
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    textAlign: "center",
  },
  formStyle: {
    margin: "30px",
    padding: "30px",
    border: "3px solid lightblue ",
    borderRadius: "5px",
  },
};
export default App;
