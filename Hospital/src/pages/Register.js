import React, { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const Register = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      image: null,
    },
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = () => {
    // Access form values using form.values
    console.log("Submitting data:", form.values);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    form.setFieldValue("image", file);

    // Create a URL for the uploaded image and set it for preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  return (
    <div className="register overflow-hidden">
      <div className="c-card" style={{ height: "auto" }}>
        <div className="container-fluid">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="row gy-4">
              <div className="col-md-6">
                <TextInput
                  label="Name"
                  placeholder="Enter your name"
                  required
                  {...form.getInputProps("name")}
                  error={form.errors.name}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  {...form.getInputProps("email")}
                  error={form.errors.email}
                />
              </div>
              <div className="col-md-6">
                <div className="custom-file-input">
                  <label
                    htmlFor="image"
                    style={{ fontWeight: "500", marginRight: "0.5rem" }}
                  >
                    Upload Doctor's Image:{" "}
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {form.errors.image && (
                    <div style={{ color: "red" }}>{form.errors.image}</div>
                  )}
                </div>
              </div>
              {/* Display image preview */}
              <div className="col-md-6">
                {imagePreview && (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "300px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button type="submit" loading={form.loading} mt="md">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
