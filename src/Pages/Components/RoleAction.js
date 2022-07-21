import React from 'react';
import {useLocation} from "react-router-dom";

export default function RoleAction() {
    const {state} = useLocation();
  return (
    <div>{state.userData.role === 'admin' ? "Hello Welcome Back Admin" : 'Hello Welcome Back User'}</div>
  )
}
