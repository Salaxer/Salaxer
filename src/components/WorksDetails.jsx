import React from "react";
import {motion } from "framer-motion";

const WorksDetails = ({positi, data})=>{
    return(
        <motion.div
        key={positi}
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="containerDetails"
        >
            <div className="textDetail">
                <h1 className="nameWork">{data[positi].name}</h1>
                <p className="descriptionWork">{data[positi].description}</p>
                <a className="descriptionWork" href={data[positi].url} target="_blank" rel="noopener noreferrer">Show</a>
            </div>
            <div className="imageShow">
            {data[positi].imagesPrev.map((item, index)=>{
                return(
                    <img key={index} src={item} alt={`work number ${index}`} />
                )
            })}
            </div>
        </motion.div>
    )
}

export default WorksDetails;