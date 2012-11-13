define("arale/calendar/0.8.1/model",["$","arale/base/1.0.1/base","gallery/moment/1.6.2/moment"],function(e,t,n){function f(e){e=(e||0).toString().toLowerCase();if(r.isNumeric(e))return e=parseInt(e),e;for(var t=0;t<a.length;t++)if(a[t].indexOf(e)===0){e=t;break}return e}function l(e){var t=[];for(i=0;i<u.length;i++)t.push({value:i,label:u[i]});var n={value:e,label:u[e]},r=[];for(var i=0;i<t.length/3;i++)r.push(t.slice(i*3,i*3+3));return{current:n,items:r}}function c(e){var t=[{value:e-10,label:". . .",role:"previous-10-year"}];for(var n=e-6;n<e+4;n++)t.push({value:n,label:n,role:"year"});t[7]={value:e,label:e,role:"year",current:!0},t.push({value:e+10,label:". . .",role:"next-10-year"});var r=[];for(n=0;n<t.length/3;n++)r.push(t.slice(n*3,n*3+3));var i={value:e,label:e};return{current:i,items:r}}function p(e){e=f(e);var t=[];for(var n=e;n<7;n++)t.push({label:h[n],value:n});for(n=0;n<e;n++)t.push({label:h[n],value:n});var r={value:e,label:h[e]};return{current:r,items:t}}function d(e,t,n){var r=[],i,s,o;t=f(t);var u=function(e,t){r.push({value:e.format("YYYY-MM-DD"),label:e.date(),day:e.day(),className:t,available:v(e,n)})},a=e.clone().date(1),l=a.clone().add("months",-1),c=a.clone().add("months",1);i=a.day()-t,i<0&&(i+=7);if(i!=0){o=l.daysInMonth();for(p=i-1;p>=0;p--)s=l.date(o-p),u(s,"previous-month")}o=a.daysInMonth();for(p=1;p<=o;p++)s=a.date(p),u(s,"current-month");i=35-r.length;if(i!=0){i<0&&(i+=7);for(p=1;p<=i;p++)s=c.date(p),u(s,"next-month")}var h=[];for(var p=0;p<r.length/7;p++)h.push(r.slice(p*7,p*7+7));var d={value:e.format("YYYY-MM-DD"),label:e.date()};return{current:d,items:h}}function v(e,t){if(t==null)return!0;if(r.isArray(t)){var n=t[0],i=t[1],o=!0;return n&&(o=o&&e>=s(n)),i&&(o=o&&e<=s(i)),o}return r.isFunction(t)?t(e):!0}var r=e("$"),i=e("arale/base/1.0.1/base"),s=e("gallery/moment/1.6.2/moment"),o=i.extend({attrs:{year:{setter:function(e){return c(e)}},month:{setter:function(e){return l(e)}},day:{setter:function(e){return p(this.startDay)}},date:{setter:function(e){return d(e,this.startDay,this.range)}},mode:{setter:function(e){var t={date:!1,month:!1,year:!1};return t[e]=!0,t}},message:null},initialize:function(e){o.superclass.initialize.call(this),this.startDay=e.startDay,this.activeTime=e.focus.clone(),this.range=e.range;var t=e.message||{};t.today="Today",this.set("message",t),this.set("mode","date"),this._refresh()},changeYear:function(e){this.activeTime.add("years",e),this._refresh(),this.trigger("changeYears")},changeMonth:function(e){this.activeTime.add("months",e),this._refresh(),this.trigger("changeMonths")},changeDate:function(e){var t=this.activeTime.format("YYYY-MM");this.activeTime.add("days",e),this._refresh();var n=this.activeTime.format("YYYY-MM");t!=n&&this.get("mode").date&&this.trigger("changeMonths")},changeStartDay:function(e){this.startDay=e,this._refresh(),this.trigger("changeStartday")},changeMode:function(e,t){t||(t={}),"month"in t&&this.activeTime.month(t.month),"year"in t&&this.activeTime.year(t.year),this.set("mode",e),this._refresh(),this.trigger("changeMode")},changeRange:function(e){this.range=e,this._refresh(),this.trigger("changeRange")},selectDate:function(e){if(e){var t=this.activeTime.format("YYYY-MM");this.activeTime=s(e),this._refresh();var n=this.activeTime.format("YYYY-MM");t!=n&&this.get("mode").date&&this.trigger("changeMonths")}return this.activeTime.clone()},selectToday:function(){this.selectDate(s()),this.trigger("changeYears")},isInRange:function(e){return v(e,this.range)},toJSON:function(){var e={},t=this.attrs;for(var n in t)e[n]=this.get(n);return e},_refresh:function(){this.set("year",this.activeTime.year()),this.set("month",this.activeTime.month()),this.set("date",this.activeTime.clone()),this.set("day"),this.trigger("refresh")},range:null,activeTime:null,startDay:0}),u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],h=["Su","Mo","Tu","We","Th","Fr","Sa"];n.exports=o}),define("arale/calendar/0.8.1/calendar",["./model","$","gallery/moment/1.6.2/moment","arale/overlay/0.9.12/overlay","arale/widget/1.0.2/templatable","i18n!lang","arale/base/1.0.1/base"],function(e,t,n){function h(e,t){var n,r=t.get("mode"),i=["date","month","year"];for(var s=0;s<i.length;s++)r[i[s]]&&(n=i[s]);if(!n)return;var o="[data-value="+t.get(n).current.value+"]";e.find(".focused-element").removeClass("focused-element"),e.find(o).addClass("focused-element")}var r=e("$"),i=e("gallery/moment/1.6.2/moment"),s=e("arale/overlay/0.9.12/overlay"),o=e("arale/widget/1.0.2/templatable"),u=e("i18n!lang")||{},a='<div class="ui-calendar"> <ul class="ui-calendar-navigation" data-role="navigation-container"> <li class="ui-calendar-previous-year" data-role="prev-year">&lt;&lt;</li> <li class="ui-calendar-previous-month" data-role="prev-month">&lt;</li> <li class="ui-calendar-month-year" data-role="month-year-container"> <span class="month" data-role="mode-month" data-value="{{month.current.value}}">{{_ month.current.label}}</span> <span class="year" data-role="mode-year">{{year.current.label}}</span> </li> <li class="ui-calendar-next-month" data-role="next-month">&gt;</li> <li class="ui-calendar-next-year" data-role="next-year">&gt;&gt;</li> </ul><ul class="ui-calendar-control" data-role="pannel-container"> {{#if mode.date}} {{#each day.items}} <li class="ui-calendar-day ui-calendar-day-{{value}}" data-role="day" data-value="{{value}}">{{_ label}}</li> {{/each}} {{/if}} </ul><div class="ui-calendar-data-container" data-role="data-container"> {{#if mode.date}} {{#each date.items}} <ul class="ui-calendar-date-column"> {{#each this}} <li class="ui-calendar-day-{{day}} {{className}} {{#unless available}}disabled-date{{/unless}} " data-role="date" data-value="{{value}}" >{{label}}</li> {{/each}} </ul> {{/each}} {{/if}}{{#if mode.month}} {{#each month.items}} <ul class="ui-calendar-month-column"> {{#each this}} <li data-role="month" data-value="{{value}}">{{_ label}}</li> {{/each}} </ul> {{/each}} {{/if}}{{#if mode.year}} {{#each year.items}} <ul class="ui-calendar-year-column"> {{#each this}} <li data-role="{{role}}" data-value="{{value}}">{{_ label}}</li> {{/each}} </ul> {{/each}} {{/if}} </div><ul class="ui-calendar-footer" data-role="time-container"> <li class="ui-calendar-today" data-role="today">{{_ message.today}}</li> {{#if mode.time}} <li class="ui-calendar-time" colspan="2" data-role="time"><span class="ui-calendar-hour">{{time.hour}}</span> : {{time.minute}}</li> {{/if}} </ul> </div>',f=e("./model"),l={trigger:null,triggerType:"click",format:"YYYY-MM-DD",output:{value:"",getter:function(e){return e=e?e:this.get("trigger"),r(e)}},align:{getter:function(){var e=this.get("trigger");return e?{selfXY:[0,0],baseElement:e,baseXY:[0,r(e).height()+10]}:{selfXY:[0,0],baseXY:[0,0]}}},startDay:"Sun",showTime:!1,hideOnSelect:!0,focus:{value:"",getter:function(e){return e=e?e:r(this.get("trigger")).val(),i(e?e:undefined)}},range:null,template:a,model:{getter:function(){if(!this.hasOwnProperty("model")){var e={focus:this.get("focus"),range:this.get("range"),showTime:this.get("showTime"),startDay:this.get("startDay")};this.model=new f(e)}return this.model}}},c=s.extend({Implements:[o],attrs:l,events:{"click [data-role=mode-year]":"_changeMode","click [data-role=prev-year]":"prevYear","click [data-role=next-year]":"nextYear","click [data-role=mode-month]":"_changeMode","click [data-role=prev-month]":"prevMonth","click [data-role=next-month]":"nextMonth","click [data-role=previous-10-year]":"_selectYear","click [data-role=next-10-year]":"_selectYear","click [data-role=year]":"_selectYear","click [data-role=month]":"_selectMonth","click [data-role=day]":"_selectDay","click [data-role=date]":"_selectDate","click [data-role=today]":"_selectToday"},templateHelpers:{_:function(e){return u[e]||e}},setup:function(){var e=this,t=r(this.get("trigger"));t.on(this.get("triggerType"),function(){e.show(),h(e.element,e.model)}),t.on("keydown",function(t){e._keyControl(t)}),t.on("blur",function(){e.hide()}),e.element.on("mousedown",function(e){if(r.browser.msie&&parseInt(r.browser.version,10)<9){var n=t[0];n.onbeforedeactivate=function(){window.event.returnValue=!1,n.onbeforedeactivate=null}}e.preventDefault()});var n=this.model;n.on("changeStartday changeMode",function(){e.renderPartial("[data-role=data-container]"),e.renderPartial("[data-role=pannel-container]"),e.renderPartial("[data-role=month-year-container]"),h(e.element,e.model)}),n.on("changeMonths changeYears",function(){var t=n.get("mode");(t.date||t.year)&&e.renderPartial("[data-role=data-container]"),e.renderPartial("[data-role=month-year-container]"),h(e.element,e.model)}),n.on("changeRange",function(){e.renderPartial("[data-role=data-container]")}),n.on("refresh",function(){h(e.element,e.model)})},range:function(e){this.model.changeRange(e)},prevYear:function(){this.model.changeYear(-1)},nextYear:function(){this.model.changeYear(1)},prevMonth:function(){this.model.changeMonth(-1)},nextMonth:function(){this.model.changeMonth(1)},_selectYear:function(e){var t=r(e.target);t.data("role")==="year"?this.model.changeMode("date",{year:t.data("value")}):this.model.changeMode("year",{year:t.data("value")})},_selectMonth:function(e){var t=r(e.target);this.model.changeMode("date",{month:t.data("value")})},_selectDay:function(e){var t=r(e.target);this.model.changeStartDay(t.data("value"))},_selectDate:function(e){var t=r(e.target),n=this.model.selectDate(t.data("value"));this._fillDate(n)},_selectToday:function(){this.model.selectToday(),this.trigger("selectToday")},_changeMode:function(e){var t=r(e.target).data("role").substring(5);this.model.changeMode(t)},_keyControl:function(e){var t={68:"date",77:"month",89:"year"};if(e.keyCode in t)return this.model.changeMode(t[e.keyCode]),e.preventDefault(),!1;var n={13:"enter",27:"esc",37:"left",38:"up",39:"right",40:"down",72:"left",76:"right",74:"down",75:"up"};if(!(e.keyCode in n))return;e.preventDefault();var r=n[e.keyCode],i=this.model.get("mode");e.shiftKey&&r==="down"?this.nextYear():e.shiftKey&&r==="up"?this.prevYear():e.shiftKey&&r==="right"?this.nextMonth():e.shiftKey&&r==="left"?this.prevMonth():r==="esc"?this.hide():i.date?this._keyControlDate(r):i.month?this._keyControlMonth(r):i.year&&this._keyControlYear(r)},_keyControlDate:function(e){if(e==="enter"){var t=this.model.selectDate();this._fillDate(t);return}var n={right:1,left:-1,up:-7,down:7};this.model.changeDate(n[e])},_keyControlMonth:function(e){if(e==="enter"){var t=this.model.selectDate();this.model.changeMode("date",{month:t.month()});return}var n={right:1,left:-1,up:-3,down:3};this.model.changeMonth(n[e])},_keyControlYear:function(e){if(e==="enter"){var t=this.model.selectDate();this.model.changeMode("date",{year:t.year()});return}var n={right:1,left:-1,up:-3,down:3};this.model.changeYear(n[e])},_fillDate:function(e){if(!this.model.isInRange(e))return this.trigger("selectDisabledDate",e),this;this.trigger("selectDate",e);var t=this.get("trigger");if(!t)return this;var n=this.get("output");if(typeof n[0].value=="undefined")return this;var r=e.format(this.get("format"));n.val(r),this.get("hideOnSelect")&&this.hide()}});c.autoRender=function(e){e.trigger=e.element,e.element="",new c(e)},n.exports=c});