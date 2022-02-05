import React, { MouseEventHandler } from "react";
import styled from "styled-components";

type Props = MouseEventHandler<HTMLButtonElement> & {
  FieldNumbers: number[];
};

const Field = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  justify-content: center;
  grid-gap: 10px;
  align-items: stretch;
`;

const Table = ({ FieldNumbers }: Props): JSX.Element => {
  return <Field>{FieldNumbers}</Field>;
};

export default Table;
