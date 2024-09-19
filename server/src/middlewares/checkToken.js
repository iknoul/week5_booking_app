const jwt = require('./../services/jwt-servise');

exports.blacklistedTokens = new Set();

exports.checkToken = (steps, not, requiredRole)=>{

    return (req, res, next)=>{
        

        try {

            const bToken = req.headers.authorization
            console.log
            console.log(bToken)
        
            if(!bToken){
                res.status(403).json({success:false,message:'you are not authorized no btoken'})
            }
            const token = bToken.slice(7)

            
            const decoded = jwt.verifyToken(token)

            // Add email from decoded token to req.body

            // checking required stages of verification
            if (steps) {
                console.log(decoded, steps, 'here not pressues');
                
                // Check if the decoded step already contains one of the required steps (for unauthorized cases)
                const decodedSteps = decoded.step || [];
                const isVerifiedStep = decodedSteps.some(step => steps.includes(step));
                console.log(isVerifiedStep, 'verfied step')

                if (isVerifiedStep) {
                    req.body.user = decoded.user;
                    console.log(decoded.user);
                    return res.status(403).json({ message: 'you are not authorized because you already verified' });
                }

                // Check if the current step is NOT in the required steps
                const currentStepNotAllowed = decodedSteps.every(step => steps.indexOf(step) === -1);
                console.log(currentStepNotAllowed, 'current')
                if (not && currentStepNotAllowed) {
                    return res.status(403).json({ message: 'you are not authorized here' });
                }
            }

            // Check if the user role matches the required role
            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'you are not authorized' });
            }
            console.log(decoded)
            req.body.user = decoded.user;

            // req.body.user = {email:'21352050@pondiuni.ac.in'}
            next()
        } catch (error) {
            return res.status(403).json({message:'you are not authorized error catch'})
        }
    }
}