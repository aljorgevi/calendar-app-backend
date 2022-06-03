const jwt = require('jsonwebtoken');

const generateToken = userForToken => {
	const token = jwt.sign(userForToken, process.env.SECRET, {
		expiresIn: 60 * 60 * 24 * 7 * 4
	});

	return token;
};

/*
** ANOTHER WAY TO GENERATE TOKEN WITH A PROMISE
const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {uid, name};
    jwt.sign(payload, process.env.SECRET, {expiresIn: '4w'}, (err, token) => {
      if (err) {
        console.log(err)
        reject('Error generating token');
      } else {
        resolve(token);
  })
})
}

** CALLING THE PROMISE
const token = await generateJWT(user.id, user.name);
*/

module.exports = { generateToken };