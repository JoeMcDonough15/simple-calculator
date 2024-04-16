(()=>{"use strict";const t="Xx*÷/",e=[document.getElementById("main-container"),document.getElementById("calculator-shell"),document.getElementById("display-window"),Array.from(document.querySelectorAll(".btn"))],i=document.getElementById("toggle-dark-mode"),r=document.getElementById("clear-button"),n=document.querySelectorAll(".btn__num"),u=document.querySelectorAll(".btn__operator"),s=document.getElementById("open-parenthesis"),a=document.getElementById("close-parenthesis"),h=document.getElementById("toggle-negative"),c=document.getElementById("percentage-button"),l=document.getElementById("pi-button"),g=document.getElementById("square-button"),o=document.getElementById("cube-button"),m=document.getElementById("custom-exponent-button"),d=document.getElementById("euler-button"),S=document.getElementById("factorial-button"),N=document.getElementById("inverse-fraction-button"),p=document.getElementById("euler-raised-button"),v=document.querySelectorAll(".btn__trig"),k=document.getElementById("display-text"),y=new class{equationStack;currentNumString;numToDisplay;base;trig;equationStringHasReduced;overwriteCurrentNumString;clearAll;constructor(){this.equationStack=["+0"],this.currentNumString="",this.numToDisplay="0",this.base="",this.trig="",this.equationStringHasReduced=!1,this.overwriteCurrentNumString=!1,this.clearAll=!1}handleNums(t){this.switchToClear(),this.overwriteCurrentNumString&&(this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.currentNumString=this.currentNumString[0],this.overwriteCurrentNumString=!1),this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.currentNumString=this.concatOrReplace(this.currentNumString,t),this.updateNumToDisplay(this.currentNumString)}handleOperators(t){(!this.base&&!this.trig||this.isValidNumString(this.currentNumString))&&(this.base&&this.solveCustomExponents(),this.trig&&this.handleTrig(),this.overwriteCurrentNumString&&(this.overwriteCurrentNumString=!1),"=Enter".includes(t)?this.handleEquals():(this.isValidNumString(this.currentNumString)?(this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.currentNumString=this.currentNumString[0]+Number(this.currentNumString.slice(1)).toString(),this.reduceEquationString(t)):this.updateNumToDisplay(""),this.currentNumString=t))}concatOrReplace(t,e){return t.includes(".")&&"."===e||(2===t.length&&"0"===t[1]&&"."===e||1===t.length&&"."===e?t=`${t[0]}0.`:2===t.length&&"0"===t[1]?t=`${t[0]}${e}`:t+=e),t}giveDefaultOperator(t){return""!==t&&this.isOperator(t[0])||(t=`+${t}`),t}grabLastNum(t){let e,i=t.length-1;for(;i>=0;){if(this.isOperator(t[i]))return e=this.isOperator(t[i-1])?t.slice(i-1):t.slice(i),e;i-=1}return e}grabLastStringInStack(){return this.equationStack[this.equationStack.length-1]}isOperator(t){return"+÷-xX/*=Enter".includes(t)}updateNumToDisplay(t){0===t.length&&(t=this.grabLastNum(this.grabLastStringInStack()));const e=t[0];this.isOperator(e)&&(t=t.slice(1)),this.numToDisplay=t}handlePercentage(t){return math.chain(t).divide(100)}handlePi(){const t=this.giveDefaultOperator(this.currentNumString)[0],e=math.pi.toString();this.currentNumString=t+e,this.updateNumToDisplay(this.currentNumString),this.overwriteCurrentNumString=!0}handleEuler(){const t=this.giveDefaultOperator(this.currentNumString)[0],e=math.e.toString();this.currentNumString=t+e,this.updateNumToDisplay(this.currentNumString),this.overwriteCurrentNumString=!0}handleRaiseEuler(){this.handleEuler(),this.base=this.currentNumString}handleSquared(t){return math.pow(t,2)}handleCubed(t){return math.pow(t,3)}handleFactorial(t){return math.factorial(t)}handleInverseFraction(t){return math.chain(100).divide(t).divide(100)}setBase(){this.base=this.currentNumString,this.currentNumString=""}solveCustomExponents(){const t=this.base[0],e=math.pow(Number(this.base.slice(1)),Number(this.currentNumString)).toString();this.currentNumString=t+e,this.base=""}determineTrigFunction(t){this.trig=t}handleTrig(){let t;const e=this.currentNumString[0],i=Number(this.currentNumString.slice(1));t="sin"===this.trig?math.sin(i):"cos"===this.trig?math.cos(i):math.tan(i),t=e+t.toString(),this.trig="",this.currentNumString=t}handleOpenParenthesis(){if(this.base)return!1;const t=this.determineStoredOperator(this.currentNumString);return this.isValidNumString(this.currentNumString)?(this.currentNumString=this.giveDefaultOperator(this.currentNumString)+t,this.equationStack[this.equationStack.length-1]+=this.currentNumString):this.equationStack[this.equationStack.length-1]+=t,this.equationStack.push("+0"),this.currentNumString="",this.equationStringHasReduced=!1,!0}handleCloseParenthesis(){if(1===this.equationStack.length)return!1;this.isValidNumString(this.currentNumString)||(this.currentNumString=this.fixInvalidNumString(this.currentNumString)),this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.reduceEquationString("=");const t=this.equationStack.pop(),e=this.grabLastStringInStack(),i=e[e.length-1];return this.equationStack[this.equationStack.length-1]=e.slice(0,e.length-1),this.currentNumString=this.replaceOperator(t,i),this.overwriteCurrentNumString=!0,!0}makePosOrNeg(t){return 0===t?t:t<0?math.abs(t):0-t}handleEquals(){for(;this.equationStack.length>1;)this.handleCloseParenthesis();this.isValidNumString(this.giveDefaultOperator(this.currentNumString))||(this.currentNumString=this.fixInvalidNumString(this.currentNumString)),this.reduceEquationString("="),this.currentNumString=this.equationStack[0],this.equationStack[0]="+0",this.switchToClear(),this.equationStringHasReduced=!1,this.overwriteCurrentNumString=!0}reduceEquationString(t){let e=this.currentNumString[0],i=this.grabLastStringInStack();for(this.equationStringHasReduced||(this.equationStringHasReduced=!0);0!==i.length&&!this.isHigherOrder(e,t);){const t=this.grabLastNum(i),r=t[0],n=t.slice(1);i=this.cutFromNumString(i,t.length),this.equationStack[this.equationStack.length-1]=i;const u=Number(n),s=Number(this.currentNumString.slice(1)),a=this.calculate(u,s,e);this.currentNumString=`${r}${a.toString()}`,e=r}this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.equationStack[this.equationStack.length-1]+=this.currentNumString,this.updateNumToDisplay(this.currentNumString)}calculate(t,e,i){let r;return r="+"===i?math.chain(t).add(e).done():"-"===i?math.chain(t).subtract(e).done():"*"===i||"x"===i||"X"===i?math.chain(t).multiply(e).done():math.chain(t).divide(e).done(),r}clear(){(this.isValidNumString(this.currentNumString)||"+0"!==this.equationStack[0]||1!==this.equationStack.length||this.trig||this.base)&&(this.isValidNumString(this.currentNumString)?"+0"!==this.equationStack[0]||this.equationStack.length>1?(this.currentNumString=this.giveDefaultOperator(this.currentNumString)[0],this.switchToAllClear()):this.currentNumString="":(this.currentNumString="",this.switchToAllClear()),this.updateNumToDisplay("0"))}switchToAllClear(){this.clearAll=!0}switchToClear(){this.clearAll=!1}allClear(){this.currentNumString="",this.equationStack.length=0,this.equationStack.push("+0"),this.base="",this.trig="",this.updateNumToDisplay(this.currentNumString),this.switchToClear(),this.equationStringHasReduced=!1}updateNumStringInPlace(t){if(!this.isValidNumString(this.currentNumString)){const t=this.grabLastNum(this.grabLastStringInStack());this.equationStack[this.equationStack.length-1]=this.cutFromNumString(this.grabLastStringInStack(),t.length),this.currentNumString=t}const e=this.currentNumString[0],i=t(Number(this.removeOperator(this.currentNumString))).toString();this.currentNumString=e+i,this.updateNumToDisplay(this.currentNumString),this.overwriteCurrentNumString=!0}isValidNumString(t){return!(0===t.length||1===t.length&&this.isOperator(t))}fixInvalidNumString(e){const i=this.giveDefaultOperator(e)[0];return t.includes(i)?`${i}1`:`${i}0`}cutFromNumString(t,e){const i=t.length-e;return t.slice(0,i)}isDigit(t){return"0123456789.".includes(t)}isHigherOrder(e,i){return"+-".includes(e)&&t.includes(i)}determineStoredOperator(t){let e;return e=0!==t.length||this.equationStringHasReduced?1!==t.length||this.isValidNumString(t)?"*":t:"+",e}replaceOperator(t,e){return`${e}${t.slice(1)}`}removeOperator(t){return t.slice(1)}};function E(t){k.value=" ",setTimeout((()=>{k.value=t}),30)}function b(t){t.classList.add("key-pressed"),setTimeout((()=>{t.classList.remove("key-pressed")}),150)}function q(t){t.forEach((t=>{t.constructor===Array?q(t):t.classList.toggle("dark")}))}i.addEventListener("click",(()=>{q(e)})),n.forEach((t=>{t.addEventListener("click",(t=>{y.handleNums(t.target.innerText),b(t.target),E(y.numToDisplay)}))})),h.addEventListener("click",(t=>{y.updateNumStringInPlace(y.makePosOrNeg),b(t.target),E(y.numToDisplay)})),u.forEach((t=>{t.addEventListener("click",(t=>{y.handleOperators(t.target.innerText),b(t.target),E(y.numToDisplay)}))})),r.addEventListener("click",(t=>{y.clearAll?(y.allClear(),t.target.innerText="C"):(y.clear(),y.clearAll&&(t.target.innerText="A/C")),b(t.target),E(y.numToDisplay)})),s.addEventListener("click",(t=>{y.handleOpenParenthesis()&&b(t.target)})),a.addEventListener("click",(t=>{y.handleCloseParenthesis()&&(b(t.target),E(y.numToDisplay))})),c.addEventListener("click",(t=>{y.updateNumStringInPlace(y.handlePercentage),b(t.target),E(y.numToDisplay)})),l.addEventListener("click",(t=>{y.handlePi(),b(t.target),E(y.numToDisplay)})),d.addEventListener("click",(t=>{y.handleEuler(),b(t.target),E(y.numToDisplay)})),p.addEventListener("click",(t=>{y.base||(y.handleRaiseEuler(),b(t.target),E(y.numToDisplay))})),g.addEventListener("click",(t=>{y.updateNumStringInPlace(y.handleSquared),b(t.target),E(y.numToDisplay)})),o.addEventListener("click",(t=>{y.updateNumStringInPlace(y.handleCubed),b(t.target),E(y.numToDisplay)})),S.addEventListener("click",(t=>{y.updateNumStringInPlace(y.handleFactorial),b(t.target),E(y.numToDisplay)})),N.addEventListener("click",(t=>{y.updateNumStringInPlace(y.handleInverseFraction),b(t.target),E(y.numToDisplay)})),m.addEventListener("click",(t=>{y.base||y.isValidNumString(y.currentNumString)&&(y.setBase(),b(t.target),E(y.numToDisplay))})),v.forEach((t=>{t.addEventListener("click",(t=>{y.determineTrigFunction(t.target.getAttribute("id")),b(t.target)}))}))})();