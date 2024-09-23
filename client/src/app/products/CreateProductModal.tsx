import React from "react";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({isOpen, onClose, onCreate}: CreateProductModalProps) => {
  return <div>CreateProductModal</div>;
};

export default CreateProductModal;
