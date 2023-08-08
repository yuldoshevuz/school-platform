module.exports = (req, res, next) => {
    try {

        const { title, description, currentImage } = req.body
        const image = req.file

        if (!title || !description) {
            req.session.error = 'Iltimos kerakli maydonlarni to\'ldiring!'
            next()
            return
        }

        if (currentImage === 'on') {
            req.file = false
            next()
            return
        }

        if (!image && !currentImage) {
            req.session.error = 'Iltimos maqola rasmini yuklang!'
            next()
            return
        }

        
        next()
    } catch (error) {
        console.log(error);
    }  
}