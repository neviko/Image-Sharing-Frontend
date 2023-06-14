import React from "react";
import { Button, TextField } from "@mui/material";

interface CopyToClipboardProps {
  text: string;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div style={styles.container}>
      <TextField
        label="Shareable Link"
        name="sharable"
        value={text}
        onChange={handleCopyClick}
        margin="normal"
        fullWidth
        type="text"
        InputLabelProps={{ shrink: true }}
        style={{ width: "70%" }}
      />
      <Button
        onClick={handleCopyClick}
        variant="contained"
        color="primary"
        size="large"
        style={{ marginLeft: "15px" }}
      >
        Copy
      </Button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { display: "flex", width: "100%", alignItems: "center" },
  input: {
    height: "30px",
  },
};

export default CopyToClipboard;
