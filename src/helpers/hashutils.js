import bcrypt from 'bcrypt';

const saltRounds = 10;

function genPsswdHash(psswd) {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(psswd, salt, (error, hash) => {
      if (error) {
        throw error;
      }
      console.log(`${psswd} : ${hash}`);
    });
  });
}
