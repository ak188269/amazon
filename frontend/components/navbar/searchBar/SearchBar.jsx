"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./searchBar.module.css";
import Image from "next/image";

const SearchBar = ({shouldShow=true}) => {
  const Options = ["Devices", "Fashion", "Groceries", "Beauty", "Books"];
  const [selectedValue, setSelectedValue] = useState("All");

  const category_ref = useRef();
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    getWidthForSelect();
  }, [selectedValue]);

  const getWidthForSelect = () => {
    // Get the width of the selected option
    // const selectedOption = document.querySelector(`#category`);
    const selectedOption =category_ref.current
    if (selectedOption) {
      const computedStyle = window.getComputedStyle(selectedOption);

      // Get the font size and font family from the computed style
      const fontSize = computedStyle.getPropertyValue("font-size");
      const fontFamily = computedStyle.getPropertyValue("font-family");

      const size = getStringWidth(selectedValue, fontSize + fontFamily);

      return size;
    }
    return "45px";
  };

  function getStringWidth(text, font) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the font on the context
    context.font = font;

    // Measure the text width
    const width = context.measureText(text).width;

    if(2*width < 45)
    return "45px";
    return 2 * width + "px";
  }
  return (
    <div className={`${shouldShow ? "flex" : "hidden"} rounded overflow-hidden  flex-grow`
    }
    
    >
      <select
        name=""
        id="category"
        className={`${styles.select_category} text-xs outline-none`}
        onChange={handleSelectChange}
        style={{ width: getWidthForSelect() }}
        ref={category_ref}
      >
        <option value="All">All</option>
        {Options.map((item, ind) => {
          return (
            <option value={item} key={ind} style={{border:"1px solid red"}}>
              {item}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Search Amazon.in"
        className={`p-0 px-2 lg:p-2 outline-none`}
        style={{flexGrow:"1"}}
      />
      <div className={`icon_container bg-[#F4BF76] flex items-center p-1 px-2 w-fit`}>
        <Image
          src={"/images/navbar/search_icon.svg"}
          width={20}
          height={20}
          alt="search icon"
          className="icons"
        />
      </div>
    </div>
  );
};

export default SearchBar;
