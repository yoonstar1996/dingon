import React from "react";

export default function Hitgall() {
    const HitList = ({Hit}) =>{

        return (
          <>
            {Hit.map(hit =>{
                return(<div>하이</div>)
            })}
          </>
        );
    }
}
