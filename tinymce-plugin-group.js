 /**
 * tinymce插件，用户组合显示下拉菜单。
 * @author <qubaoming@gmail.com>
 *
*/

(function() {

    // 支持类型 bold italic underlin alignleft
    var buttonsMap = {
        bold : ['Bold', 'Bold'],
        italic : ['Italic', 'Italic'],
        underline : ['Underline', 'Underline'],
        strikethrough : ['Strikethrough', 'Strikethrough'],
        alignleft : ['Align left', 'JustifyLeft'],
        aligncenter : ['Align center', 'JustifyCenter'],
        alignright : ['Align right', 'JustifyRight'],
        alignjustify : ['Alignment', 'JustifyFull'],
        bullist : ['Bullet list', 'InsertUnorderedList'],
        numlist : ['Numbered list', 'InsertOrderedList'],
        outdent : ['Decrease indent', 'Outdent'],
        indent : ['Increase indent', 'Indent'],
        cut : ['Cut', 'Cut'],
        copy : ['Copy', 'Copy'],
        paste : ['Paste', 'Paste'],
        undo : ['Undo', 'Undo'],
        redo : ['Redo', 'Redo'],
        link : ['Insert link', 'mceLink'],
        unlink : ['Remove link', 'unlink'],
        image : ['Insert image', 'mceImage'],
        removeformat : ['Clear formatting', 'mceCleanup'],
        help : ['help', 'mceHelp'],
        code : ['Source code', 'mceCodeEditor'],
        hr : ['Horizontal line', 'InsertHorizontalRule'],
        superscript : ['Subscript', 'subscript'],
        subscript : ['Superscript', 'superscript'],
        newdocument : ['New document', 'mceNewDocument'],
        blockquote : ['Blockquote', 'mceBlockQuote']
    };

    //加载语言包
    tinymce.PluginManager.requireLangPack('group');

    //简历插件类
    tinymce.create('tinymce.plugins.group', {
        //编辑器初始化后将初始化一个插件实例
        init: function(ed, url) {
            //在这个实例中我们保存一些编辑器的公用信息
            this.ed = ed;
            //保留配置信息
            this.settings = ed.settings;

            this.createControl(ed);

            ed.on('init', function() {
                this.createControl(ed);
            }.bind(this));
        },
        // 创 group button
        createControl: function(ed) {
            var _set = this.settings;

            this.modifySettingToolbar(ed);
            for (var i = 1; i < this.toolbarNum; i++) {

                var _item = _set.group_set[i-1]; //获取多组信息
                if(!_item) return false;
                var _buttons = _item ? _item.buttons.split(',') : [],
                    subItem = [];

                for (var j = 0, l = _buttons.length; j < l; j++) {

                    btn  = _buttons[j] && _buttons[j].trim();
                    subItem.push({
                        //配置标题信息则需要考虑到语言和主题
                        text: ed.getLang(buttonsMap[btn] && buttonsMap[btn][0]),
                        //图标类自己创建的话则需要注意格式
                        icon: 'mceIcon mce-i-' + btn,
                        //执行的命令 自己创建的话 也要注意格式
                        onclick: (function(btn) {
                            var cmd = buttonsMap[btn] && buttonsMap[btn][1];
                            return function(e) {
                                ed.execCommand(cmd);
                            }
                        })(btn)
                    });
                }
                ed.addButton('group' + i, {
                    type: 'menubutton',
                    icon: _item.icon || '',
                    menu: subItem
                });
            }
            return false;
        },

        // 修改 setting中toolbar上的group，group为group1，group2
        modifySettingToolbar: function(ed) {
            var index = 1;
            var settings = ed.settings;
            if(!settings.toolbar1 && !settings.toolbar2 && !settings.toolbar3) return false;

            var toolbar1 = settings.toolbar1.split(' '),
                toolbar2 = settings.toolbar2.split(' '),
                toolbar3 = settings.toolbar3.split(' ');

            [toolbar1, toolbar2, toolbar3].forEach(function(item) {
                for (var i = 0; i < item.length; i++) {
                    if(item[i] == 'group') {
                        item[i] = 'group' + index;
                        index ++;
                    }
                };
            });
            this.toolbarNum = index;
            settings.toolbar1 = toolbar1.join(' ');
            settings.toolbar2 = toolbar2.join(' ');
            settings.toolbar3 = toolbar3.join(' ');
        },

        // 获取editor里面buttons的状态值 暂时不用
        getButtonsStatue: function(ed) {
            var name = '',
                buttons = ed.buttons,
                buttonsMap = {};

            for(var item in buttons) {
                var test = buttons[item];
                // bold等没有 cmd.
                if(buttons[item].cmd) {
                    name = buttons[item].cmd && buttons[item].cmd.toLowerCase();
                } else {
                    name = buttons[item].icon && buttons[item].icon.toLowerCase();
                }
                buttonsMap[name] = {
                    name: name,
                    icon: buttons[item].icon,
                    cmd: buttons[item].onclick,
                    tooltip: buttons[item].tooltip
                };
            };
            return buttonsMap;
        },
        /**
        * Returns information about the plugin as a name/value array.
        * The current keys are longname, author, authorurl, infourl and version.
        * 插件信息
        * @return {Object} Name/value array containing information about the plugin.
        */
        getInfo: function() {
            return {
                longname: 'zh_cn',
                author: 'baomign.qbm',
                authorurl: 'http://freestyle21.cn',
                infourl: 'http://freestyle21.cn',
                version: '1.0'
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('group', tinymce.plugins.aliGroup);
})();
