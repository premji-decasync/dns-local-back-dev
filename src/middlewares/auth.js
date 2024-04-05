

const  errorResponse = require('./helper');
//const  Users_list = require('../models/user_list');


const jwt = require('jsonwebtoken');

const apiAuth = async (req, res, next) => {

 
  if(!(req.headers && req.headers.authorization))
  {
    return errorResponse(req, res, 'Token is not provided', 401);
  }
  const token = req.headers['authorization'];
 
  try {
    const decoded = jwt.verify(token,'Nuno>gomes#');
             // const project = await Users_list.findByPk(decoded.user.userId);
             const project = null
      if (project === null) {        
        return errorResponse(req, res, 'User is not found in system', 401);
      } else {
       
         if(project.name_of_user === decoded.user.name_of_user && project.contact_no === decoded.user.contact_no && project.status === 9)
         {
          return next();
         }
         else
         {
          return errorResponse(req, res, 'User is not Active in system', 401);
         }
      }


    
    
  } catch (error) {
    return errorResponse(
      req,
      res,
      'Incorrect token is provided, try re-login',
      401,
    );
  }


};

module.exports = apiAuth;
// export default apiAuth;
