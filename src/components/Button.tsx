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
  color: #fff;
  padding: 0 3rem;
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: ${({ marginBottom }: ButtonProps) =>
    marginBottom ? marginBottom : ""};

  :hover {
    background-color: ${({ disabled }: ButtonProps) =>
      disabled ? "#8c8c8c" : "#ff8cf7"};
    cursor: ${({ disabled }: ButtonProps) =>
      disabled ? "not-allowed" : "pointer"};
  }

  background-color: ${({ disabled }: ButtonProps) =>
    disabled ? "#8c8c8c" : "#ff22ff"};
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
