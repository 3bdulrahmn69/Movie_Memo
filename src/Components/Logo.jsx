const Logo = () => {
  return (
    <a
      className="flex items-center bg-cPurple px-4 py-2 rounded-xl animate-FadeIn"
      href="/"
    >
      <span className="md:text-6xl text-5xl" role="img">
        🍿
      </span>
      <h1 className="text-4xl text-white font-semibold md:block hidden">
        Movie Memo
      </h1>
    </a>
  );
};
export default Logo;
