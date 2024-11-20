import React, {useState, useEffect, useCallback} from "react";
import styled from "styled-components";
import {Product} from "../types";
import {useNavigate} from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  overflow: hidden;
  padding-top: 5%;
`;

const Form = styled.form`
  position: relative;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  align-self: flex-start;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
  }
`;

const CloseIcon = styled.i`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;

  &:hover {
    color: #000;
  }
`;

interface ProductFormProps {
  initialValues: Partial<Product>;
  onSubmit: (productData: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({initialValues, onSubmit}) => {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    category: "",
    stockQuantity: 0,
    price: 0,
    ...initialValues,
  });
  const [customCategory, setCustomCategory] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false); // Track if "Other" is selected
  const navigate = useNavigate();

  useEffect(() => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      ...initialValues,
    }));
  }, [initialValues]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name, value} = e.target;
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "custom") {
      setCustomCategory("");
      setIsCustom(true); // Show custom input
      setProduct((prev) => ({...prev, category: ""}));
    } else {
      setCustomCategory("");
      setIsCustom(false); // Hide custom input
      setProduct((prev) => ({...prev, category: value}));
    }
  };

  const handleCustomCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomCategory(value);
    setProduct((prev) => ({...prev, category: value}));
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(product);
    },
    [product, onSubmit]
  );

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <CloseIcon className="fas fa-times" onClick={handleClose} />
        <FormRow>
          <Label htmlFor="name">Product Name:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="category">Category:</Label>
          {!isCustom && (
            <Select
              id="category"
              value={product.category || ""}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="custom">Other</option>
            </Select>
          )}
          {isCustom && (
            <>
              <Select
                id="category"
                value={product.category || ""}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="custom">Other</option>
              </Select>
              <Input
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={handleCustomCategoryChange}
                required
              />
            </>
          )}
        </FormRow>
        <FormRow>
          <Label htmlFor="stockQuantity">Quantity:</Label>
          <Input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="price">Price:</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="description">Description:</Label>
          <TextArea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={4}
          />
        </FormRow>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ProductForm;
