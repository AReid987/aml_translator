var AMLTranslator = (function() {
  // YOUR CODE GOES HERE.
  return {
    translate: function(amlStr) {
      var res = []

      var dictionary = {"%": "<STRONG>", "!%": "</STRONG>", "~": "<EM>", "!~": "</EM>"}
      var keys = Object.keys(dictionary)

      var strArr = amlStr.split(/(\^|\s|\b)/)

      var open = ""
      var close = ""

      strArr.forEach(function(el) {
        if (keys.includes(el.substring(0,2))) {
          if (!el.startsWith("!")) {
            open = el
            res.push(el)
          } else if (el.startsWith("!")) {
            close = el
            if (close[1] != open) {
              res.push("!"+open)
              res.push(el)
            } else if (close[1] == open) {
              res.push(el)
            }
          }
        } else if (el != "^" && !keys.includes(el.substring(0,2))) {
          res.push(el)
        }
      })

      var counter = {"%": 0, "!%": 0, "~": 0, "!~": 0}
      var o = ""
      var c = ""
      var idx = 0

      res.forEach(function(char) {
        if (keys.includes(char.substring(0,2))) {
          counter[char.substring(0,2)]+= 1
          if (char.startsWith("!")) {
            c = char.substring(0,2)
          //  console.log("c: " + c)
            if (counter[c] == counter[o]) {
            idx = res.indexOf(char)
            //console.log("index: " +idx)
            } else if (counter[c] > counter[o]) {
              res.splice((idx + 1), 0, o)
            }
          } else {
            o = char.substring(0,2)
            //console.log("o: " + o)
          }
        }
      })

      var final = res.map(function(el) {
        if (keys.includes(el.substring(0,2))) {
          return el.replace(el.substring(0,2), dictionary[el.substring(0,2)])
        } else {
          return el
        }
      })

      return final.join("")
    }

  }
}());

// Make translator available via “require” in Node.js
if (module.exports) {
  module.exports = AMLTranslator
}


// return {
//   translate: function(amlStr) {
//
//     var str = amlStr.split("^")
//
//     var dictionary = {"^%": "<STRONG>", "^!%": "</STRONG>", "^~": "<EM>", "^~": "</EM>"}
//
//     var res = []
//
//     str.forEach(function(char){
//       if (char[0] == "%") {
//         a = "<STRONG>"
//         res.push(char.replace("%", "<STRONG>"))
//       } else if (char[0] == "~") {
//         a = "<EM>"
//         res.push(char.replace("~", "<EM>"))
//       } else if (char[1] == "%") {
//         if (a == "<EM>") {
//           res.push("</EM>")
//
//         }
//         res.push(char.replace("!%", "</STRONG>"))
//       } else if (char[1] == "~") {
//         res.push(char.replace("!~", "</EM>"))
//       } else {
//         res.push(char)
//       }
//     })
//
//     return res.join('')
// }
// }

// strArr.forEach(function(char) {
//   keys.forEach(function(key) {
//     if (key == char) {
//       if (last == "") {
//         last = key
//       } else if (last[0] != "!" && key[1] != last) {
//         res += `!${last}`
//         last = key
//       }
//     }
//   })
//   res += char
// })
