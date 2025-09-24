import * as bcrypt from 'bcrypt';

async function hashPassword() {
    const hash = await bcrypt.hash('Messi1020304050', 10);
    console.log(hash);
}

hashPassword();