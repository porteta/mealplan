(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><div data-hook="nav-container"></div><div class="container"><main data-hook="page-container"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // includes/dateTimeInput.jade compiled template
    templatizer["includes"]["dateTimeInput"] = function tmpl_includes_dateTimeInput() {
        return '<div class="form-group"><label data-hook="label"></label><div class="date-controls"><div data-hook="month" class="month select-style"></div><span data-hook="day" class="day"></span><span data-hook="year" class="year"></span><span data-hook="hour" class="hour"></span><span data-hook="minute" class="minute"></span><div data-hook="meridiem" class="meridiem select-style"></div><input type="hidden" data-hook="main"/></div><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div></div>';
    };

    // includes/formInput.jade compiled template
    templatizer["includes"]["formInput"] = function tmpl_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><input class="form-control"/><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div></div>';
    };

    // includes/selectInput.jade compiled template
    templatizer["includes"]["selectInput"] = function tmpl_includes_selectInput() {
        return '<label class="select"><span data-hook="label"></span><div class="select-style"><select></select></div><span data-hook="message-container" class="message message-below message-error"><p data-hook="message-text"></p></span></label>';
    };

    // nav.jade compiled template
    templatizer["nav"] = function tmpl_nav() {
        return '<nav><div class="profile"><b data-hook="name"></b><b data-hook="login" class="login">Login</b><b data-hook="logout" class="logout">Logout</b></div><h1><a href="/">Mealplan</a></h1><h3>A simple way to plan a gathering</h3></nav>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><div class="form-container"><h3>Start Planning</h3><form data-hook="plan-form"><fieldset data-hook="field-container"></fieldset><button type="submit">Submit</button></form></div></section>';
    };

    // pages/info.jade compiled template
    templatizer["pages"]["info"] = function tmpl_pages_info(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(app) {
            buf.push('<section class="container"><h2>Simple Page Example</h2><p>This page was rendered by a simple page view file at client/pages/info.js.</p>');
            if (app.currentUser.loggedIn) {
                buf.push('<a href="/">Plan a Meal</a>');
            } else {
                buf.push('<button data-hook="login">Login with Google</button><div data-hook="error" class="error"></div>');
            }
            buf.push("</section>");
        }).call(this, "app" in locals_for_with ? locals_for_with.app : typeof app !== "undefined" ? app : undefined);
        return buf.join("");
    };

    return templatizer;
}));