import React from "react";
import http from "../common/http";
import { useState } from "react";
import { ErrorMessages } from "../common/enums/error-messages";

const UseFileSharing = () => {
  const [image, setImage] = useState<File | null>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [shareableLink, setShareableLink] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorMessages[]>([]);

  const handleImageChange = (image: any) => {
    console.log(image);
    setImage(image);
    setShareableLink(undefined);
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setExpirationDate(value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShareableLink(undefined);
    setErrors([]);

    if (submitInputValidations()) {
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

  const submitInputValidations = (): boolean => {
    const validationErrors: ErrorMessages[] = [];

    if (!expirationDate) {
      validationErrors.push(ErrorMessages.EmptyDate);
    }

    const now = new Date();
    if (expirationDate && new Date(expirationDate) <= now) {
      validationErrors.push(ErrorMessages.PastDate);
    }

    if (!image) {
      validationErrors.push(ErrorMessages.NoImage);
    }
    if (validationErrors) {
      setErrors((err) => [...err, ...validationErrors]);
    }
    return validationErrors.length > 0;
  };

  return {
    image,
    shareableLink,
    loading,
    errors,
    expirationDate,
    handleImageChange,
    handleDateChange,
    handleSubmit,
  };
};

export default UseFileSharing;
