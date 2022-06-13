import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../../redux/actions/index";
import { Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function Filtros({ setSelected }) {
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    dispatch(setSort(e));
  };

  return (
    <>
      <RNPickerSelect
        name="sort"
        id="sort"
        defaultValue="DEFAULT"
        onValueChange={(value) => {
          handleOnChange(value);
        }}
        items={[
          { label: "A-Z", value: "A-Z" },
          { label: "Z-A", value: "Z-A" },
          { label: "Mayor a menor", value: "Highest SpoonScore" },
          { label: "Menor a mayor", value: "Lowest SpoonScore" },
        ]}
      />
    </>
  );
}