const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, "./assets/");
    },
});

const upload = multer({ storage }).single("profile");

router.post("/profile", upload, (req, res) => {
    try {
        let success = true;
        let message = "File uploaded!";
        res.json({
            success,
            message,
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;
