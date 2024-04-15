(()=>{"use strict";const t="Xx*÷/",e=(document.getElementById("calculator-shell"),document.getElementById("clear-button")),r=document.querySelectorAll(".btn__num"),i=document.querySelectorAll(".btn__operator"),n=document.getElementById("open-parenthesis"),s=document.getElementById("close-parenthesis"),u=document.getElementById("toggle-negative"),a=document.getElementById("percentage-button"),h=document.getElementById("pi-button"),c=document.getElementById("square-button"),l=document.getElementById("cube-button"),g=document.getElementById("custom-exponent-button"),o=document.getElementById("euler-button"),m=document.getElementById("factorial-button"),d=document.getElementById("inverse-fraction-button"),S=document.getElementById("euler-raised-button"),N=document.querySelectorAll(".btn__trig"),p=document.getElementById("display-text"),v=new class{equationStack;operatorsBeforeParentheses;currentNumString;numToDisplay;base;trig;equationStringHasReduced;overwriteCurrentNumString;clearAll;constructor(){this.equationStack=["+0"],this.operatorsBeforeParentheses=[],this.currentNumString="",this.numToDisplay="0",this.base="",this.trig="",this.equationStringHasReduced=!1,this.overwriteCurrentNumString=!1,this.clearAll=!1}handleNums(t){this.switchToClear(),this.overwriteCurrentNumString&&(this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.currentNumString=this.currentNumString[0],this.overwriteCurrentNumString=!1),this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.currentNumString=this.concatOrReplace(this.currentNumString,t),this.updateNumToDisplay(this.currentNumString)}handleOperators(t){(!this.base&&!this.trig||this.isValidNumString(this.currentNumString))&&(this.base&&this.solveCustomExponents(),this.trig&&this.handleTrig(),this.overwriteCurrentNumString&&(this.overwriteCurrentNumString=!1),"=Enter".includes(t)?this.handleEquals():(this.isValidNumString(this.currentNumString)?(this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.currentNumString=this.currentNumString[0]+Number(this.currentNumString.slice(1)).toString(),this.reduceEquationString(t)):this.updateNumToDisplay(""),this.currentNumString=t))}concatOrReplace(t,e){return t.includes(".")&&"."===e||(2===t.length&&"0"===t[1]&&"."===e||1===t.length&&"."===e?t=`${t[0]}0.`:2===t.length&&"0"===t[1]?t=`${t[0]}${e}`:t+=e),t}giveDefaultOperator(t){return""!==t&&this.isOperator(t[0])||(t=`+${t}`),t}grabLastNum(t){let e,r=t.length-1;for(;r>=0;){if(this.isOperator(t[r]))return e=this.isOperator(t[r-1])?t.slice(r-1):t.slice(r),e;r-=1}return e}grabLastStringInStack(t){return t[t.length-1]}isOperator(t){return"+÷-xX/*=Enter".includes(t)}updateNumToDisplay(t){0===t.length&&(t=this.grabLastNum(this.grabLastStringInStack(this.equationStack)));const e=t[0];this.isOperator(e)&&(t=t.slice(1)),this.numToDisplay=t}handlePercentage(t){return math.chain(t).divide(100)}handlePi(){const t=this.giveDefaultOperator(this.currentNumString)[0],e=math.pi.toString();this.currentNumString=t+e,this.updateNumToDisplay(this.currentNumString),this.overwriteCurrentNumString=!0}handleEuler(){const t=this.giveDefaultOperator(this.currentNumString)[0],e=math.e.toString();this.currentNumString=t+e,this.updateNumToDisplay(this.currentNumString),this.overwriteCurrentNumString=!0}handleRaiseEuler(){this.handleEuler(),this.base=this.currentNumString}handleSquared(t){return math.pow(t,2)}handleCubed(t){return math.pow(t,3)}handleFactorial(t){return math.factorial(t)}handleInverseFraction(t){return math.chain(100).divide(t).divide(100)}setBase(){this.base=this.currentNumString,this.currentNumString=""}solveCustomExponents(){const t=this.base[0],e=math.pow(Number(this.base.slice(1)),Number(this.currentNumString)).toString();this.currentNumString=t+e,this.base=""}determineTrigFunction(t){this.trig=t}handleTrig(){let t;const e=this.currentNumString[0],r=Number(this.currentNumString.slice(1));t="sin"===this.trig?math.sin(r):"cos"===this.trig?math.cos(r):math.tan(r),t=e+t.toString(),this.trig="",this.currentNumString=t}handleOpenParenthesis(){if(this.base)return!1;const t=this.determineStoredOperator(this.currentNumString);return this.operatorsBeforeParentheses.push(t),this.isValidNumString(this.currentNumString)&&(this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.equationStack[this.equationStack.length-1]+=this.currentNumString),this.equationStack.push("+0"),this.currentNumString="",this.equationStringHasReduced=!1,!0}handleCloseParenthesis(){if(0===this.operatorsBeforeParentheses.length)return!1;this.isValidNumString(this.currentNumString)||(this.currentNumString=this.fixInvalidNumString(this.currentNumString)),this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.reduceEquationString("=");const t=this.equationStack.pop(),e=this.operatorsBeforeParentheses.pop();return this.currentNumString=this.replaceOperator(t,e),this.overwriteCurrentNumString=!0,!0}makePosOrNeg(t){return 0===t?t:t<0?math.abs(t):0-t}handleEquals(){if(this.equationStack.length>1)for(;this.operatorsBeforeParentheses.length>0;)this.handleCloseParenthesis();this.isValidNumString(this.giveDefaultOperator(this.currentNumString))||(this.currentNumString=this.fixInvalidNumString(this.currentNumString)),this.reduceEquationString("="),this.currentNumString=this.equationStack[0],this.equationStack[0]="+0",this.switchToClear(),this.equationStringHasReduced=!1,this.overwriteCurrentNumString=!0}reduceEquationString(t){let e=this.currentNumString[0],r=this.grabLastStringInStack(this.equationStack);for(this.equationStringHasReduced||(this.equationStringHasReduced=!0);0!==r.length&&!this.isHigherOrder(e,t);){const t=this.grabLastNum(r),i=t[0],n=t.slice(1);r=this.cutFromNumString(r,t.length),this.equationStack[this.equationStack.length-1]=r;const s=Number(n),u=Number(this.currentNumString.slice(1)),a=this.calculate(s,u,e);this.currentNumString=`${i}${a.toString()}`,e=i}this.currentNumString=this.giveDefaultOperator(this.currentNumString),this.equationStack[this.equationStack.length-1]+=this.currentNumString,this.updateNumToDisplay(this.currentNumString)}calculate(t,e,r){let i;return i="+"===r?math.chain(t).add(e).done():"-"===r?math.chain(t).subtract(e).done():"*"===r||"x"===r||"X"===r?math.chain(t).multiply(e).done():math.chain(t).divide(e).done(),i}clear(){(this.isValidNumString(this.currentNumString)||"+0"!==this.equationStack[0]||1!==this.equationStack.length||this.trig||this.base)&&(this.isValidNumString(this.currentNumString)?"+0"!==this.equationStack[0]||this.equationStack.length>1?(this.currentNumString=this.giveDefaultOperator(this.currentNumString)[0],this.switchToAllClear()):this.currentNumString="":(this.currentNumString="",this.switchToAllClear()),this.updateNumToDisplay("0"))}switchToAllClear(){this.clearAll=!0}switchToClear(){this.clearAll=!1}allClear(){this.currentNumString="",this.equationStack.length=0,this.equationStack.push("+0"),this.base="",this.trig="",this.updateNumToDisplay(this.currentNumString),this.switchToClear(),this.equationStringHasReduced=!1}updateNumStringInPlace(t){if(!this.isValidNumString(this.currentNumString)){const t=this.grabLastNum(this.grabLastStringInStack(this.equationStack));this.equationStack[this.equationStack.length-1]=this.cutFromNumString(this.grabLastStringInStack(this.equationStack),t.length),this.currentNumString=t}const e=this.currentNumString[0],r=t(Number(this.removeOperator(this.currentNumString))).toString();this.currentNumString=e+r,this.updateNumToDisplay(this.currentNumString),this.overwriteCurrentNumString=!0}isValidNumString(t){return!(0===t.length||1===t.length&&this.isOperator(t))}fixInvalidNumString(e){const r=this.giveDefaultOperator(e)[0];return t.includes(r)?`${r}1`:`${r}0`}cutFromNumString(t,e){const r=t.length-e;return t.slice(0,r)}isDigit(t){return"0123456789.".includes(t)}isHigherOrder(e,r){return"+-".includes(e)&&t.includes(r)}determineStoredOperator(t){let e;return e=0!==t.length||this.equationStringHasReduced?1!==t.length||this.isValidNumString(t)?"*":t:"+",e}replaceOperator(t,e){return`${e}${t.slice(1)}`}removeOperator(t){return t.slice(1)}};function k(t){p.value=" ",setTimeout((()=>{p.value=t}),30)}function b(t){t.classList.add("key-pressed"),setTimeout((()=>{t.classList.remove("key-pressed")}),150)}r.forEach((t=>{t.addEventListener("click",(t=>{v.handleNums(t.target.innerText),b(t.target),k(v.numToDisplay)}))})),u.addEventListener("click",(t=>{v.updateNumStringInPlace(v.makePosOrNeg),b(t.target),k(v.numToDisplay)})),i.forEach((t=>{t.addEventListener("click",(t=>{v.handleOperators(t.target.innerText),b(t.target),k(v.numToDisplay)}))})),e.addEventListener("click",(t=>{v.clearAll?(v.allClear(),t.target.innerText="C"):(v.clear(),v.clearAll&&(t.target.innerText="A/C")),b(t.target),k(v.numToDisplay)})),n.addEventListener("click",(t=>{v.handleOpenParenthesis()&&b(t.target)})),s.addEventListener("click",(t=>{v.handleCloseParenthesis()&&(b(t.target),k(v.numToDisplay))})),a.addEventListener("click",(t=>{v.updateNumStringInPlace(v.handlePercentage),b(t.target),k(v.numToDisplay)})),h.addEventListener("click",(t=>{v.handlePi(),b(t.target),k(v.numToDisplay)})),o.addEventListener("click",(t=>{v.handleEuler(),b(t.target),k(v.numToDisplay)})),S.addEventListener("click",(t=>{v.base||(v.handleRaiseEuler(),b(t.target),k(v.numToDisplay))})),c.addEventListener("click",(t=>{v.updateNumStringInPlace(v.handleSquared),b(t.target),k(v.numToDisplay)})),l.addEventListener("click",(t=>{v.updateNumStringInPlace(v.handleCubed),b(t.target),k(v.numToDisplay)})),m.addEventListener("click",(t=>{v.updateNumStringInPlace(v.handleFactorial),b(t.target),k(v.numToDisplay)})),d.addEventListener("click",(t=>{v.updateNumStringInPlace(v.handleInverseFraction),b(t.target),k(v.numToDisplay)})),g.addEventListener("click",(t=>{v.base||v.isValidNumString(v.currentNumString)&&(v.setBase(),b(t.target),k(v.numToDisplay))})),N.forEach((t=>{t.addEventListener("click",(t=>{v.determineTrigFunction(t.target.getAttribute("id")),b(t.target)}))}))})();