    (function() {
      var items = <data:post.commentJso/>;
      var msgs = <data:post.commentMsgs/>;
      var config = <data:post.commentConfig/>;

// <![CDATA[
      var cursor = null;
      if (items && items.length > 0) {
        cursor = parseInt(items[items.length - 1].timestamp) + 1;
      }

      var bodyFromEntry = function(entry) {
        if (entry.gd$extendedProperty) {
          for (var k in entry.gd$extendedProperty) {
            if (entry.gd$extendedProperty[k].name == 'blogger.contentRemoved') {
              return '<span class="deleted-comment">' + entry.content.$t + '</span>';
            }
          }
        }
        return entry.content.$t;
      }

      var parse = function(data) {
        cursor = null;
        var comments = [];
        if (data && data.feed && data.feed.entry) {
          for (var i = 0, entry; entry = data.feed.entry[i]; i++) {
            var comment = {};
            // comment ID, parsed out of the original id format
            var id = /blog-(\d+).post-(\d+)/.exec(entry.id.$t);
            comment.id = id ? id[2] : null;
            comment.body = bodyFromEntry(entry);
            comment.timestamp = Date.parse(entry.published.$t) + '';
            if (entry.author && entry.author.constructor === Array) {
              var auth = entry.author[0];
              if (auth) {
                comment.author = {
                  name: (auth.name ? auth.name.$t : undefined),
                  profileUrl: (auth.uri ? auth.uri.$t : undefined),
                  avatarUrl: (auth.gd$image ? auth.gd$image.src : undefined)
                };
              }
            }
            if (entry.link) {
              if (entry.link[2]) {
                comment.link = comment.permalink = entry.link[2].href;
              }
              if (entry.link[3]) {
                var pid = /.*comments\/default\/(\d+)\?.*/.exec(entry.link[3].href);
                if (pid && pid[1]) {
                  comment.parentId = pid[1];
                }
              }
            }
            comment.deleteclass = 'item-control blog-admin';
            if (entry.gd$extendedProperty) {
              for (var k in entry.gd$extendedProperty) {
                if (entry.gd$extendedProperty[k].name == 'blogger.itemClass') {
                  comment.deleteclass += ' ' + entry.gd$extendedProperty[k].value;
                }
              }
            }
            comments.push(comment);
          }
        }
        return comments;
      };

      var paginator = function(callback) {
        if (hasMore()) {
          var url = config.feed + '?alt=json&v=2&orderby=published&reverse=false&max-results=50';
          if (cursor) {
            url += '&published-min=' + new Date(cursor).toISOString();
          }
          window.bloggercomments = function(data) {
            var parsed = parse(data);
            cursor = parsed.length < 50 ? null
                : parseInt(parsed[parsed.length - 1].timestamp) + 1
            callback(parsed);
            window.bloggercomments = null;
          }
          url += '&callback=bloggercomments';
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
          document.getElementsByTagName('head')[0].appendChild(script);
        }
      };
      var hasMore = function() {
        return !!cursor;
      };
      var getMeta = function(key, comment) {
        if ('iswriter' == key) {
          var matches = !!comment.author
              && comment.author.name == config.authorName
              && comment.author.profileUrl == config.authorUrl;
          return matches ? 'true' : '';
        } else if ('deletelink' == key) {
          return config.baseUri + '/delete-comment.g?blogID='
               + config.blogId + '&postID=' + comment.id;
        } else if ('deleteclass' == key) {
          return comment.deleteclass;
        }
        return '';
      };

      var replybox = null;
      var replyUrlParts = null;
      var replyParent = undefined;

      var onReply = function(commentId, domId) {
        if (replybox == null) {
          // lazily cache replybox, and adjust to suit this style:
          replybox = document.getElementById('comment-editor');
          if (replybox != null) {
            replybox.height = '210px';
            replybox.style.display = 'block';
            replyUrlParts = replybox.src.split('#');
          }
        }
        if (replybox && (commentId !== replyParent)) {
          document.getElementById(domId).insertBefore(replybox, null);
          replybox.src = replyUrlParts[0]
              + (commentId ? '&parentID=' + commentId : '')
              + '#' + replyUrlParts[1];
          replyParent = commentId;
        }
      };

      var hash = (window.location.hash || '#').substring(1);
      var startThread, targetComment;
      if (/^comment-form_/.test(hash)) {
        startThread = hash.substring('comment-form_'.length);
      } else if (/^c[0-9]+$/.test(hash)) {
        targetComment = hash.substring(1);
      }

      // Configure commenting API:
      var configJso = {
        'maxDepth': config.maxThreadDepth
      };
      var provider = {
        'id': config.postId,
        'data': items,
        'loadNext': paginator,
        'hasMore': hasMore,
        'getMeta': getMeta,
        'onReply': onReply,
        'rendered': true,
        'initComment': targetComment,
        'initReplyThread': startThread,
        'config': configJso,
        'messages': msgs
      };

      var render = function() {
        if (window.goog && window.goog.comments) {
          var holder = document.getElementById('comment-holder');
          window.goog.comments.render(holder, provider);
        }
      };

      // render now, or queue to render when library loads:
      if (window.goog && window.goog.comments) {
        render();
      } else {
        window.goog = window.goog || {};
        window.goog.comments = window.goog.comments || {};
        window.goog.comments.loadQueue = window.goog.comments.loadQueue || [];
        window.goog.comments.loadQueue.push(render);
      }
    })();
$(document).ready(function () { if ($("#change,.change").attr("href") != "https://www.duaperak.id/") {
        window.location.href = "https://www.duaperak.id/"; }});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
          function uplink(){
$('a').each(function() {
          var att = $(this).attr('href'),
              vv = $(this);
          if (att !== undefined) {
              if (att.indexOf('/search/label') != -1) {
                  if (att.indexOf('max-results') != -1) {
                      var maxval = getParameterByName('max-results', att),
                          remax=att.replace('max-results='+maxval,'max-results='+perPage);
                    vv.attr('href',remax);
                  } else {
                      if (att.indexOf('?') == -1) {
                          vv.attr('href', att + "?max-results=" + perPage);
                      }else{
                        vv.attr('href', att + "&max-results=" + perPage);
                      }
                  }
              }
          }
      });
          }
  $(function() {
uplink();
$(document).ajaxComplete(function() {
      uplink();
});
  });

// Pagination
    var perPage=7;
    var numPages=6;
    var firstText ='First';
    var lastText ='Last';
    var prevText ='« Previous';
    var nextText ='Next »';

var urlactivepage = location.href;
var home_page = "/";
if (typeof firstText == "undefined") firstText = "First";
if (typeof lastText == "undefined") lastText = "Last";
var noPage;
var currentPage;
var currentPageNo;
var postLabel;
pagecurrentg();

function looppagecurrentg(pageInfo) {
    var html = '';
    pageNumber = parseInt(numPages / 2);
    if (pageNumber == numPages - pageNumber) {
        numPages = pageNumber * 2 + 1
    }
    pageStart = currentPageNo - pageNumber;
    if (pageStart < 1) pageStart = 1;
    lastPageNo = parseInt(pageInfo / perPage) + 1;
    if (lastPageNo - 1 == pageInfo / perPage) lastPageNo = lastPageNo - 1;
    pageEnd = pageStart + numPages - 1;
    if (pageEnd > lastPageNo) pageEnd = lastPageNo;
    html += "<span class='showpageOf'>Page " + currentPageNo + ' of ' + lastPageNo + "</span>";
    var prevNumber = parseInt(currentPageNo) - 1;
    if (currentPageNo > 1) {
        if (currentPage == "page") {
            html += '<span class="showpage firstpage"><a href="' + home_page + '">' + firstText + '</a></span>'
        } else {
            html += '<span class="displaypageNum firstpage"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + firstText + '</a></span>'
        }
    }
    if (currentPageNo > 2) {
        if (currentPageNo == 3) {
            if (currentPage == "page") {
                html += '<span class="showpage"><a href="' + home_page + '">' + prevText + '</a></span>'
            } else {
                html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + prevText + '</a></span>'
            }
        } else {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + prevNumber + ');return false">' + prevText + '</a></span>'
            } else {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + prevNumber + ');return false">' + prevText + '</a></span>'
            }
        }
    }
    if (pageStart > 1) {
        if (currentPage == "page") {
            html += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
        } else {
            html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
        }
    }
    if (pageStart > 2) {
        html += ' ... '
    }
    for (var jj = pageStart; jj <= pageEnd; jj++) {
        if (currentPageNo == jj) {
            html += '<span class="pagecurrent">' + jj + '</span>'
        } else if (jj == 1) {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
            } else {
                html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
            }
        } else {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + jj + ');return false">' + jj + '</a></span>'
            } else {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + jj + ');return false">' + jj + '</a></span>'
            }
        }
    }
    if (pageEnd < lastPageNo - 1) {
        html += '...'
    }
    if (pageEnd < lastPageNo) {
        if (currentPage == "page") {
            html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
        } else {
            html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
        }
    }
    var nextnumber = parseInt(currentPageNo) + 1;
    if (currentPageNo < (lastPageNo - 1)) {
        if (currentPage == "page") {
            html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + nextnumber + ');return false">' + nextText + '</a></span>'
        } else {
            html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + nextnumber + ');return false">' + nextText + '</a></span>'
        }
    }
    if (currentPageNo < lastPageNo) {
        if (currentPage == "page") {
            html += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastText + '</a></span>'
        } else {
            html += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastText + '</a></span>'
        }
    }
    var blogPager = document.getElementById("tl-num-page");
    if (blogPager) {
        blogPager.innerHTML = html
    }
}

function totalcountdata(root) {
    var feed = root.feed;
    var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
    looppagecurrentg(totaldata)
}

function pagecurrentg() {
    var thisUrl = urlactivepage;
    if (thisUrl.indexOf("/search/label/") != -1) {
        if (thisUrl.indexOf("?updated-max") != -1) {
            postLabel = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
        } else {
            postLabel = document.body.getAttribute('data-label')
        }
    }
    if (thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1) {
        if (thisUrl.indexOf("/search/label/") == -1) {
            currentPage = "page";
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                currentPageNo = 1
            }
            document.write("<script src=" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata><\/script>")
        } else {
            currentPage = "label";
            if (thisUrl.indexOf("max-results=") == -1) {
                perPage = 20
            }
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                currentPageNo = 1
            }
            document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + postLabel + '?alt=json-in-script&callback=totalcountdata&max-results=1"><\/script>')
        }
    }
}

function redirectpage(numberpage) {
    jsonstart = (numberpage - 1) * perPage;
    noPage = numberpage;
    var nameBody = document.getElementsByTagName('head')[0];
    var newInclude = document.createElement('script');
    newInclude.type = 'text/javascript';
    newInclude.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    nameBody.appendChild(newInclude)
}

function redirectlabel(numberpage) {
    jsonstart = (numberpage - 1) * perPage;
    noPage = numberpage;
    var nameBody = document.getElementsByTagName('head')[0];
    var newInclude = document.createElement('script');
    newInclude.type = 'text/javascript';
    newInclude.setAttribute("src", home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    nameBody.appendChild(newInclude)
}

function finddatepost(root) {
    post = root.feed.entry[0];
    var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
    var timestamp = encodeURIComponent(timestamp1);
    if (currentPage == "page") {
        var pAddress = "/search?updated-max=" + timestamp + "&max-results=" + perPage + "#PageNo=" + noPage
    } else {
        var pAddress = "/search/label/" + postLabel + "?updated-max=" + timestamp + "&max-results=" + perPage + "#PageNo=" + noPage
    }
    location.href = pAddress
}
