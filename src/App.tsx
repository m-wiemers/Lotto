import React, { useEffect, useState } from "react";
import "./styles.css";
import styled from "styled-components";
import Table from "../components/Table.tsx";
import { SelectedNumberFieldWrapper, Error } from "../components/Fields.tsx";
import NumberField from "../components/NumberField.tsx";
import Button from "../components/Button.tsx";

const getWinNumbers = () => {
  const arr = [];
  while (arr.length < 6) {
    var r = Math.floor(Math.random() * 49) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

const FieldNumbers = Array.from({ length: 49 }, (_, index) => index + 1);

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function App() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const [disableResult, setDisableResult] = useState<boolean>(true);
  const [displayWinNumbers, setDisplayWinNumbers] = useState<string>("hidden");
  const [winNumbers, setWinNumbers] = useState([]);
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    const newNumbers = getWinNumbers();
    setWinNumbers(newNumbers);
  }, []);

  useEffect(() => {
    if (selectedNumbers.length < 1) {
      setDisable(true);
    } else {
      setDisable(false);
    }

    if (selectedNumbers.length === 6) {
      setDisableResult(false);
    } else {
      setDisableResult(true);
    }
  }, [selectedNumbers]);

  const pushToArray = (newNumber) => {
    if (selectedNumbers.includes(newNumber)) {
      setErrorMessage("Die Nummer hast du schon");
      setTimeout(() => setErrorMessage(""), 2000);
    } else if (selectedNumbers.length === 6) {
      setErrorMessage("Du hast schon 6 Zahlen");
      setTimeout(() => setErrorMessage(""), 2000);
    } else {
      setChecked((checked) => (checked === newNumber ? null : newNumber));
      setSelectedNumbers((oldArray) => [...oldArray, newNumber]);
    }
  };

  const removeFromArray = (number) => {
    setChecked((checked) => (checked === !number ? null : !number));
    setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
  };

  const winNumber = winNumbers.map((n, key) => (
    <NumberField
      number={n}
      key={key}
      checked={checked === key + 1 || selectedNumbers.includes(n)}
    />
  ));

  const numbers = FieldNumbers.map((n, key) => (
    <NumberField
      checked={checked === key + 1 || selectedNumbers.includes(key + 1)}
      number={n}
      key={key}
      onClick={() => pushToArray(key + 1)}
    />
  ));

  const selectedNumber = selectedNumbers.map((n, key) => (
    <NumberField number={n} key={key} onClick={() => removeFromArray(n)} />
  ));

  const checkNumbers = (number) => {
    if (selectedNumbers.length < 6) {
      setErrorMessage("Du musst 6 Zahlen auswählen!");
    }
    const result = selectedNumbers
      .map((n) => winNumbers.includes(n))
      .filter((n) => n !== false);

    setErrorMessage("du hast " + result.length + " richtige");
    setDisplayWinNumbers("visible");
    setChecked((checked) => (checked === !number ? null : !number));
  };

  const deleteAll = () => {
    setSelectedNumbers([]);
    setWinNumbers([]);
    setErrorMessage("");
    setDisplayWinNumbers("hidden");
    const newNumbers = getWinNumbers();
    setWinNumbers(newNumbers);
  };

  return (
    <div className="App">
      <Table FieldNumbers={numbers} />
      <Error>{errorMessage}</Error>
      <p>Deine Zahlen:</p>
      <SelectedNumberFieldWrapper>{selectedNumber}</SelectedNumberFieldWrapper>
      <ButtonWrapper>
        <Button
          disabled={disable}
          onClick={deleteAll}
          label="Alle Zahlen löschen"
          marginBottom="1rem"
        />
        <Button
          label="Zahlen Prüfen"
          onClick={checkNumbers}
          disabled={disableResult}
        />
      </ButtonWrapper>
      <p>Die Gewinnzahlen lauteten:</p>
      <SelectedNumberFieldWrapper style={{ visibility: displayWinNumbers }}>
        {winNumber}
      </SelectedNumberFieldWrapper>
    </div>
  );
}
