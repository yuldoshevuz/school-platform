const User = require('../../models/userModel')

module.exports = async (id) => {
    const user = await User.findById(id)
     if (user) {
        return user
     }

     return "Noma'lum foydalanuvchi"

    // User.findById(id).then(user => {
    //     if (user) {
    //         return user.full_name
    //     }
    //     return "No'malum foydalanuvchi"
    // })


    // console.log(user);

    // if (!user) {
    // }
}