/**
 * coolMultiple jQuery plugin
 *
 * Transforms a select or a list of checkboxes into a nicer control.
 * 
 * Usage: 
 * $('#my_multiple_select').coolMultiple();
 * $('#my_checkbox_list_wrapper').coolMultiple({mode:'checkboxes'});
 * 
 * If you choose checkboxes, you need to run coolMultiple() on a div that's wrapping the checkboxes.
 * Also, each checkbox and it's text must be wrapped by a tag (e.g. <label><input .../> Label text</label>)
 * This is usually the way to do it anyways :)
 * 
 * Also needs some basic CSS or else it won't look like much. Check archive for a sample.
 * 
 * Tested with jQuery 1.3.2, 1.4.2
 * 
 * @todo auto-detect mode
 * @version 1.0
 * @author vlad fratila, vlad.fratila@gmail.com
 * 
 */

(function($){

    var methods = {
        'init': function(options){
            var d = new Date();
            
            this.settings = {
                delText : 'sterge',
                mode: 'select',
                _id : 'coolmulti_'+(d.getTime())
            };
            if(options) {
                this.settings = $.extend(this.settings, options);
            }
            
            var selectobj = this;
            selectobj.hide();
            
            selectobj.wrapper = selectobj.parent().append('<div id="'+selectobj.settings._id+'" class="coolmulti"></div>').find('div#'+selectobj.settings._id);
            selectobj.div = selectobj.wrapper.append('<div id="'+selectobj.settings._id+'_scrollbox" class="coolmulti-scrollbox"></div>').find('div#'+selectobj.settings._id+'_scrollbox');
            selectobj.values = selectobj.wrapper.append('<div id="'+selectobj.settings._id+'_values" class="coolmulti-values"></div>').find('div#'+selectobj.settings._id+'_values');
            
            if(this.settings.mode == 'select'){
                this.coolMultiple('init_select');
            }
            else if(this.settings.mode == 'checkboxes'){
                this.coolMultiple('init_checkboxes');
            }
            
        },
        
        'init_select' : function(){
            var selectobj = this;
            
            selectobj.find('option').each(function(){
                selectobj.div.append('<p id="'+selectobj.settings._id+'_o_'+$(this).val()+'">'+$(this).text()+'</p>');
                if($(this).attr('selected')){
                    selectobj.coolMultiple('select', $(this).val());
                }
            });
            
            selectobj.div.find('p').click(function(){
                var value = $(this).attr('id').replace(selectobj.settings._id+'_o_', '');
                if(!$(this).hasClass('coolmulti-selected'))
                {
                    selectobj.coolMultiple('select', value);
                }
                else
                {
                    selectobj.coolMultiple('deselect', value);
                }
            });
        },
        
        'init_checkboxes' : function(){
            var selectobj = this;
            
            selectobj.find('input[type="checkbox"]').each(function(){
                selectobj.div.append('<p id="'+selectobj.settings._id+'_o_'+$(this).val()+'">'+$(this).parent().text()+'</p>');
                if($(this).attr('checked')){
                    selectobj.coolMultiple('select', $(this).val());
                }
            });
            
            selectobj.div.find('p').click(function(){
                var value = $(this).attr('id').replace(selectobj.settings._id+'_o_', '');
                if(!$(this).hasClass('coolmulti-selected'))
                {
                    selectobj.coolMultiple('select', value);
                }
                else
                {
                    selectobj.coolMultiple('deselect', value);
                }
            });
        },
        
        'select' : function(o){
            var selectobj = this;
            
            if(selectobj.settings.mode == 'select'){
                var tag = 'option';
            }
            else if(selectobj.settings.mode == 'checkboxes'){
                var tag = 'input';
            }
            
            var option = selectobj.find(tag+'[value="'+o+'"]');
            
            if(selectobj.settings.mode == 'select'){
                option.attr('selected', 'selected');
                var text = option.text();
            }
            else if(selectobj.settings.mode == 'checkboxes'){
                var text = option.parent().text();
                option.attr('checked', 'checked');
            }
            
            $('p#'+selectobj.settings._id+'_o_'+o).addClass('coolmulti-selected');
            selectobj.values.append('<p id="'+selectobj.settings._id+'_os_'+o+'">'+text+'<a class="coolmulti-del" href="#">'+this.settings.delText+'</a></p>')
            .find('a').click(function(){
                selectobj.coolMultiple('deselect', o);
                return false;
            });
        },
        
        'deselect' : function(o){
            var selectobj = this;
            
            if(selectobj.settings.mode == 'select'){
                var tag = 'option';
            }
            else if(selectobj.settings.mode == 'checkboxes'){
                var tag = 'input';
            }
            
            var option = selectobj.find(tag+'[value="'+o+'"]');
            
            if(selectobj.settings.mode == 'select'){
                option.attr('selected', '');
                var text = option.text();
            }
            else if(selectobj.settings.mode == 'checkboxes'){
                var text = option.parent().text();
                option.attr('checked', '');
            }
            
            $('p#'+selectobj.settings._id+'_o_'+o).removeClass('coolmulti-selected');
            selectobj.values.find('p#'+selectobj.settings._id+'_os_'+o).remove();
        }
    };

$.fn.coolMultiple = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      if(console.log) console.log( 'Method ' +  method + ' does not exist on jQuery.coolMultiple' );
    }
    
    return this;
    
};
})(jQuery);
