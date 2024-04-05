

const  errorResponse = require('./helper');
const url = require('url');
const fs = require('fs');

const urlAuth = async (req, res, next) => { 

   
    try {
       
        console.log('request',req);
        const { inputUrl } = req.body;

        if (!inputUrl) {
            return res.status(400).send({ message: 'URL is required' });
          }         
          const hostname = extractHostname(inputUrl);          
         const domainData = JSON.parse(fs.readFileSync('domains.json'));
         const blacklist = domainData.blacklist;
            const parts = hostname.split('.')
        for (let i = 0; i <= parts.length; i++) {
            const subdomain = parts.slice(i).join('.');            
            if (blacklist.includes(subdomain)) {
                return res.status(422).json({ message: "Domain or subdomain is blacklisted." });
            }
        }
        return next();    
      
    } catch (error) {
        console.log('err',error)
      return errorResponse(
        req,
        res,
        'Incorrect token is provided, try re-login',
        401,
      );
    }
  
  
  };
  
  function extractHostname(fullUrl) {
    let hostname;
    // Use url.parse() to isolate the hostname
    if (fullUrl) {
      if (!fullUrl.includes('//')) {
        fullUrl = 'http://' + fullUrl; // Ensure the URL can be properly parsed
      }
      hostname = url.parse(fullUrl).hostname;
      
    }   
    // Find & remove "www." if present
    if (hostname.indexOf("www.") > -1) {
      hostname = hostname.replace("www.", "");
    }
   
    return hostname;
  }
  
  module.exports = urlAuth;