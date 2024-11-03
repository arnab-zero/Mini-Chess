const NavBar = () => {
  return (
    <div>
      <ul className="flex gap-5">
        <li>
          <a className="text-blue-400 hover:underline" href="/game">
            Game
          </a>
        </li>
        <li>
          <a className="text-blue-400 hover:underline" href="/learn">
            Learn
          </a>
        </li>
        <li>
          <a className="text-blue-400 hover:underline" href="/News">
            News
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
