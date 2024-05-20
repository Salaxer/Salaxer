import React from "react";
import './Loader.css'

const Loader = ({color, position, size, background}) =>{
    return (
        <div className="containerLoad" id="preloader" style={{position: `${position ? position : 'absolute' }`, background: `${background ? background : 'rgba(255,255,255,.87)'}`}}>
            <mat-spinner id="matSpinner" role="progressbar" mode="indeterminate" tabindex="-1" className="mat-spinner mat-progress-spinner div mat-primary mat-progress-spinner-indeterminate-animation" 
            style={{width: `${size ? size : '56px'}`, height: `${size ? size : '56px'}`}}
            >
                <svg id="containCircle" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" viewBox="0 0 51.6 51.6" style={{width: `${size ? size : '56px'}`, height: `${size ? size : '56px'}`, animation: 'girar 2000ms linear infinite'}}>
                    <linearGradient style={{animation: 'girar 2000ms linear infinite'}} id="linearColors1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0096c1"></stop>
                        <stop offset="100%" stopColor="#00984c"></stop>
                    </linearGradient>
                    <circle id="circle" cx="50%" cy="50%" r="23" className="ng-star-inserted circle-rotate" style={{stroke: `${color ? color: 'url(#linearColors1)'}`}}></circle>
                </svg>
            </mat-spinner>
        </div>
    )
}

export default Loader;