// https://colorthoro.github.io/onJS/2 or https://colorthoro.gitee.io/on-js/I8DPN1
var paths = location.pathname.split("/");  // [protocal:]//[host][/pathname/][?search][#hash]
var repohomepage = location.origin + paths.slice(0, 2).join('/');
var issueNumber = paths[2]; // ['', 'on-js', 'issueNumber']
lead().catch(err => { window.alert(err); location.replace(repohomepage); });
async function lead() {
    if (!issueNumber) throw new Error('no issueNumber.');
    var url = await getIssueTitleUrl();
    var FinalUrl = url.replace('[dddcg:ccair14]', await getIP('ccair14'));
    var encodeUrl = encodeURI(FinalUrl);
    location.replace(encodeUrl);
}
async function getIP(name) {
    var jscode = await fetch('./dddcg.js').then(res => res.text());
    var asyncFunc = new Function(`return ${jscode}`);
    var dns = await asyncFunc();
    return dns[name];
}
async function getIssueTitleUrl() {
    // https://api.github.com/repos/{owner}/{repo}/issues/
    var ISSUES_LINK = "https://api.github.com/repos/colorthoro/onJS/issues/";
    var queryUrl = ISSUES_LINK + issueNumber;
    let dec = new TextDecoder();
    var something = new Uint8Array([66, 101, 97, 114, 101, 114, 32, 103, 105, 116, 104, 117, 98, 95, 112, 97, 116, 95, 49, 49, 65, 79, 73, 52, 71, 72, 81, 48, 115, 48, 68, 116, 97, 49, 120, 115, 105, 50, 73, 106, 95, 120, 112, 113, 107, 75, 106, 97, 57, 97, 101, 49, 78, 103, 120, 120, 90, 73, 81, 52, 118, 98, 73, 56, 86, 107, 86, 86, 119, 106, 100, 81, 112, 81, 109, 55, 117, 75, 89, 69, 102, 51, 83, 102, 79, 74, 81, 80, 66, 50, 70, 87, 85, 81, 112, 81, 73, 109, 52, 117]);
    var payload = await fetch(queryUrl, {
        headers: { 'Authorization': dec.decode(something) }
    }).then(res => res.json());
    var message = payload.message;
    if (message == 'Issue') throw new Error('Issue not found.');
    var title = payload.title;
    if (!title.startsWith('http')) throw new Error('Issue title is not a url');
    return title;
}