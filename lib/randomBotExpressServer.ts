import axios from "axios";

/**
 * Get games from RandomBot express server using the owner accessToken
 * @param serverId
 */
export async function getServerGames(
  serverId: string,
  accessToken: string
): Promise<QzGame[]> {
  const res = await axios.get(`https://randombot--khlala.repl.co/${serverId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}
