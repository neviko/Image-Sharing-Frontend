import React from "react";

interface ErrorMessageProps {
  errors: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  return (
    <div>
      <ul>
        {errors.map((error) => {
          return <li style={styles.errorMessage}>{error}</li>;
        })}
      </ul>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  errorMessage: {
    color: "red",
  },
};
export default ErrorMessage;
