import axios from "axios";

/**
 * Get games from RandomBot express server using the owner accessToken
 * @param serverId
 */
export async function getServerGames(
  serverId: string,
  accessToken: string
): Promise<QzGame[]> {
  if (!process.env.ES) throw Error(`ES is undefined`);
  const res = await axios.get(`${process.env.ES}/${serverId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}

/**
 * Request RandomBot express server to delete all the games in the a server
 * @param serverId Guild ID
 * @returns response
 */
export async function deleteAllGames(serverId: string, accessToken: string) {
  if (!process.env.ES) throw new Error(`ES is required`);
  const res = (
    await axios.delete(process.env.ES + `/${serverId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;
  return res;
}

/**
 * Send a Request to RandomBot express server to delete a game in a server
 */

export async function deleteGame(
  serverId: string,
  gameId: string,
  accessToken: string
) {
  return (
    await axios.delete(process.env.ES + `/${serverId}/${gameId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;
}

/**
 * Send a Request to RandomBot express server to delete games in a server
 */
export async function deleteGames(
  serverId: string,
  gamesId: string[],
  accessToken: string
) {
  return (
    await axios.post(
      process.env.ES + `/${serverId}/delete`,
      {
        games: gamesId,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
  ).data;
}
