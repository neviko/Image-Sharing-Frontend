import { FileUploader } from "react-drag-drop-files";
import { fileTypes } from "../constants/file-types";
import { TextField, Button, CircularProgress } from "@mui/material";
import "../css/file-sharing.css";
import ErrorMessage from "./ErrorMessages";
import CopyToClipboard from "./CopyToClipboard";
import UseFileSharing from "./UseFileSharing";

const FileSharing = () => {
  const {
    image,
    shareableLink,
    loading,
    errors,
    expirationDate,
    handleImageChange,
    handleDateChange,
    handleSubmit,
  } = UseFileSharing();

  return (
    <>
      <h2 style={styles.header}>Image Sharing</h2>
      <div className="center">
        <form onSubmit={handleSubmit} style={styles.formStyle}>
          <div className="upload-file-container">
            <FileUploader
              handleChange={handleImageChange}
              name="fileSelector"
              types={fileTypes}
              multiple={false}
            />
            {image && (
              <img width={"100px"} src={URL.createObjectURL(image!)} alt="" />
            )}
          </div>

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
    </>
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
    width: "30%",
    justifyContent: "center",
  },
};
export default FileSharing;
