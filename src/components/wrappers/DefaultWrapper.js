import React from "react"
import '../../style/default_style.scss'

function DefaultWrapper(props) {
    const { children, } = props;

    return (
      <div className="default-wrapper wrapper">
        <img className="wave1 wave" src="/Vector1.svg"/>
        <img className="wave2 wave" src="/Vector2.svg"/>
        <img className="wave3 wave" src="/Vector3.svg"/>
        <div className="container">
            { children }
        </div>
      </div>
    );
}
  
export default DefaultWrapper;