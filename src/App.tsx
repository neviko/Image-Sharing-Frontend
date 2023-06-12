import "./App.css";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { fileTypes } from "./constants/file-types";
import { TextField, Button } from "@mui/material";
import http from "./common/http";

const App = () => {
  const [image, setImage] = useState<File | null>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [shareableLink, setShareableLink] = useState<string | undefined>(
    undefined
  );

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
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
    try {
      // start spinner
      const formData = new FormData();
      formData.append("myImage", image as any);

      const { data } = await http({
        data: formData,
        url: "/v1/file",
        method: "post",
      });
      setShareableLink(data.url);
    } catch (e: any) {
      console.log(e);
      // setErrors(e.response.data.errors.map((err: any) => err.msg));
    } finally {
      //stop spinner
    }
  };

  return (
    <div className="App">
      <hr></hr>
      <h4>Image Upload</h4>
      <form onSubmit={handleSubmit} style={styles.formStyle}>
        {/* <FileUploader
          handleChange={handleImageChange}
          name="file"
          types={fileTypes}
        /> */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        ></input>

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

        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
        {shareableLink}
      </form>
      {expirationDate}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  formStyle: {
    margin: "30px",
    padding: "30px",
    border: "3px solid lightblue ",
    borderRadius: "5px",
  },
};
export default App;
