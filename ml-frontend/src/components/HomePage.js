import React from 'react'
import './HomePage.css'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { motion } from "framer-motion";


import NumberPlateDetection from "./NumberPlateDetection";
import CarCounting from "./CarCounting";
import ParkingSpace from "./ParkingSpace";
import Card from './Card';

const cards = [
    {
      title: "Licence Plate Recognition",
    //   disc: "Simplifying Vehicle Identification: Cutting-edge Number Plate Recognition for Improved Surveillance",
      disc: "Streamlining Traffic Control: Automated Number Plate Detection for Efficient Monitoring.",
      imgSrc: "num_logo.svg",
    },
    {
      title: "Vehicle Counting",
    //   disc: "Keeping Pace with Traffic: Real-time Vehicle Counting for Dynamic Road Management.",
      disc: "Keeping Pace with Traffic: Real-time Vehicle Counting for Dynamic Road Management.",
      imgSrc: "vc_logo.svg",
    },
    {
      title: "Parking Space Detection",
      disc: "Simplify Your Parking Experience: Find Available Spaces Quickly and Easily with Our Precision Detection.",
      imgSrc: "ps_logo.svg",
    },
  ];

function HomePage() {
  return (
    // <Router>
      <div>

        <div className="flex flex-col justify-center items-center hero mt-12">
            <motion.div
            initial={{ opacity: 0, y: -300 , scale: 0.4 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -400 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="background flex justify-center"
            >
            <img src="/logo.svg" alt="" className="w-[350px] h-full" />
            </motion.div>
        </div>

        <div className="flex flex-col justify-center items-center mt-0 space-y-8">

                <Link className="text-link" to="/number-plate-detection">
                    <Card
                    even={0}
                    key={0}
                    title={cards[0].title}
                    disc={cards[0].disc}
                    imgSrc={cards[0].imgSrc}
                    />
                </Link>

                <Link className="text-link" to="/count-vehicle">
                    <Card
                    even={1}
                    key={1}
                    title={cards[1].title}
                    disc={cards[1].disc}
                    imgSrc={cards[1].imgSrc}
                    />
                </Link>

                <Link className='text-link' to="/parking-space">
                    <Card
                    even={0}
                    key={2}
                    title={cards[2].title}
                    disc={cards[2].disc}
                    imgSrc={cards[2].imgSrc}
                    />
                </Link>
        </div>

                {/* <section className="text-center hero">


                <Link className="text-link" to="/number-plate-detection">
                    <div className="container">
                        <div className="card">
                            <h1></h1>
                            <p className='card-desc'></p>
                            <p className='card-desc'></p>
                        </div>
                    </div>
                </Link>

                <Link className="text-link" to="/count-vehicle">
                    <div className="container">
                        <div className="card">
                            <h1>Counting Vehicles</h1>
                            <p className='card-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, explicabo!</p>
                            <p className='card-desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ipsum nemo, at accusantium deleniti esse animi quae atque ipsam eveniet?1</p>
                        </div>
                    </div>
                </Link>

                    
                <Link className='text-link' to="/parking-space">
                    <div className="container">
                        <div className="card">
                            <h1></h1>
                            <p className='card-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, explicabo!</p>
                            <p className='card-desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ipsum nemo, at accusantium deleniti esse animi quae atque ipsam eveniet?1</p>
                        </div>
                    </div>
                    </Link>
                    
                </section> */}

                <div className="mt-20"></div>
      </div>
  )
}

export default HomePage
