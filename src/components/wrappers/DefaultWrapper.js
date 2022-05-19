import React from "react"
import '../../style/default_style.scss'

function DefaultWrapper(props) {
    const { children, } = props;

    return (
      <div class="default-wrapper">
        <img class="wave1 wave" src="/Vector1.svg"/>
        <img class="wave2 wave" src="/Vector2.svg"/>
        <img class="wave3 wave" src="/Vector3.svg"/>
        <div class="container">
            { children }
        </div>
      </div>
    );
}
  
export default DefaultWrapper;