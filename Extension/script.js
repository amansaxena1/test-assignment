document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('button');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const code = document.getElementById('code');
    const popup = document.getElementById('popup');
    function validate(name, email, code){
        const nameRegex = /^[A-Za-z ]+$/;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return name.length > 1 && nameRegex.test(name) && emailRegex.test(email);
    }
    function encrypt(string) {
        string = unescape(encodeURIComponent(string));
        var newString = '', char, nextChar, combinedCharCode;
        for (var i = 0; i < string.length; i += 2) {
          char = string.charCodeAt(i);      
          if ((i + 1) < string.length) {
            nextChar = string.charCodeAt(i + 1) - 31;
            combinedCharCode = char + "" + nextChar.toLocaleString('en', {
              minimumIntegerDigits: 2
            });
            newString += String.fromCharCode(parseInt(combinedCharCode, 10));
          } else newString += string.charAt(i);
        }
        return encodeURIComponent(btoa(unescape(encodeURIComponent(newString))));
      }
    button.addEventListener('click', async function() {
        if(!validate(name.value, email.value, code.value)) popup.style.display="block";
        else {
            const obj = {
                name: name.value,
                email: email.value,
                code: code.value
            }
            const encrypted = encrypt(JSON.stringify(obj));
            const URL = "https://elitmus-fe.vercel.app/verification?id=" + encrypted;
            chrome.tabs.create({url: URL});
            return false;
        }
    });
});
