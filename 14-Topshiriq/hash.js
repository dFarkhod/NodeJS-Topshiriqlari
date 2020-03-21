const bcrypt = require('bcrypt');
async function getSalt() {
    const salt = await bcrypt.genSalt();
    const password = "12345";
    const pwdHash = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(pwdHash);
}

getSalt();
