import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type ButtonProps = ButtonHTMLAttributes<HTMLElement> & {
  label: string;
  disabled?: boolean;
  marginBottom?: string;
};

const StyledButton = styled.button`
  height: 3rem;
  border: none;
  background-color: #000;
  color: #fff;
  padding: 0 3rem;
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: ${({ marginBottom }: ButtonProps) =>
    marginBottom ? marginBottom : ""};

  :hover {
    background-color: ${({ disabled }: ButtonProps) =>
      disabled ? "gray" : "#000"};
    cursor: ${({ disabled }: ButtonProps) =>
      disabled ? "not-allowed" : "pointer"};
  }

  background-color: ${({ disabled }: ButtonProps) =>
    disabled ? "gray" : "#000"};
`;

const Button = ({ label, disabled, marginBottom, ...props }: ButtonProps) => {
  return (
    <StyledButton
      label={label}
      disabled={disabled}
      marginBottom={marginBottom}
      {...props}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
