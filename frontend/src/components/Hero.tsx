function Hero() {
  return (
    <div className="h-[36rem] bg-[url('/public/games.png')]">
      <div className="my-48 mx-auto max-w-7xl px-4 sm:mt-24 md:mt-72 text-center">
        <h1 className="font-extrabold text-gray-900">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-400 to-red-400 text-4xl sm:text-6xl md:text-7xl">
            Medusa Gamestore
          </p>
        </h1>
        <h2 className="mt-3 max-w-md mx-auto text-yellow-100 sm:text-lg md:mt-5 md:text-xl md:max-x-3xl font-extrabold">
          The game eCommerce Revolution.
        </h2>
      </div>
    </div>
  );
}

export default Hero;
