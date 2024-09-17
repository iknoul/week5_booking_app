const jwt = require('./../../../services/jwt-servise');

exports.blacklistedTokens = new Set();

exports.checkToken = (steps, not)=>{

    return (req, res, next)=>{
        

        try {

            const bToken = req.headers.authorization
            console.log
            console.log(bToken)
        
            if(!bToken){
                res.status(403).json({success:false,message:'you are not authorized'})
            }
            const token = bToken.slice(7)

            
            const decoded = jwt.verifyToken(token)
            console.log(decoded, 'herer under presure')

            // Add email from decoded token to req.body

            // checking required stages of verification
            if(steps){
             
                if(not && steps.indexOf(decoded.stage)!=-1)
                {
                    req.body.user = decoded.user;
                    console.log(decoded.user)
                    return res.status(403).json({message:'you are not authorized beacuse you already verified'})
                }
                else if(steps.indexOf(decoded.step) == -1)
                {
                    return res.status(403).json({message:'you are not authorized'})
                }
            }
            console.log(decoded)
            req.body.user = decoded;

            // req.body.user = {email:'21352050@pondiuni.ac.in'}
            next()
        } catch (error) {
            return res.status(403).json({message:'you are not authorized'})
        }
    }
}