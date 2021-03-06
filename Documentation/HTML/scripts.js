///////////////////////////////////////////////////////////////////////////////////////////////
// Doc-O-Matic(tm) 3 script file.
// Copyright (C) 2000-2003 by toolsfactory gbr.
// http://www.toolsfactory.com
// http://www.doc-o-matic.com
//
// Distribution permitted as part of browser-based
// Help systems generated by Doc-O-Matic(tm).
///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////
// Available variables which are resolved when Doc-O-Matic use the file:
//
//    SCRIPT_FILE, SCRIPT_FUNCTION_ONLOAD
//
//    HEADER_FILE, TOCIDX_FILE, DEFAULT_TITLE_FILE, DEFAULT_TOPIC_FILE
//
//    STYLESHEET_FILE, EMPTY_BODY_CLASS
//
//    WINDOW_NAME_HEADER, WINDOW_NAME_TOPIC, WINDOW_NAME_TOPICTITLE, WINDOW_NAME_NAVIGATION
//    WINDOW_NAME_ADDINFO, WINDOW_NAME_HIERARCHY, WINDOW_NAME_SEEALSO, WINDOW_NAME_LEGEND
//    WINDOW_NAME_BODYSOURCE, WINDOW_NAME_TOCIDX
//
//    TOC_IMAGE_PLUS, TOC_IMAGE_MINUS
///////////////////////////////////////////////////////////////////////////////////////////////


// the click on the popup link generates a click
// on the body too, we use this variable to block
// hiding the popup window.
var openedpopup = 0;
// the ID of the popup window that is currently open
var openpopupid = '';
// the frame that has opened the popup
var popupdocument = null;

// note: since we may have multiple frames and the
//       script, is loaded into all of them, we
//       use only one instance of these variables
//       which we take from WINDOW_NAME_TOPIC
//       if available

///////////////////////////////////////////////////////////////////////////////////////////////
// hides the current popup window
function hidePopup() {
    // get the container which holds the variables
    var topicframe = findFrame(top, 'topic');

    if (topicframe != null) {
        if (topicframe.openedpopup != 1) {
            if ((topicframe.openpopupid != '') && (topicframe.popupdocument != null)) {
                var elmt = topicframe.popupdocument.getElementById(topicframe.openpopupid);
                if (elmt != null) {
                    elmt.style.visibility = 'hidden';
                }
            openpopupid = '';
            }
        }

        openedpopup = 0;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////
// Opens a Popup window
function openPopup(aElement, source, popupid) {

    hidePopup();

    var topicframe = findFrame(top, 'topic');

    if (topicframe != null) {
        var elmt = document.getElementById(popupid);

        if (elmt != null) {
            elmt.style.top = aElement.offsetTop;
            elmt.style.left = aElement.offsetLeft + aElement.offsetWidth;
            elmt.style.visibility = 'visible';

            elmt.innerHTML = source;

            topicframe.openedpopup = 1;
            topicframe.openpopupid = popupid;
            topicframe.popupdocument = document;
        }
    }

    return true;
};

///////////////////////////////////////////////////////////////////////////////////////////////
// used to hide popup windows.
function onBodyClick() {

    hidePopup();

    return true;
};

///////////////////////////////////////////////////////////////////////////////////////////////
// retrieves a variable from the search string
function getStringVar(varname) {
    var searchstr = document.location.search;
    var varidx = searchstr.indexOf(varname);

    if(varidx >= 0) {
        var startpos = varidx + varname.length +1;
        searchstr = searchstr.substring(startpos, searchstr.length);

        var nextpos = searchstr.length;
        if (searchstr.indexOf('&') >= 0) {
            nextpos = searchstr.indexOf('&');
        }

        searchstr = searchstr.substring(0, nextpos);
    } else {
        searchstr = '';
    }

    return unescape(searchstr);
};

///////////////////////////////////////////////////////////////////////////////////////////////
// searches the entire frameset and returns
// the frame with name frmname
function findFrame(w, frmname) {
    var res = null;

    if (frmname != '') {
        res = w.frames[frmname];

        // if it's not in the current window
        // search the sub-frames
        if (res == null) {
            var L = w.frames.length;
            var i;

            for (i = 0; i < L; i++) {
                res = findFrame(w.frames[i], frmname);
                if (res != null) {
                    break;
                }
            }
        }
    } else {
        result = this;
    }

    return res;
};

///////////////////////////////////////////////////////////////////////////////////////////////
// loads frame frmname with frmfile
function fillFrame(frmname, frmfile) {
    var theframe = findFrame(top, frmname);

    if (theframe != null) {
        theframe.location.replace(frmfile);
    }
    return true;
};

///////////////////////////////////////////////////////////////////////////////////////////////
// Called when the frameset file is loaded
// and loads the framefile passed on the
// search string into the frame also passed
// on the search string
function loadTopicFrame() {
    var frmname = getStringVar('frmname');
    var frmfile = getStringVar('frmfile');

    if ((frmname != '') && (frmfile != '')) {
        fillFrame(frmname, frmfile);
    }
    
    return true;
};


var called = false;

///////////////////////////////////////////////////////////////////////////////////////////////
// ensures the current file is displayed within
// a frameset, if not loads the frame set which
// loads the file itself into the frameset.
// if it is loaded within a frameset already,
// the titleframe is loaded with titlefile instead.
function loadFrameSetOrTitle(framesetfile, targetframe, topicfile, titleframe, titlefile) {
    if (!called) {
        called = true;
        if (self == top) {
            top.location.replace(framesetfile + '?frmname=' + escape(targetframe) + '&frmfile=' + escape(topicfile));
        } else {
            if ((titleframe != '') && (titlefile != '')) {
                fillFrame(titleframe, titlefile);
            }
        }
    }

    return true;
};


///////////////////////////////////////////////////////////////////////////////////////////////
// resizes self if it is not the top window
//function adjustFrameSizeToHeight() {
//    if (self != top) {
//        var elmt = document.getElementById('inner');
//        if (elmt != null) {
//            var h = elmt.offsetHeight;
//
//            //topdocument.frames.body.rows = '200, *';
//
//            //window.innerHeight = h;
//            top.body.rows = (h + 20) + ', *';
////        }
//    }
//
//    return true;
//}

// end of file
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
// shows or hides a TOC sub-tree based on whether
// it's visible or not. Also toggles the corresponding
// expand/collaps graphic.
function toggleTOCEntry(imgID, divID)
{
    var div = document.getElementById(divID);
    var img = document.getElementById(imgID);

    if (div != null) {
        // Unfold the branch if it isn't visible
        if (div.style.display == 'none') {
            if (img != null) {
                img.src = "tocminus.gif";
            }
            div.style.display = '';
        // Collapse the branch if it IS visible
        } else {
            if (img != null) {
                img.src = "tocplus.gif";
            }
        div.style.display = 'none';
        }
    }
}

