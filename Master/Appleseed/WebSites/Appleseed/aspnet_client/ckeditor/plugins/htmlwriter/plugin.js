﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('htmlwriter');
CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
    base: CKEDITOR.htmlParser.basicWriter,
    $: function() {
         var c = this; c.base(); c.indentationChars = '\t'; c.selfClosingEnd = ' />'; c.lineBreakChars = '\n'; c.forceSimpleAmpersand = false; c.sortAttributes = true; c._.indent = false; c._.indentation = ''; c._.rules = {}; var a = CKEDITOR.dtd; for (var b in CKEDITOR.tools.extend({}, a.$block, a.$listItem, a.$tableContent)) c.setRules(b, { indent: true, breakBeforeOpen: true, breakAfterOpen: true, breakBeforeClose: !a[b]['#'], breakAfterClose: true }); c.setRules('br', { breakAfterOpen: true }); c.setRules('pre', { indent: false });
    },
    proto: {
         openTag: function(a, b) {
              var d = this; var c = d._.rules[a]; if (d._.indent) d.indentation(); else if (c && c.breakBeforeOpen) { d.lineBreak(); d.indentation(); } d._.output.push('<', a);
         },
         openTagClose: function(a, b) {
              var d = this; var c = d._.rules[a]; if (b) d._.output.push(d.selfClosingEnd); else { d._.output.push('>'); if (c && c.indent) d._.indentation += d.indentationChars; } if (c && c.breakAfterOpen) d.lineBreak();
         },
         attribute: function(a, b) {
             if (this.forceSimpleAmpersand) b = b.replace(/&amp;/, '&'); this._.output.push(' ', a, '="', b, '"');
         },
         closeTag: function(a) {
              var c = this; var b = c._.rules[a]; if (b && b.indent) c._.indentation = c._.indentation.substr(c.indentationChars.length); if (c._.indent) c.indentation(); else if (b && b.breakBeforeClose) { c.lineBreak(); c.indentation(); } c._.output.push('</', a, '>'); if (b && b.breakAfterClose) c.lineBreak();
         },
         text: function(a) {
              if (this._.indent) { this.indentation(); a = CKEDITOR.tools.ltrim(a); } this._.output.push(a);
         },
         comment: function(a) {
              if (this._.indent) this.indentation(); this._.output.push('<!--', a, '-->');
         },
         lineBreak: function() {
              var a = this; if (a._.output.length > 0) a._.output.push(a.lineBreakChars); a._.indent = true;
         },
         indentation: function() {
              this._.output.push(this._.indentation); this._.indent = false;
         }, setRules: function (a, b) { this._.rules[a] = b; }
}
});
