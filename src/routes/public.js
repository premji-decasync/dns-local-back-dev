
var express = require("express");
var public_router = express.Router();
const Base62Str = require("base62str").default;
const crypto = require('crypto');
const db = require("../model");
const base62 = Base62Str.createInstanceWithInvertedCharacterSet();
const urlMiddleware = require("../middlewares/url");
const jwt = require('jsonwebtoken');





public_router.get("/", function (req, res, next) {
    
    const data = [{"category_id":"660b91f2fe6aecdd53bf6f30","category_name":"sports"},{"category_id":"660b929ffe6aecdd53bf6f31","category_name":"politics"},
                                {"category_id":"660b9343d7ec560f4692bb9c","category_name":"advertisement"},{"category_id":"660b9c1af72936ed8a0f6cf2","category_name":"adult"},
                                {"category_id":"660bdd7633ba047ff12db829","category_name":"social media"},{"category_id":"660cd972f5c682e6d9412b53","category_name":"malicious"},
                                {"category_id":"660ce36cd451bcae5aee1299","category_name":"phishing"},
                                {"category_id":"660ce691d451bcae5aee129a","category_name":"abc"},{"category_id":"660ce83ee9795bbe1024a36c","category_name":"DDoS"},
                                {"category_id":"660e5e8bcc151cbdf9869e70","category_name":"sample"}]
    res.json({ category : data });
  });

  public_router.get("/cdb", async function (req, res, next) {
    await db.sequelize.sync({ force: true });
    res.json({ data: "Db created" });
  });
  

  public_router.post("/check_url",urlMiddleware, function (req, res, next) {
    res.json({ "success": "Ok" });
  });

  public_router.post("/verify_key_for_adding_a_device_of_user", function (req, res, next) {
    res.json({ data: "private api waked" });
  });


  public_router.post("/user_login", async function (req, res, next) {
    console.log('body',req.body)


    const { email, password } = req.body;

    try {
      // Find the subscriber by email
      const subscriber = await db.subscribers.findOne({ where: { email } });
  
      // If subscriber is not found
      if (!subscriber) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      else
      {
        const d_password = base62.decodeStr(subscriber.password);
        if(password == d_password)
        {
       

        const payload = {
          userId: subscriber.id,
          username: subscriber.name
        };
        
        // Secret key for signing the token
        const secretKey = 'your_secret_key_here';
        
        // Generate JWT token with expiration time of 1 hour
       // const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        const token = jwt.sign(payload, secretKey, { expiresIn: '5m' });
        
        console.log('Generated JWT token:', token);


        const receivedToken = token

          // Verify token using the secret key
          jwt.verify(receivedToken, secretKey, (err, decoded) => {
            if (err) {
              console.error('Invalid token:', err);
              // Handle invalid token error
            } else {
              console.log('Decoded token:', decoded);
              // Token is valid, proceed with handling the request
            }
          });
        return res.status(200).json({ message: 'Login successful', subscriberId: subscriber.id , token : token });
        }
        else
        {
          return res.status(401).json({ message: 'Invalid password' });
        }

      }    
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ "success": "Ok" });
  });

  public_router.post("/registration", async function (req, res, next) {
    console.log('body',req.body)
    const { name, email, password, pin } = req.body;

  
    const hashedPassword = base62.encodeStr(password);
      
    try {
      // Check if the email is already registered
      const existingSubscriber = await db.subscribers.findOne({ where: { email } });
      if (existingSubscriber) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      else
      {
        const subscriber = await db.subscribers.create({
          name,
          email,
          password: hashedPassword,
          pin,
          operating_status: 'A', // Assuming new subscribers are active by default
        });
        if(subscriber)
        {
          res.status(200).json({ message: 'Registration successful', subscriberId: subscriber.id });
        }
        else
        {
           res.status(500).json({ message: 'Internal server error' });
        }
      }

    }
    catch(err)
    {
      res.status(500).json({ message: 'Internal server error' });
    }
  });



  public_router.get("/cry", function (req, res, next) { 

    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const skey = "e09bbf4c8cea47893f51ef875c06538ca74efdabdc3facd8d358c08155f6d5b5";
    const iv = crypto.randomBytes(16);
    const payload = 'Hola mas tu';
    
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(skey,'hex'),iv);
    const _encrypted = Buffer.concat([cipher.update(payload),cipher.final()])  
    
            res.json({ "data":_encrypted.toString("hex"),iv : iv.toString("hex") });
  })

  public_router.get("/cryd", function (req, res, next) { 
    // {
    //   "data": "b800e9592f9bab29ea20313e2b9e6fe1",
    //   "iv": "67656effc66b5993162f012266bc8c59"
    // }

const data = 'b800e9592f9bab29ea20313e2b9e6fe1'; 


    const algorithm = 'aes-256-cbc';
    const skey = "e09bbf4c8cea47893f51ef875c06538ca74efdabdc3facd8d358c08155f6d5b5";
    const iv = "67656effc66b5993162f012266bc8c59";

    const de_cipher = crypto.createDecipheriv(algorithm,Buffer.from(skey,'hex'),Buffer.from(iv,'hex'));
    
    const result = Buffer.concat([de_cipher.update(Buffer.from(data,'hex')), de_cipher.final()]).toString()
    res.json({ "data": result });

  })


  




module.exports = public_router;
