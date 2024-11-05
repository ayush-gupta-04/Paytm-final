import prisma from "@paytm-repo/db/client";
import express from "express"
import crypto from "crypto"
const app = express();
app.use(express.json())
app.post('/api/hdfc/gettoken',async (req,res) => {
    const token = crypto.randomUUID();
    //this amount is already *100
    const {amount,webhookUrl,userId } = req.body;
    await prisma.hdfcBankTnx.create({
        data : {
            token : token,
            tokenExpiry : Date.now() + 5*60000 + "",
            amount : amount,
            webhookUrl : webhookUrl,
            userId : userId
        }
    })
    res.json({
        token : token
    })
})
app.listen(3002)