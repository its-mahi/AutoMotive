import React from 'react'
import { Tilt } from "react-tilt";
import "./Card"

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 5, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 100, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.05,.98,.52,.99)", // Easing on enter/exit.
};

export default function Card(props) {
    const { title, disc, imgSrc, even } = props;
  
    return (
      <div className="">
        <Tilt options={defaultOptions}>
            <div className={`flex ${ even ? "flex-row-reverse" : ""} border justify-evenly min-h-[300px] items-center p-2 glassy-effect-hero border-gray-500 rounded-md w-[1000px] backgroud`}>
              <img
                className="md:w-52 md:h-52 w-1/3 md:mb-3 md:mt-2  shadow-lg "
                src={imgSrc}
                alt="No Image"
              />
              <div className="max-w-[600px]">
              <h5 className="font-['Rubik'] md:mb-2 md:text-3xl text-xl font-medium text-gray-900 dark:text-white">
                {title}
              </h5>
              <span className="font-['Rubik'] text-sm md:text-lg  px-1  text-justify text-gray-400">
                > {disc}
              </span>
              </div>
              
          </div>
        </Tilt>
      </div>
    );
  }
