export default function Register(req, res) {
    console.log(req.body)
    res.redirect("/user/register/complete");
    //res.status(200).json({success: true})
}