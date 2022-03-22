import React, { HTMLAttributes } from "react";
import styled from "styled-components";

type Props = HTMLAttributes<HTMLButtonElement> & {
  number: number;
  checked?: boolean;
};

const Field = styled.button`
  border: 1px solid #000;
  height: 40px;
  width: 40px;
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: #ff22ff;
  color: ${({ checked }: Props) => (checked ? "#fff" : "#000")};
  font-size: 1.5rem;
  cursor: pointer;

  :hover {
    background-color: #009914;
  }
`;

const NumberField = ({ number, checked, ...props }: Props): JSX.Element => {
  return (
    <Field {...props} checked={checked}>
      {number}
    </Field>
  );
};

export default NumberField;
