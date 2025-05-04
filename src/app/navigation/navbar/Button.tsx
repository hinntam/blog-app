const Button = () => {
    const handleClick = () => {
      const url = "https://askcalgary.vercel.app/login/";
      window.open(url, "_blank");
    }
    return (
      <button className="h-12 rounded-lg bg-white font-bold px-5" onClick={handleClick}>Sign In</button>
    );
  };
  
  export default Button;