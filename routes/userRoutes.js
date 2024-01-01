const express=require("express")
const userInfo=require("../controllers/userInfo")
const loginController=require("../controllers/login")
const authMiddle=require("../middlewares/authenticate")
const detailValidate=require("../middlewares/detailsValidation")
const router=express.Router()

// maintaining customer data

/**
 * @openapi
 * /api/v1/allcustomer:
 *   get:
 *     tags:
 *       - Users Info
 *     summary: This API is used to get the information of all users
 *     description: It will return the array of all the users
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 *
 * /api/v1/newcustomer:
 *   post:
 *     tags:
 *       - create new user
 *     summary: It makes a new entry in the database
 *     description: As we hit this endpoint, it will go through a validation middleware and then make a new entry in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '500':
 *         description: Due to internal server error
 */

router.get("/allcustomer",userInfo.allUserInfo)


router.post("/newcustomer",detailValidate.validation,userInfo.createUser)
router.delete("/removecustomer",userInfo.removeCustomer)

//login

router.post("/login",detailValidate.validLogin,loginController.login)
router.post("/logout",authMiddle.authenticate,loginController.logout)

module.exports=router

