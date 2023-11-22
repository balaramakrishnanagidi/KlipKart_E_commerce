const userModel = require('../Model/User');
const jwt = require('jsonwebtoken');

// script to generate secret code - node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const secretKey = "589a03ff00a3fe233731b63ee8e4c984cf43332823ba9ba0fcbf8a0931ea4fd0";

function generateToken(user) {
    const payload = {
        userId: user._id,
        username: user.name
    };

    const options = {
        expiresIn: '1hr',
    }

    return jwt.sign(payload, secretKey, options);
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(200).json({
                success: 0,
                message: 'Email is not registered!'
            });
        } else if (user.password === password) {
            const token = generateToken(user);
            res.status(200).json(
                {
                    success: 1,
                    message: "Login successful!",
                    data: {
                        user_token: token,
                        user_id: user._id,
                    }
                }
            );
        } else {
            res.status(400).json(
                {
                    success: 0,
                    message: 'Wrong password!'
                }
            );
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' || error.message })
    }
}

module.exports = { login };
