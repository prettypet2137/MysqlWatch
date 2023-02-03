import pool from "./mysql-pool.mjs";

const todo = async (ideas, reward) => {
    console.log('TODO CALLED!');

    if (ideas.length == 0) {
        console.log('NO IDEAS');
        return;
    }

    console.log('IDEA REWARDED: ', ideas.map(r => r.id));
    console.log('REWARD: ', reward);
}

export const handler = async(event) => {
    console.log("This is called at ", new Date());
    console.log(event);

    let result = true;
    let msg = '';

    try {
        let rounds = await new Promise((resolve, reject) => {
            pool.query(
              `SELECT * FROM round WHERE \`to\` <= now() and reward_status = 0`,
              (error, results) => {
                error && reject(error);
                resolve(results);
              },
            );
        });

        for (let round of rounds) {
            let ideas = await new Promise((resolve, reject) => {
                pool.query(
                  `select * from idea where round = ${round.id}
                  having vote_count = 
                  (
                      select max(vote_count) from idea where round = ${round.id}
                  )`,
                  (error, results) => {
                    error && reject(error);
                    resolve(results);
                  },
                );
            });

            await todo(ideas, {
                image: round.reward_img,
                count: 0
            });
            
            // await new Promise((resolve, reject) => {
            //     pool.query(
            //     `update round set reward_status = 1 where id = ${round.id}`,
            //     (error, results) => {
            //         error && reject(error);
            //         resolve(results);
            //     },
            //     );
            // });
        }
    } catch (e) {
        result = false;
        msg = e.toString();
        console.log(e);
    } finally {
        // pool.end();
    }
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify({ result, msg }),
    };
    return response;
};

// new Promise((resolve, reject) => {
//     resolve(handler(null));
// }).then(r => {
//     console.log(r);
// })
