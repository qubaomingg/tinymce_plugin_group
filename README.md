#Tinymce Group Plugin

[![Build Status](https://travis-ci.org/Aufree/ting.svg?branch=master)](https://travis-ci.org/freestyle21/tinymce_plugin_group)

A plugin for tinymce to show a combinative  menu

## Step

tinymce config:

    toolbar1: 'undo redo | group group group group group | fullscreen',
    group_set: [{
        icon: 'alignleft',
        buttons: 'alignleft,aligncenter,alignright',
        title: 'Align center'
    }, {
        icon: 'bullist',
        buttons: 'bullist,numlist',
        title: 'advanced.bullist_desc'
    }, {
        icon: 'indent',
        buttons: 'indent,outdent',
        title: 'advanced.indent_desc'
    }, {
        icon: 'subscript',
        buttons: 'superscript,subscript',
        title: 'advanced.sup_desc'
    },{
        icon: 'image',
        buttons: 'alitophotobank,image, aliphotobank',
        title: 'advanced.sup_desc'
    }]

## The style

![img](./img/show.png)


## For information

More Information: [http://freestyle21.cn/2015/04/18/tinymce-plugin-group](http://freestyle21.cn/2015/04/18/tinymce-plugin-group/)

Hope you like it!