import Feed from "@components/Feed";
export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompoting tool for a modern world to
        discover , create ad share creative prompts
      </p>
      <Feed />
    </section>
  );
}
