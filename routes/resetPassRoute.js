const router = require("express").Router();
const { verifyToken } = require("../helpers/verify");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
    try {
        let { token } = req.query;
        let verified = verifyToken(token);
        // console.log(verified);
        if (!verified)
            return res.json({
                success: false,
                message: "something went wrong!",
            });
        let hashPass = await bcrypt.hash(verified.password, 10);
        await User.update(
            { password: hashPass },
            { where: { email: verified.email } }
        );
        res.json({
            success: true,
            message: "Password reset successfully!",
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
