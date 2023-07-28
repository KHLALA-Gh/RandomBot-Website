import DiscordServer from "@/components/Discord_Server";
import NavBar from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="cont">
        <h1 className="text-center text-main text-[36px] mt-32">
          Your Servers
        </h1>
        <div className="servers grid sm:grid-cols-2 xl:grid-cols-3 grid-cols-1 mt-20 gap-7 justify-center p-5">
          <DiscordServer
            name="gg"
            img="https://cdn.discordapp.com/icons/977538325554528327/2a1011e5cd3a7c49e971db0fb37b08f6.jpg"
            id="45dza456adz"
          />
          <DiscordServer
            name="gg"
            img="https://cdn.discordapp.com/icons/977538325554528327/2a1011e5cd3a7c49e971db0fb37b08f6.jpg"
            id="45dza456adz"
          />
          <DiscordServer
            name="gg"
            img="https://cdn.discordapp.com/icons/977538325554528327/2a1011e5cd3a7c49e971db0fb37b08f6.jpg"
            id="45dza456adz"
          />
        </div>
      </div>
    </>
  );
}
