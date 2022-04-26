import crypto from "crypto";

const secret =
    "c8IdqOPeBTnZa0d3oCq8kgMFEg2j1WbpoObDB1tPp04yfD0JdAEvP61p00y9EoWQ8zVqgKKwpKXRF6u69tY5WZ00hCqG8WUuHepx";

export async function hmacSHA256(string) {
    return replaceSpecialChars(
        crypto.createHmac("sha256", secret).update(string).digest("base64")
    );
}

export async function sign(string) {
    return hmacSHA256(string);
}
export async function password(uname, pwd) {
    return hmacSHA256(uname + pwd);
}

const replaceSpecialChars = async(b64string) => {
    // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
    return b64string.replace(/[=+/]/g, (charToBeReplaced) => {
        switch (charToBeReplaced) {
            case "=":
                return "";
            case "+":
                return "-";
            case "/":
                return "_";
        }
    });
};

export async function encode(string) {
    console.log(string);
    return Buffer.from(string).toString("base64url");
}

export async function decode(string) {
    return Buffer.from(string, "base64url").toString();
}

export async function verifyToken(token) {
    const [header, payload, signature] = token.split(".");
    const headerJSON = await decode(header);
    const payloadJSON = await decode(payload);
    const payloadObj = JSON.parse(payloadJSON);
    const headerEncoded = await encode(JSON.stringify(headerJSON));
    const payloadEncoded = await encode(JSON.stringify(payloadJSON));
    const expectedSignature = await sign(`${headerEncoded}.${payloadEncoded}`);
    if (expectedSignature === signature) {
        if (payloadObj.exp < Date.now()) {
            return payloadObj;
        }
        console.log("AUTH.VERIFY_TOKEN : token is expired");
        return null;
    }
    console.log(
        `AUTH.VERIFY_TOKEN : signature is incorrect got ${signature} expected ${expectedSignature}`
    );
    return null;
}

export default { sign, password, encode, decode, verifyToken };