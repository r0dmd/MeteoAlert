import getPool from '../../db/getPool.js';

const selectAllUsersModel = async () => {
    const pool = await getPool();
    const [users] = await pool.query(
        `SELECT id, username, email, avatar, role, createdAt FROM users WHERE password <> "Usuario eliminado"`,
    );
    return users;
};

export default selectAllUsersModel;
