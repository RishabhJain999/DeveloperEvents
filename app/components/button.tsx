'use client'

const Button = () => {
   console.log("running in:", typeof window === "undefined" ? "server" : "client");
   return <button>Button</button>;
};

export default Button;
