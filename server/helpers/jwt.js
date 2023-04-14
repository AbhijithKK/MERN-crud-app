const jwt=require('jsonwebtoken');

function jwtSign(data){
    var token = jwt.sign({ data: data }, 'secrect');
    return token
}

function jwtverify(Token){
    let verify=jwt.verify(Token,'secrect')
    return verify
}
module.exports={jwtSign,jwtverify}