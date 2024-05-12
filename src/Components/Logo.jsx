const Logo = () => {
  return (
    <div
      className="flex items-center bg-cPurple px-4 py-2 rounded-xl animate-FadeIn"
      href="/"
    >
      <span className="md:text-4xl text-xl" role="img">
        🍿
      </span>
      <h1 className="text-xl text-white font-semibold md:block hidden">
        My Watched Movies
      </h1>
    </div>
  );
};
export default Logo;
