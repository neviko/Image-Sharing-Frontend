import React from "react";
import { Button } from "@mui/material";

interface CopyToClipboardProps {
  text: string;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div style={styles.container}>
      <input style={styles.input} value={text}></input>
      <Button onClick={handleCopyClick} variant="contained" color="primary">
        Copy
      </Button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {},
  input: {
    width: "70%",
    height: "30px",
  },
};

export default CopyToClipboard;
