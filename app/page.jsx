import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & share
            <br className="max-md:hidden"/>
            <span className="green_gradient text-center"> Best Quotes</span>
        </h1>
        <p className="desc text-center">
        QuoteGarden, your ultimate destination for discovering and sharing inspiring quotes.
         Whether you’re looking for motivation, wisdom,
         or a good laugh, our community-driven platform has something for everyone.
        </p>

        <Feed />
    </section>
  )
}

export default Home